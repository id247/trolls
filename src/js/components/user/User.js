import React from 'react';
import { connect } from 'react-redux';

import { ForumOptions } from 'appSettings';

import * as asyncActions from '../../actions/async';

class User extends React.Component {

	_logoutHandler = () => (e) => {
		e.preventDefault();
		this.props.logout();
	}

	render(){
		const { props } = this;

		const avatar = props.profile.photoMedium ? props.profile.photoMedium : ForumOptions.anonAvatar

		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' forum-user')}>

				<div className="forum-user__avatar-placeholder">

					<img src={avatar} alt="" className="forum-user__avatar" />

				</div>

				<div className="forum-user__content">
				
					<div className="forum-user__name">
						Вы вошли как {props.profile.firstName}  {props.profile.lastName} 
					</div>

					<div className="forum-user__logout">

						<button 
							className="button button--s button--blue-light"
							onClick={this._logoutHandler()}
						>
							Выход
						</button>

					</div>

				</div>


			</div>
		);
	}
}



const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	logout: () => dispatch(asyncActions.logout()), 
});

User.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
