import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Stickers extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			showFriends: false,
			friendId: false,
			stickerId: 1,
		};

	}

	componentWillMount(){

	}

	_getFriends(){
		const { state, props } = this;

		props.getFriends()
		.then( ()=> {			

			if (!props.friends){
				return;
			}

			this.setState({
				...state,
				...{
					showFriends: true,
				}
			});

		});
	}

	_showFriends(){

		const { state, props } = this;

		if (!props.profile){
			props.login()
			.then( () => {
				this._getFriends();
			});
			return;
		}
		
		this._getFriends();
	}

	_hideFriends(){

		this.setState({
			...this.state,
			...{
				showFriends: false,
			}
		});
	}

	_selectSticker(stickerId){

		this.setState({
			...this.state,
			...{
				stickerId: stickerId,
			}
		});
	}

	_sendStickerSuccess(friendId){

		this.setState({
			...this.state,
			...{
				friendId: friendId,
			}
		});

		setTimeout( () => {

			this.setState({
				...this.state,
				...{
					friendId: false,
				}
			});

		}, 1000);

	}

	_sendSticker(friendId){

		const { state, props } = this;

		props.sendSticker(state.stickerId, friendId)
		.then( (res) => {

			if (res === 'ok'){
				this._sendStickerSuccess(friendId);
			}

		});
	}

	_showFriendsHandler = () => (e) => {
		e.preventDefault();

		this._showFriends();
	}

	_hideFriendsHandler = () => (e) => {
		e.preventDefault();

		this._hideFriends();
	}

	_selectStickerHandler = (stickerId) => (e) => {
		//e.preventDefault();

		this._selectSticker(stickerId);
	}


	_sendStickerHandler = (friendId) => (e) => {
		e.preventDefault();

		this._sendSticker(friendId);
	}

	render(){
		const { props, state } = this;
		return(
			<div className="page stickers">


				{
					state.showFriends
					?
					(
						<div className="page__content stickers__content">

							<div className="stickers__people people">

								<ul className="people__list">

									{props.friends.map( (friend, i) => (

									<li className="people__item" key={'friend-' + i}>

										<div className="people__start">

											<div className="people__profile">

												<div className="people__avatar-placeholder">

													<img src={friend.photoSmall} alt="" className="people__avatar"/>

												</div>

												<a 
													href={PromoOptions.server + '/user/user.aspx?user=' + friend.id} 
													className="people__name inverselink"
													target="_blank"
												>
													{friend.firstName}
												</a>

											</div>

										</div>

										<div className="people__data">

											<div className="people__data-inner">
											
											{
												<Button
													mixClass="people__button"
													size="m"
													color="blue"
													type="button"
													disabled={!!(state.friendId)}
													onClickHandler={this._sendStickerHandler(friend.id)}
												>
													<span className="button__text">Отправить</span>
												</Button>
											}

												<div className={'people__ajax-result '
													+ (state.friendId === friend.id ? 'people__ajax-result--visible' : '')
												}>
													Отправлено!
												</div>

											</div>

										</div>

									</li>

									))}

								</ul>

							</div>

							<div className="stickers__button-placeholder">


								<Button
									mixClass="team-select__button"
									size="l"
									color="blue"
									type="button"
									onClickHandler={this._hideFriendsHandler()}
								>
									<span className="button__text">Выбрать другой стикер</span>
								</Button>

							</div>

						</div>
					)
					:
					(
						<div className="page__content stickers__content">

							<h2 className="page__title stickers__title">
								ОТПРАВЬ СТИКЕР ДРУГУ
							</h2>

							<ul className="stickers__list">

								{[1,2,3,4,5,6,7,8].map( (sticker, i) => (

									<li className="stickers__item stickers-item" key={'sticker' + i}>

										<label className="stickers-item__label">

											<input type="radio" name="sticker" 
											className="stickers-item__input"
											checked={sticker === state.stickerId}
											onChange={this._selectStickerHandler(sticker)}
											/>

											<span className="stickers-item__image-placeholder">

												<img src={(PromoOptions.cdn + 'images/stickers/' + sticker + '.png')} alt="" />

											</span>

										</label>

									</li>

								))}

							</ul>

							<div className="stickers__button-placeholder">


								<Button
									mixClass="team-select__button"
									size="l"
									color="blue"
									type="button"
									onClickHandler={this._showFriendsHandler()}
								>
									<span className="button__text">Выбрать получателя</span>
								</Button>

							</div>

						</div>						
					)
				}

			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
	friends: state.user.friends,
	results: state.results,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	sendSticker: (friendId, stickerId) => dispatch(asyncActions.sendSticker(friendId, stickerId)),
	getFriends: () => dispatch(asyncActions.getFriends()),
	login: () => dispatch(asyncActions.login()),
});

Stickers.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stickers);
