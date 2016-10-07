import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';


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
	face: [
		1,
		2,
		3,
		4,
	],
}

class Redactor extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			canvas: false,
			elements: [],
			saveLink: false,
			image: false,
			maskCategory: false,
		};
	}

	componentDidMount() {

		//this.refs.canvas.heigth = '450px';//this.refs.canvasPlaceholder.height;
		//this.refs.canvas.width = '860px';//this.refs.canvasPlaceholder.width;

		let canvas = new fabric.Canvas(this.refs.canvas);
		//canvas.setBackgroundColor('#cccccc').renderAll();

		canvas.on('object:selected', function(options) {
			//options.target.bringToFront();
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

			let elements = this.state.elements;

			elements.push(imgInstance);

			this.setState({elements: elements});

		}


	}

	_addSVG(e){
		e.preventDefault();

		const that = this;

		fabric.loadSVGFromURL(e.target.src, function(objects, options) {

			//console.log(options);

			objects.forEach( (object, i) => {

				console.log(i, object);

				object.set({
					//left: 960 / 2 - options.width / 2 + object.left,
					//top: 600 / 2 - options.height / 2 + object.top,
					//lockMovementX: true,
					//lockMovementY: true,
					//lockRotation: true,
					//lockScalingX: true,
					//hasControls: false,
					//borderColor: '#ff0000',
					//cornerSize: 6,
					//selectable: (object.height > 400) ? false : true,
				});



				//that.state.canvas.add(object);

				if (object.height > 400){
					that.state.canvas.sendToBack(object)
				}

			});

			var shape = fabric.util.groupSVGElements(objects, options);

		   //  shape.set({
			  // left: 960 / 2 - shape.width / 2,
			  // top: 500 / 2 - shape.height / 2,
		   //  });

		   //  if (shape.isSameColor && shape.isSameColor() || !shape.paths) {
		   //    //shape.setFill(colorSet);
		   //  }

		   //  else if (shape.paths) {
		   //    for (var i = 0; i < shape.paths.length; i++) {
		   //      //shape.paths[i].setFill(colorSet);
		   //      //shape.paths[i].setFill('#fff');
		   //    }
		   //  }

			that.state.canvas.add(shape);
			that.state.canvas.renderAll();


		}, (element, object) => {
			object.fixed = Boolean(element.getAttribute('myfixed'));
		});


	}

	_changeColor(e){
		e.preventDefault();

		const activeObject = this.state.canvas.getActiveObject() == null ? this.state.canvas.getActiveGroup() : this.state.canvas.getActiveObject()

		activeObject.set({
			fill: e.target.value
		})

		 if (activeObject.paths) {
			  for (var i = 0; i < activeObject.paths.length; i++) {
				console.log(activeObject.paths[i]);
				if (!activeObject.paths[i].fixed){
					activeObject.paths[i].setFill(e.target.value);
				}

			  }
			}

		this.state.canvas.renderAll();
	}

	_delete(e){
		e.preventDefault();
		this.state.canvas.getActiveObject().remove();
	}


	_toBack(e){
		e.preventDefault();
		this.state.canvas.getActiveObject().sendBackwards();
	}

	_toFront(e){
		e.preventDefault();
		this.state.canvas.getActiveObject().bringForward();
	}

	_move(e){
		e.preventDefault();

		const activeObject = this.state.canvas.getActiveObject();

		activeObject && activeObject.animate('left', '+=100', { onChange: this.state.canvas.renderAll() });
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
		//console.log(input);

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

			console.log(imgInstance);

			imgInstance.scaleToWidth(state.canvas.getWidth());

			if (imgInstance.scaleY){

				imgInstance.top = - (imgInstance.height * imgInstance.scaleY - state.canvas.getHeight()) / 2;
			}

			state.canvas.add(imgInstance);

			this.setState({
				...state,
				...{
					image: true,
				}
			});

		});

		reader.readAsDataURL(file);

	}

	_deletePhoto(maskCategory){

		this.setState({
			...this.state,
			...{
				image: false,
			}
		});
	}


	_setMaskCaterory(maskCategory){

		if (!this.state.image){
			return false;
		}

		this.setState({
			...this.state,
			...{
				maskCategory: maskCategory,
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
			}
		});
	}

	_addPhotoHandler = () => (e) => {
		//e.preventDefault;

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

								<label
									className="redactor-work-area__button button button--blue button--l"
									//onChange={this._addPhotoClickHandler()}
								>
									<input type="file"
										onChange={this._addPhotoHandler()}
										className="redactor-work-area__file"
									/>
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
							
							<div className="redactor-save__buttons">

								<div className="redactor-save__button-placeholder">

									<a 	href={state.saveLink} 
										download="i-am-troll.jpeg" 
										target="_blank" 
										className="redactor-save__href button button--blue button--l">
										Скачать
									</a>

								</div>

								<div className="redactor-save__button-placeholder">

									<button className="redactor-save__href button button--blue button--l">
										Отправить на конкурс
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
	//login: () => dispatch(asyncActions.login()),
	//init: () => dispatch(asyncActions.init()),
	//redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Redactor);




