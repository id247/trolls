import React from 'react';

const Likes = (props) => {

	const counter = props.counter ? props.counter : false;
	const value = counter ? props.counter.Value : 0;

	return (
		<div className={(props.mixClass ? props.mixClass : '') + ' likes ' + (counter && counter.Liked ? 'likes--liked' : '')}>

			<button 
				className="likes__button"
				onClick={props.clickHandler}
				disabled={(counter && counter.Liked)}
			>

				<span className="likes__lext">{props.text}</span>
				{' '}
				<span className="likes__count">{value > 0 ? value : ''}</span>

			</button>

		</div>
	);
};

Likes.propTypes = {
	mixClass: React.PropTypes.string,
	counter: React.PropTypes.oneOfType([
    	React.PropTypes.bool,
    	React.PropTypes.object,
    ]),
	clickHandler: React.PropTypes.func.isRequired,
	text: React.PropTypes.string.isRequired,
	
//	Array: React.PropTypes.array.isRequired,
//	Bool: React.PropTypes.bool.isRequired,
//	Func: React.PropTypes.func.isRequired,
//	Number: React.PropTypes.number.isRequired,
//	Object: React.PropTypes.object.isRequired,
//	String: React.PropTypes.string.isRequired,
//	Symbol: React.PropTypes.symbol.isRequired,
};

export default Likes;
