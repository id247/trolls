import React from 'react';
import { connect } from 'react-redux';

const Checkbox = (props) => (
	<label className={( (props.mixClass ? props.mixClass : '') + ' class')} id="class">
		<input
			type="checkbox"
			name={props.name}
			value={props.value}
			checked={props.checked}	
			onChange={props.onChangeHandler}
		/>
		{props.children}
	</label>
);

Checkbox.propTypes = {
	mixClass: React.PropTypes.string,
	onChangeHandler: React.PropTypes.func.isRequired,
	checked: React.PropTypes.bool.isRequired,
	name: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired,
};

export default Checkbox;
