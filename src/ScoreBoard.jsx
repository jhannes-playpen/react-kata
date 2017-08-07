import React from 'react';
import PropTypes from 'prop-types';

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

NextRollInput.propTypes = {
  onNextRoll: PropTypes.func.isRequired
};

export function ScoreView({rolls}) {
  const frames = scoreThrows(rolls);
  return <FrameList frames={frames} />;
}

ScoreView.propTypes = {
  rolls: PropTypes.array.isRequired
};


export function FrameList({frames}) {
  return (
    <div>
      {frames.map(({first, second, total}, i) => {
        const props = {first, second, total};
        return <Frame key={i} round={i+1} {...props} />;
      })}
    </div>
  );
}

FrameList.propTypes = {
  frames: PropTypes.array.isRequired
};


export function Frame({round, first, second, total}) {
  return (
    <div className="frame">
      <h3>Runde {round}</h3>
      <div className="first">{first}</div>
      <div className="second">{second}</div>
      <div className="total">{total}</div>
    </div>
  );
}

Frame.propTypes = {
  round: PropTypes.number.isRequired,
  first: PropTypes.string,
  second: PropTypes.string,
  total: PropTypes.string
};
