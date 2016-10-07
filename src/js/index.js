'use strict';


import React from 'react';
import ReactDOM from 'react-dom';

import configureStore 	from './store/configureStore';
import Root 			from './components/Root';
import RootNav 			from './components/RootNav';

const store = configureStore(); 

ReactDOM.render(
	<Root store={store} />,
	document.getElementById('app-content')
);

ReactDOM.render(
	<RootNav store={store} />,
	document.getElementById('app-nav')
);


import likely from 'ilyabirman-likely';

likely.initiate();
