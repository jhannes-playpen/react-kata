import App from '../src/App.jsx';
import ScoreBoard from '../src/ScoreBoard.jsx';

import React from 'react';
import {shallow} from "enzyme";

import {expect} from 'chai';

it('renders a ScoreBoard component', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(ScoreBoard).nodes).to.be.not.empty;
});


