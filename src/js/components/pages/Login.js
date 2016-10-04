import React from 'react';
import { connect } from 'react-redux';

import Button from '../../components/common/Button';

import * as asyncActions from '../../actions/async';
import * as pageActions from '../../actions/page';

class Login extends React.Component {

	componentWillMount(){
		const { props } = this;		
		if (props.profile){
			props.redirect('/');
		}
	}

	render(){
		const { props } = this;

		return (
			<div className={( (props.mixClass ? props.mixClass : '') + ' login')}>

				<h1 className="login__title">
					Заголовок
				</h1>

				<div className="login__text text">
					
					<p>
						Текст
					</p>

				</div>

				<div className="login__button-placeholder">

					<Button 
						size="m"
						color="blue-dark"
						type="button"
						onClickHandler={props.login}
					>
						Войти через Дневник.ру
					</Button>
				
				</div>

			</div>
		);
	}
}

Login.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	login: () => dispatch(asyncActions.login()),
	init: () => dispatch(asyncActions.init()), 
	redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
