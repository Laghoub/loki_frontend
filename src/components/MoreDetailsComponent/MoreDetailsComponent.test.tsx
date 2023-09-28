import React from 'react';
import ReactDOM from 'react-dom';
import MoreDetailsComponent from './MoreDetailsComponent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MoreDetailsComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});