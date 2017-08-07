import {ScoreBoard, NextRollInput, ScoreView, FrameList, Frame}
  from '../src/ScoreBoard.jsx';

import React from 'react';
import {shallow} from "enzyme";

import chai from 'chai';
import spies from 'chai-spies';

chai.use(spies);

const {expect} = chai;


describe('Score board', () => {
  it('renders Frames', () => {
    const wrapper = shallow(<ScoreBoard />);
    expect(wrapper.find(ScoreView).props().rolls).to.eql([]);
  });

  it('updates frames', () => {
    const wrapper = shallow(<ScoreBoard />);
    wrapper.find(NextRollInput).props().onNextRoll(8);
    expect(wrapper.find(ScoreView).props().rolls).to.eql([8]);
  });
});

describe('Score view', () => {
  it('renders frame list', () => {
    const rolls = [1, 2, 3, 4];
    const frames = [
      {first: "1", second: "2", total: "3"},
      {first: "3", second: "4", total: "10"},
      {}, {}, {}, {}, {}, {}, {}, {}
    ];
    const wrapper = shallow(<ScoreView rolls={rolls} />);
    expect(wrapper.find(FrameList).props().frames).to.eql(frames);
  });
});

describe('Frame list', () => {
  it('renders frames', () => {
    const frames = [{}, {}, {}];

    const wrapper = shallow(<FrameList frames={frames} />);
    expect(wrapper.find(Frame)).to.have.length(frames.length);
  });

  it("shows simple frames", () => {
    const frames = [{}, {first: "3", second: "2", total: "11"}];
    const wrapper = shallow(<FrameList frames={frames} />);
    expect(wrapper.find(Frame).at(1).props()).to.
      eql({round: 2, first: "3", second: "2", total: "11"});
  });
});

describe('Frame', () => {
  it('renders frame', () => {
    const wrapper = shallow(<Frame first="2" second="7" total="102" />);
    expect(wrapper.find('.first').text()).to.eql("2");
    expect(wrapper.find('.second').text()).to.eql("7");
    expect(wrapper.find('.total').text()).to.eql("102");
  });
});

describe("Next roll input", () => {
  it("update next roll", () => {
    const wrapper = shallow(<NextRollInput onNextRoll={() => {}} />);
    wrapper.find('#nextRoll').simulate('change', {
      target: {value: '8'}
    });
    expect(wrapper.state().nextRoll).to.equal("8");
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    expect(wrapper.state().nextRoll).to.equal("");

  });

  it("reports next roll", () => {
    const spy = chai.spy();

    const wrapper = shallow(<NextRollInput onNextRoll={spy} />);
    wrapper.find('#nextRoll').simulate('change', {
      target: {value: '7'}
    });
    wrapper.find('form').simulate('submit', {preventDefault: () => {}});
    expect(spy).to.have.been.called.with(7);
  });
});
