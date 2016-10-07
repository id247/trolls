import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App 		from '../components/App';
import Nav 		from '../components/nav/Nav';

const routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Nav} />
		<Route path="/:pageId" component={Nav} />
	</Router>
);

class RootNav extends React.Component {

	render() {		
		return (
			<Provider store={this.props.store}>		
				{routes}
			</Provider>
		);
	}
}

export default RootNav;

