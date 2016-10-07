import React from 'react';

import Button from '../../components/common/Button';

const Admin = (props) => {

	if (!props.visible){
		return null;
	}

	return(
		<div className={( (props.mixClass ? props.mixClass : '') + ' gallery-admin')}>

			{
				(props.isSystem)
				?
				<Button 
					mixClass="gallery-admin__button"
					color="blue"
					size="s"
					onClickHandler={props.deleteHandler}
				>
					<span className="button__text">Удалить</span>
				</Button>
				:
				null
			}

		</div>

	)
};

Admin.propTypes = {
	mixClass: React.PropTypes.string,
	visible: React.PropTypes.bool.isRequired,
	deleteHandler: React.PropTypes.func.isRequired,
	isSystem: React.PropTypes.bool.isRequired,
	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default Admin;
