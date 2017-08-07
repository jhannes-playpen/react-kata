
import {expect} from 'chai';
import {scoreThrows} from '../src/bowling.jsx';

describe("bowling scoring", () => {
  it("scores initial game", () => {
    expect(scoreThrows([])).to.eql(Array(10).fill({}));
  });

  it("scores incomplete frames", () => {
    expect(scoreThrows([4])[0]).to.eql({
      first: "4", second: undefined, total: "4"
    });
  });

  it("scores simple throws", () => {
    const rolls = [1, 2, 3, 4];
    const frames = [
      {first: "1", second: "2", total: "3"},
      {first: "3", second: "4", total: "10"},
      {}, {}, {}, {}, {}, {}, {}, {}
    ];

    expect(scoreThrows(rolls)).to.eql(frames);
  });
});
