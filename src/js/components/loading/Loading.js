import React from 'react';
import { connect } from 'react-redux';

const Loading = (props) => (
	<div 
		className={( 	(props.mixClass ? props.mixClass : '') 
						+ (props.loading && props.visibleClass ? ' ' + props.visibleClass : '') 
						+ ' loader')} 
	>
		<div className="loader__content">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" 
				xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
				width="40px" height="40px" 
				viewBox="0 0 50 50" 
				style={{enableBackground: 'new 0 0 50 50'}} 
				xmlSpace="preserve"
			>
		  		<path fill="#057dc2" 
		  			d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" transform="rotate(40 25 25)">
				</path>
			</svg>
		</div>
	</div>
);

const mapStateToProps = (state, ownProps) => ({	
	loading: state.loading,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
});

Loading.propTypes = {
	mixClass: React.PropTypes.string,
	visibleClass: React.PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
