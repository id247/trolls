import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Loading 		from '../components/loading/Loading';
import ErrorMessage from '../components/error/ErrorMessage';
import Login 		from '../components/pages/Login';
import App 			from '../components/App';
import Redactor 	from '../components/redactor/Redactor';
import Stickers 	from '../components/stickers/Stickers';
import Gallery 		from '../components/gallery/Gallery';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Redactor} />
			<Route path="stickers" component={Stickers} />
			<Route path="gallery(/:galleryPage)" component={Gallery} />
			<Route path="gallery/2" component={Gallery} />
		</Route>
		{/*<Route path="/login" component={Login} /> */}
	</Router>
);

class Root extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				<div className="app">
					{routes}
					
					<Loading 
						mixClass="app__loader"
						visibleClass="loader--visible"
					/>
					
					<ErrorMessage 
						mixClass="app__error"
					/>
				</div>
			</Provider>
		);
	}
}

export default Root;

