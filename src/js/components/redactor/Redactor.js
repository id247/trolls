import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import * as asyncActions from '../../actions/async';

const masks = {
	hair: [
		1,
		2,
		3,
		4,
		5,
	],
	noses: [
		1,
		2,
		3,
		4,
		5,
	],
	mouths: [
		1,
		2,
		3,
		4,
		5,
	],
}

class Redactor extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			canvas: false,
			saveLink: false,
			image: false,
			imageInput: '',
			maskCategory: false,
			uploaded: false,
		};
	}

	componentDidMount() {

		//this.refs.canvas.heigth = '450px';//this.refs.canvasPlaceholder.height;
		//this.refs.canvas.width = '860px';//this.refs.canvasPlaceholder.width;

		let canvas = new fabric.Canvas(this.refs.canvas);
		canvas.setBackgroundColor('#ffffff').renderAll();

		canvas.on('object:selected', function(options) {
			options.target.bringToFront();
		});

		this.setState({
			...this.state,
			...{
				canvas: canvas
			}
		});
	}

	_add(e){
		e.preventDefault();

		// create a rectangle object
		var rect = new fabric.Rect({
		  left: 100,
		  top: 100,
		  fill: 'red',
		  width: 20,
		  height: 20
		});

		// "add" rectangle onto canvas
		this.state.canvas.add(rect).setActiveObject(rect);

		let elements = this.state.elements;

		elements.push(rect);

		this.setState({elements: elements});
	}

	_addImage(src){

		var image = new Image();
		image.setAttribute('crossOrigin','Anonymous');
		image.src = src;

		image.onload = () => {

			var imgInstance = new fabric.Image(image, {
				left: 660 / 2 - image.width / 2,
				top: 374 / 2 - image.height / 2,
				transparentCorners: false,
				borderColor: 'red',
				cornerColor: 'red',
				cornerSize: 10,
			});

			this.state.canvas.add(imgInstance).setActiveObject(imgInstance);

		}

	}

	_save(){

		this.setState({
			...this.state,
			...{
				saveLink: this.state.canvas.deactivateAll().toDataURL({format: 'jpeg', quality: 1.0}),
			}
		});
	}

	_addPhoto(input){
		console.log(input);
		console.log(input.value);

		const { state, refs } = this;

		const file = input.files && input.files[0] ? input.files[0] : false;

		if (!file || !(/\.(jpe?g|png)$/i.test(file.name))) {
			input.value = '';
			return false;
		}

		const reader = new FileReader();
		const image = new Image();

		reader.onload = function(e){
			const base64 = e.target.result;
			image.src = base64;
		}

		image.addEventListener('load', () => {

			const imgInstance = new fabric.Image(image, {
				left: 0,
				top: 0,
				angle: 0,
				opacity: 1.0,
				selectable: false,
			});

			const canvasWidth = state.canvas.getWidth();
			const canvasHeight = state.canvas.getHeight();

			console.log(imgInstance.width / imgInstance.height);
			console.log(canvasWidth / canvasHeight);

			if (imgInstance.width / imgInstance.height > 1){

				console.log(1);

				imgInstance.scaleToWidth(canvasWidth);

				if (imgInstance.scaleY){

					imgInstance.top = - (imgInstance.height * imgInstance.scaleY - canvasHeight) / 2;
				}

			}else{

				console.log(2);

				imgInstance.scaleToHeight(canvasHeight);

				if (imgInstance.scaleX){

					imgInstance.left = - (imgInstance.width * imgInstance.scaleX - canvasWidth) / 2;
				}

			}

			state.canvas.add(imgInstance);

			this.setState({
				...state,
				...{
					image: true,
					imageInput: input.value,
				}
			});

		});

		reader.readAsDataURL(file);

	}

	_emptyCanvas(canvas){
		const width = canvas.getWidth() + 10;
		const height = canvas.getHeight() + 10;

		const rect = new fabric.Rect({ top: -5, left: -5, width: width, height: height, fill: '#ffffff' });

		canvas.add(rect).renderAll();
	}

	_deletePhoto(){

		this._emptyCanvas(this.state.canvas);

		this.setState({
			...this.state,
			...{
				image: false,
				imageInput: '',
			}
		});
	}


	_setMaskCaterory(maskCategory){

		const { state } = this;

		if (!state.image){
			return false;
		}

		this.setState({
			...state,
			...{
				maskCategory: state.maskCategory !== maskCategory ? maskCategory : false,
			}
		});
	}

	_unsetMaskCaterory(){

		this.setState({
			...this.state,
			...{
				maskCategory: false,
			}
		});
	}

	_cancelSave(){

		this.setState({
			...this.state,
			...{
				saveLink: false,
				uploaded: false,
			}
		});
	}

	_sendPhoto(){
		const { props, state } = this;

		props.uploadPhoto( this.state.saveLink )
		.then( (res) => {

			if (res === 'ok'){

				this.setState({
					...this.state,
					...{
						uploaded: true,
					}
				});

			}

		});

	}

	_uploadPhoto(){

		const { props, state } = this;

		if (!state.saveLink){
			return false;
		}

		if (!props.profile){
			
			props.login()
			.then( () => {
				this._sendPhoto();
			});

			return;
		}

		this._sendPhoto();
	}

	_addPhotoHandler = () => (e) => {
		
		if (!e.target.value.length === 0){
			e.preventDefault();
			return;
		}

		this._addPhoto(e.target);
	}

	_deletePhotoHandler = () => (e) => {
		e.preventDefault;

		this._deletePhoto();
	}

	_addMaskHandler = (src) => (e) => {
		e.preventDefault;

		if (!this.state.image){
			return false;
		}

		this._addImage(src);
	}

	_setMaskCateroryHandler = (maskCategory) => (e) => {
		e.preventDefault;

		this._setMaskCaterory(maskCategory);
	}

	_unsetMaskCateroryHandler = () => (e) => {
		e.preventDefault;

		this._unsetMaskCaterory();
	}

	_saveHandler = () => (e) => {
		e.preventDefault;

		this._save();
	}

	_cancelSaveHandler = () => (e) => {
		e.preventDefault;

		this._cancelSave();
	}

	_uploadPhotoHandler = () => (e) => {
		e.preventDefault;

		this._uploadPhoto();
	}

	render() {

		const { props, state } = this;

		return (
			<div className="redactor">

				<div className="redactor__content">

					<div 
						className={
							'redactor__sidebar redactor-sidebar ' 
							+ ( state.image ? 'redactor__sidebar--visible' : '' )
						}
					>

						<ul className="redactor-sidebar__list">

							<li className="redactor-sidebar__item">

								<button
									className={
										'redactor-sidebar__button redactor-sidebar__button--hair button'

									}
									onClick={this._setMaskCateroryHandler('hair')}
								>
									Прически
								</button>

							</li>

							<li className="redactor-sidebar__item">

								<button
									className="redactor-sidebar__button redactor-sidebar__button--noses button"
									onClick={this._setMaskCateroryHandler('noses')}
								>
									Носы
								</button>

							</li>


							<li className="redactor-sidebar__item">

								<button
									className="redactor-sidebar__button redactor-sidebar__button--mouths button"
									onClick={this._setMaskCateroryHandler('mouths')}
								>
									Рты
								</button>

							</li>

							<li className="redactor-sidebar__item">

								<button
									className="redactor-sidebar__button redactor-sidebar__button--save button"
									onClick={this._saveHandler()}
								>
									Сохранить
								</button>

							</li>

						</ul>

					</div>

					<div className="redactor__work-area redactor-work-area">

						<div className="redactor-work-area__content redactor-work-area__content--upload"
							style={{display: !state.image ? 'block' : 'none'}}
						>

							<div className="redactor-work-area__title">
								Сделай фото в стиле троллей!
							</div>

							<div className="redactor-work-area__text text">
								<p>
									Загрузите изображение в&nbsp;формате JPG или PNG.
								</p>
							</div>

							<div className="redactor-work-area__button-placeholder">
								<input type="file"
									id="imageFileInput"
									onChange={this._addPhotoHandler()}
									className="redactor-work-area__file"
									value={state.imageInput}
								/>

								<label
									htmlFor="imageFileInput"
									className="redactor-work-area__button button button--blue button--l"
								>
									Загрузить фото
								</label>

							</div>

						</div>

						<div className="redactor-work-area__content rredactor-work-area__content--canvas"
							ref="canvasPlaceholder"
							style={{display: state.image ? 'block' : 'none'}}
						>
							<canvas
								className="redactor-work-area__canvas"
								ref="canvas"
								width="730" 
								height="450"
							></canvas>

							<button className="redactor-work-area__delete button"
								onClick={this._deletePhotoHandler()}
							></button>

						</div>

						<div className="redactor-work-area__content redactor-work-area__content--save redactor-save"
							style={{display: state.saveLink ? 'block' : 'none'}}
						>
							
							<div className="redactor-save__buttons"
								style={{display: !state.uploaded ? 'block' : 'none'}}
							>

								<div className="redactor-save__button-placeholder">

									<a 	href={state.saveLink} 
										download="i-am-troll.jpeg" 
										target="_blank" 
										className="redactor-save__href button button--blue button--l">
										Скачать
									</a>

								</div>

								<div className="redactor-save__button-placeholder">

									<button 
										className="redactor-save__href button button--blue button--l"
										onClick={this._uploadPhotoHandler()}
									>
										Сохранить в галерею
									</button>

								</div>

								<div className="redactor-save__button-placeholder">

									<button 
										className="redactor-save__href button button--blue button--l"
										onClick={this._cancelSaveHandler()}
									>
										Отмена
									</button>

								</div>

							</div>

							<div className="redactor-save__buttons"
								style={{display: state.uploaded ? 'block' : 'none'}}
							>

								<div className="redactor-save__button-placeholder">

									<a 	href="#/gallery" 
										className="redactor-save__href button button--blue button--l">
										Перейти в галерею
									</a>

								</div>

								<div className="redactor-save__button-placeholder">

									<button 
										className="redactor-save__href button button--blue button--l"
										onClick={this._cancelSaveHandler()}
									>
										Продолжить редактирование
									</button>

								</div>

							</div>

							<button className="redactor-work-area__delete button"
								onClick={this._cancelSaveHandler()}
							></button>

						</div>

					</div>

				</div>

				<div className="redactor__masks redactor-masks"
					style={{
						display: state.image && state.maskCategory ? 'block' : 'none',
					}}
				>

					<div className="redactor-masks__content">

						<button className="redactor-masks__close button"
							onClick={this._unsetMaskCateroryHandler()}
						></button>

						<ul className="redactor-masks__list">

							{state.maskCategory && masks[state.maskCategory].map( (item, i) => (

							<li className="redactor-masks__item" key={i}>

								<img 
									src={PromoOptions.cdn + 'images/masks/' + state.maskCategory + '/' + item + '.png'} 
									alt="" 
									className="redactor-masks__image"
									onClick={this._addMaskHandler(PromoOptions.cdn + 'images/masks/' + state.maskCategory + '/' + item + '.png')}
								/>

							</li>

							))}

						</ul>

					</div>

				</div>

			</div>
		);
	}

}


Redactor.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	uploadPhoto: (base64) => dispatch(asyncActions.uploadPhoto(base64)),
	login: () => dispatch(asyncActions.login()),
	//init: () => dispatch(asyncActions.init()),
	//redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redactor);




