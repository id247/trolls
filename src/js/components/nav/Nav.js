import React from 'react';
import { connect } from 'react-redux';

import * as pageActions from '../../actions/page';

const pages = [
	{
		id: '/',
		title: 'Фоторедактор',
	},
	{
		id: '/stickers',
		title: 'Стикеры',
	},
];

class Nav extends React.Component {

	_setPage(page){
		this.props.goTo(page);
	}

	_setPageHandler = (page) => (e) => {
		e.preventDefault();

		this._setPage(page);
	}

	render(){
		const { props } = this;

		const currentPage = '/' + ( props.params.pageId ? props.params.pageId : '' );

		return(
			<div className="app-nav">
				
				<ul className="app-nav__list">

					{pages.map( page => (

					<li className="app-nav__item" key={'nav-' + page.id}>

						<a 	href={'#' + page.id} 
							className={'app-nav__href button '
								+ (page.id === currentPage ? 'app-nav__href--active' : '')
							}
							onClick={this._setPageHandler(page.id)}
						>
							{page.title}
						</a>

					</li>

					))}
				
				</ul>

			</div>
		);
	}
}


const mapStateToProps = (state, ownProps) => ({
	page: state.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	goTo: (page) => dispatch(pageActions.setPage(page)), 
});

Nav.propTypes = {
	mixClass: React.PropTypes.string,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
