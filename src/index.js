import React from 'react'; // análogo a createElement, siempre que escribamos jsx hay que importarlo
import ReactDOM from 'react-dom'; // análogo a appendChild
import 'bootstrap/dist/css/bootstrap.css';

import './global.css';
import App from './components/App';

const container = document.getElementById('app');

ReactDOM.render(
  <App />,
  container
);
