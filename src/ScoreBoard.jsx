import React from 'react';

import {scoreThrows} from './bowling.jsx';

const FRAMES_PER_GAME = 10;

export class ScoreBoard extends React.Component {
  constructor() {
    super();
    this.state = {rolls: []};
    this.handleNewRoll = this.handleNewRoll.bind(this);
  }

  handleNewRoll(value) {
    const {rolls} = this.state;
    const updatedRolls = rolls.concat([value]);
    this.setState({rolls: updatedRolls});
  }

  render() {
    const frames = [],
      {rolls} = this.state;
    for (let i=0; i<FRAMES_PER_GAME; i++) {
      frames.push({index: i});
    }

    return (
      <div>
        <ScoreView rolls={rolls} />
        <NextRollInput onNextRoll={this.handleNewRoll} />
      </div>
    );
  }
}

export class NextRollInput extends React.Component {
  constructor() {
    super();
    this.state = {nextRoll: ""};
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(e) {
    const {nextRoll} = this.state;
    this.props.onNextRoll(parseInt(nextRoll, 10));
    this.setState({nextRoll: ""});
    e.preventDefault();
  }

  render() {
    const {nextRoll} = this.state;

    return (
      <form onSubmit={this.handleSave}>
        <input autoFocus={true} type="number" id="nextRoll" value={nextRoll}
          onChange={e => this.setState({nextRoll: e.target.value})} />
        <button id="save">Save</button>
      </form>
    );
  }
}

export function ScoreView(props) {
  const frames = scoreThrows(props.rolls);

  return <FrameList frames={frames} />;
}

export function FrameList(props) {
  const {frames} = props;

  return (
    <div>
      {frames.map((frame, i) => {
        const {first, second, total} = frame;
        return <Frame
          key={i}
          round={i+1}
          first={first}
          second={second}
          total={total} />;
      })}
    </div>
  );
}

export function Frame(props) {
  const {round, first, second, total} = props;

  return (
    <div className="frame">
      <h3>Round {round}</h3>
      <div className="first">{first}</div>
      <div className="second">{second}</div>
      <div className="total">{total}</div>
    </div>
  );
}
