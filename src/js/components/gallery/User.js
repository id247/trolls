import React from 'react';
import { connect } from 'react-redux';

import { PromoOptions } from 'appSettings';

class User extends React.Component {

	render(){
		const { props } = this;

		return(
			<div className={( (props.mixClass ? props.mixClass : '') + ' user')}>

				<div className="user__avatar-placeholder">

					<img src={props.user.photoMedium} alt="" className="user__avatar" />

				</div>

				<div className="user__content">
				
					<div className="user__name">
						
						<a 
							href={PromoOptions.server + '/user/user.aspx?user=' + props.user.id} 
							className="user__href link"
						>
							{props.user.firstName}  {props.user.lastName} 
						</a>

					</div>

				</div>

			</div>
		);
	}
}


User.propTypes = {
	mixClass: React.PropTypes.string,
	user: React.PropTypes.object.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default User
