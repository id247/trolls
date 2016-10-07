import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import User 		from '../../components/gallery/User';
import Pagination 	from '../../components/gallery/Pagination';
import Likes 		from '../../components/gallery/Likes';
import Admin 		from '../../components/gallery/Admin';

import * as asyncActions from '../../actions/async';
//import * as pageActions from '../../actions/page';

class Gallery extends React.Component {

	componentWillMount(){

		const { props } = this;

		this.pageNumber = props.params.galleryPage ? parseInt(props.params.galleryPage) : 1;

		console.log(this.pageNumber);

		this._getPhotos();
	}


	componentWillReceiveProps(nextProps){

		console.log(nextProps);

		const { props } = this;
		const oldPageNumber = props.params.galleryPage ? parseInt(props.params.galleryPage) : 1;
		const newPageNumber = nextProps.params.galleryPage ? parseInt(nextProps.params.galleryPage) : 1;

		if (oldPageNumber !== newPageNumber){

			this.pageNumber = newPageNumber;

			this._getPhotos();
		}
	}

	_getPhotos(){
		const { props } = this;

		props.getPhotos(this.pageNumber);
	}

	_login(){
		const { props } = this;

		if (!props.profile){
			props.login()
			.then( () => {
				this._getPhotos();
			});

		}
	}

	_voteHandler = (photoId) => (e) =>{
		e.preventDefault();	
		
		this.props.vote(photoId)
		.then( (res) => {
			this._showPhotos();
		});	
	}

	_deleteHandler = (photoKey) => (e) =>{
		e.preventDefault();	
		
		this.props.deletePhoto(photoKey)
		.then( (res) => {
			this._showPhotos();
		});	
	}

	_loginHandler = () => (e) => {
		e.preventDefault();

		this._login();
	}

	render(){
		const { props } = this;
		return(
			<div className="page gallery">

				<div className="page__content">

					<div className="page__title">
						Фотогалерея
					</div>

					{
						(!props.profile)
						?
						(
							<div className="page__login">
							
								<button
									className="button button--blue button--l"
									onClick={this._loginHandler()}
								>
									Авторизуйтесь чтобы увидеть фото
								</button>
							
							</div>
						)
						: null
					}

					<ul className="gallery__list">

						{props.gallery.list && props.gallery.list.map( photo => (

							<li className="gallery__item gallery-item" key={photo.Id}>

								<div className="gallery-item__top">

									<User 
										mixClass="gallery-item__user" 
										user={photo.user}
									/>

									<Likes 
										mixClass="gallery-item__likes" 
										counter={photo.counter}
										text="Мне нравится"
										clickHandler={this._voteHandler(photo.Id)}
									/>

								</div>

								<Admin 
									mixClass="gallery-item__admin"
									isSystem={props.profile.roles.indexOf('System') > -1}
									visible={
										props.profile.roles.indexOf('System') > -1 
									}
									deleteHandler={this._deleteHandler(photo.Key)}
								/>

								<div className="gallery-item__inage-placeholder">

									<img src={photo.Value.downloadUrl} alt="" className="gallery-item__image"/>

								</div>

							</li>

						))}

					</ul>

					<Pagination 
						page={this.pageNumber}
						pagesCount={ Math.ceil( props.gallery.itemsTotalCount / PromoOptions.pageSize) }
						mixClass="gallery__pagination" 
					/>

				</div>

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	gallery: state.gallery,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	deletePhoto: (photoKey) => dispatch(asyncActions.deleteFromDB(photoKey)),
	getPhotos: (pageNumber) => dispatch(asyncActions.getPhotos(pageNumber)), 
	vote: (photoId) => dispatch(asyncActions.vote(photoId)), 
	login: () => dispatch(asyncActions.login()), 
});

Gallery.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
