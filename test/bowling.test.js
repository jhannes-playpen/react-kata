
import {expect} from 'chai';
import {scoreThrows} from '../src/bowling.jsx';

describe("bowling scoring", () => {

  it("scores initial game", () => {
    expect(scoreThrows([])).to.eql(Array(10).fill({}));
  });

  it("scores incomplete frames", () => {
    expect(scoreThrows([4])[0]).to.eql({
      first: "4", second: "", total: ""
    });
  });

  it("scores complete frames", () => {
    expect(scoreThrows([2, 0, 2, 3])).to.eql(
      [
        {first: "2", second: "0", total: "2"},
        {first: "2", second: "3", total: "7"}
      ].concat(Array(8).fill({}))
    );
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

  it("scores incomplete spare", () => {
    expect(scoreThrows([1, 9])).to.eql(
      [{first: "1", second: "/", total: ""}].concat(Array(9).fill({})));
  });

  it("scores complete spare", () => {
    expect(scoreThrows([2, 8, 8])).to.eql(
      [
        {first: "2", second: "/", total: "18"},
        {first: "8", second: "", total: ""}
      ].concat(Array(8).fill({}))
    );
  });
});
