import React from 'react';
import { connect } from 'react-redux';

class Fabric extends React.Component {
		
	constructor(props){
		super(props);

		this.state = {
			canvas: false,
			elements: [],
			saveLink: '#',
		};
	}

	componentDidMount() {	

		let canvas = new fabric.Canvas(this.refs.canvas);
		canvas.setBackgroundColor('#cccccc').renderAll();

		canvas.on('object:selected', function(options) {
			//options.target.bringToFront();
		});

		this.setState({canvas: canvas});

		
	}

	_add(e){
		e.preventDefault();

		// create a rectangle object
		var rect = new fabric.Rect({
		  left: 100,
		  top: 100,
		  fill: 'red',
		  width: 20,
		  height: 20
		});

		// "add" rectangle onto canvas
		this.state.canvas.add(rect).setActiveObject(rect);

		let elements = this.state.elements;

		elements.push(rect);

		this.setState({elements: elements});
	}

	_addImage(e){
		e.preventDefault();

		var image = new Image();
		image.setAttribute('crossOrigin','Anonymous');
		image.src = e.target.src;

		image.onload = () => {
		
			var imgInstance = new fabric.Image(image, {
			  left: 960 / 2 - image.width / 2,
			  top: 500 / 2 - image.height / 2, 
			});

			this.state.canvas.add(imgInstance).setActiveObject(imgInstance);
			
			let elements = this.state.elements;

			elements.push(imgInstance);

			this.setState({elements: elements});
		
		}


	}

	_addSVG(e){
		e.preventDefault();

		const that = this; 

		fabric.loadSVGFromURL(e.target.src, function(objects, options) {

			//console.log(options);

			objects.forEach( (object, i) => {

				console.log(i, object);

				object.set({
					//left: 960 / 2 - options.width / 2 + object.left,
					//top: 600 / 2 - options.height / 2 + object.top, 
					//lockMovementX: true,
					//lockMovementY: true,
					//lockRotation: true,
					//lockScalingX: true,
					//hasControls: false,
					//borderColor: '#ff0000',
					//cornerSize: 6,
					//selectable: (object.height > 400) ? false : true,
				});



				//that.state.canvas.add(object);

				if (object.height > 400){
					that.state.canvas.sendToBack(object)
				} 
				
			});

			var shape = fabric.util.groupSVGElements(objects, options);
			
		   //  shape.set({
			  // left: 960 / 2 - shape.width / 2,
			  // top: 500 / 2 - shape.height / 2, 
		   //  });

		   //  if (shape.isSameColor && shape.isSameColor() || !shape.paths) {
		   //    //shape.setFill(colorSet);
		   //  }

		   //  else if (shape.paths) {
		   //    for (var i = 0; i < shape.paths.length; i++) {
		   //      //shape.paths[i].setFill(colorSet);
		   //      //shape.paths[i].setFill('#fff');
		   //    }
		   //  }

			that.state.canvas.add(shape);
			that.state.canvas.renderAll();
						

		}, (element, object) => {
			object.fixed = Boolean(element.getAttribute('myfixed'));
		});


	}

	_changeColor(e){
		e.preventDefault();

		const activeObject = this.state.canvas.getActiveObject() == null ? this.state.canvas.getActiveGroup() : this.state.canvas.getActiveObject()

		activeObject.set({
			fill: e.target.value
		})

		 if (activeObject.paths) {
			  for (var i = 0; i < activeObject.paths.length; i++) {
				console.log(activeObject.paths[i]);
				if (!activeObject.paths[i].fixed){
					activeObject.paths[i].setFill(e.target.value);
				}
				
			  }
			}
		
		this.state.canvas.renderAll();
	}

	_delete(e){
		e.preventDefault();
		this.state.canvas.getActiveObject().remove();
	}


	_toBack(e){
		e.preventDefault();
		this.state.canvas.getActiveObject().sendBackwards();
	}

	_toFront(e){
		e.preventDefault();
		this.state.canvas.getActiveObject().bringForward();
	}

	_move(e){
		e.preventDefault();

		const activeObject = this.state.canvas.getActiveObject();

		activeObject && activeObject.animate('left', '+=100', { onChange: this.state.canvas.renderAll() });
	}

	_save(e){
		e.preventDefault();

		//window.open(this.state.canvas.deactivateAll().toDataURL({format: 'jpeg', quality: 0.8}));
		this.setState({
			...this.state,
			...{
				saveLink: this.state.canvas.deactivateAll().toDataURL({format: 'jpeg', quality: 0.8}), 
			}
		});

	}

	_addPhoto(input){
		console.log(input);

		const { state, refs } = this;

		const file = input.files && input.files[0] ? input.files[0] : false;

		if (!file || !(/\.(jpe?g|png|gif)$/i.test(file.name))) {
			input.value = '';
			return false;
		}

		const reader = new FileReader();
		const image = new Image();

		reader.onload = function(e){
			const base64 = e.target.result;
			image.src = base64;
		}

		image.onload = function(){

			const imgInstance = new fabric.Image(image, {
				left: 0,
				top: 0,
				//width: '100%',
				angle: 0,
				opacity: 1.0,
				selectable: false,
			});

			imgInstance.scaleToWidth(state.canvas.getWidth());

			if (imgInstance.scaleY){

				imgInstance.top = - (imgInstance.height * imgInstance.scaleY - state.canvas.getHeight()) / 2;
			}
			
			state.canvas.add(imgInstance);
		}

		reader.readAsDataURL(file);

	}

	_addPhotoHandler = () => (e) => {
		//e.preventDefault;
		
		this._addPhoto(e.target);
	}

	render() {	


		const imagesPlaceholderStyle = {
			float: 'left',
			width: '50%',
			minHeight: '140px',
			padding: '20px 0'
		};	

		const colorPlaceholderStyle = {
			float: 'right',
			width: '50%',
			minHeight: '140px',
			textAlign: 'right',
			padding: '20px 0'
		};	

		const buttonPlaceholderStyle = {
			textAlign: 'center',
			width: '100%'
		};	

		const buttonStyle = {
			padding: '10px 20px',
			fontSize: '20px'
		};		

		return (
			<div>
				<div>
					<canvas ref="canvas" width="960" height="600"></canvas>	
				</div>	
				<div style={imagesPlaceholderStyle}>

					<img onClick={this._addSVG.bind(this)} crossOrigin="Anonymous" width="100" src="http://ad.csdnevnik.ru/special/staging/comix/images/templates/eyes/1.svg" alt=""/>
					<img onClick={this._addSVG.bind(this)} crossOrigin="Anonymous" width="100" src="http://ad.csdnevnik.ru/special/staging/comix/images/templates/eyes/2.svg" alt=""/>
					<br/>
					<img onClick={this._addSVG.bind(this)} crossOrigin="Anonymous" width="100" src="http://ad.csdnevnik.ru/special/staging/comix/images/templates/noses/1.svg" alt=""/>
					<img onClick={this._addSVG.bind(this)} crossOrigin="Anonymous" width="100" src="http://ad.csdnevnik.ru/special/staging/comix/images/templates/noses/2.svg" alt=""/>
					<br/>
					<img onClick={this._addSVG.bind(this)} crossOrigin="Anonymous" width="100" src="http://ad.csdnevnik.ru/special/staging/comix/images/templates/mouths/1.svg" alt=""/>
					<img onClick={this._addSVG.bind(this)} crossOrigin="Anonymous" width="100" src="http://ad.csdnevnik.ru/special/staging/comix/images/templates/mouths/2.svg" alt=""/>
				</div>	
				<div style={colorPlaceholderStyle}>
					Выбор цвета
					<input onChange={this._changeColor.bind(this)} type="color"/>
				</div>	
				<div style={buttonPlaceholderStyle}>	
					
					<input type="file" onChange={this._addPhotoHandler()} className="" />
					
					<button style={buttonStyle} onClick={this._toBack.bind(this)}>To back</button>
					<button style={buttonStyle} onClick={this._toFront.bind(this)}>To front</button>
					<button style={buttonStyle} onClick={this._delete.bind(this)}>Delete element</button>
					<button style={buttonStyle} onClick={this._save.bind(this)}>Save</button>

					<a href={this.state.saveLink} download>Скачать</a>
				</div>
			</div>
		);
	}

}


Fabric.propTypes = {
	mixClass: React.PropTypes.string,
};

const mapStateToProps = (state, ownProps) => ({
	profile: state.user.profile,
});

const mapDispatchToProps = (dispatch, ownProps) => ({ 
	//login: () => dispatch(asyncActions.login()),
	//init: () => dispatch(asyncActions.init()), 
	//redirect: (page) => dispatch(pageActions.setPageWithoutHistory(page)), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Fabric);




