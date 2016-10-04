import React from 'react';

const Button = (props) => (
	<button 
		className={( 
						(props.mixClass ? props.mixClass : '')						
						+ ' button'
						+ (props.size ? ' button--' + props.size : '') 
						+ (props.color ? ' button--' + props.color : '') 
						+ (props.block ? ' button--block' : '') 
					)}
		type={props.type}
		onClick={props.onClickHandler}
		disabled={props.disabled}
	>
		{props.children}
	</button>
);

Button.propTypes = {
	mixClass: React.PropTypes.string,
	size: React.PropTypes.string,
	color: React.PropTypes.string,
	type: React.PropTypes.string,
	block: React.PropTypes.bool,
	disabled: React.PropTypes.bool,

	onClickHandler: React.PropTypes.func,
};

export default Button;
