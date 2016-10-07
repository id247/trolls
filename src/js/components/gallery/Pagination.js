import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import * as asyncActions from '../../actions/async';

const Pagination = (props) => {

	if (props.pagesCount < 2){
		return null;
	}

	return(
		<div className={( (props.mixClass ? props.mixClass : '') + ' pagination')}>

			<ul className="pagination__list">

				{[,...Array(props.pagesCount)].map( (value, i)  => {

					let link = '/gallery/' + (i);

					if (i === 1){
						link = '';
					}

					return (

					<li className="pagination__item" key={i}>

						<a 
							href={ i > 1 ? ('#/gallery/' + i) : '#/gallery'} 
							className={('link pagination__href ' + (i === props.page ? 'pagination__href--active' : '') )}
							// onClick={ (e) => {
							// 	e.preventDefault();
							// 	const pageId = i;
							// 	props.setCommentsPage(pageId);
							// }}
						>
							{i}
						</a>

					</li>

					);
				})}

			</ul>

		</div>
	)
};

const mapStateToProps = (state, ownProps) => ({
	//page: state.comments.page,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	//setCommentsPage: (pageId) => dispatch(asyncActions.setCommentsPage(pageId)),
});

Pagination.propTypes = {
	mixClass: React.PropTypes.string,
	pagesCount: React.PropTypes.number.isRequired,
	page: React.PropTypes.number.isRequired,
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
