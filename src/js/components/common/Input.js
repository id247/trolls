import React from 'react';

const Input = (props) => (
	<input 
		className={( 
					(props.mixClass ? props.mixClass : '') + ' input'
					+ (props.size ? ' input--' + props.size : '') 
				)}
		id={props.id}  
		type={(props.type ? props.type : 'text')}  
		name={props.name} 
		value={props.value} 
		onChange={props.onChangeHandler}
	/>
);

Input.propTypes = {
	mixClass: React.PropTypes.string,
	value: React.PropTypes.string,
	onChangeHandler: React.PropTypes.func,

	type: React.PropTypes.string,
	size: React.PropTypes.string,
	name: React.PropTypes.string.isRequired,
	id: React.PropTypes.string,
};

export default Input;
