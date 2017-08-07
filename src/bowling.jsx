
const FRAME_COUNT = 10;

function initialScoreBoard() {
  const frames = [];
  for (let i=0; i<FRAME_COUNT; i++) {
    frames[i] = {};
  }
  return frames;
}

function frame(rolls, i, total) {
  return {
    first: rolls[i].toString(),
    second: rolls[i+1] && rolls[i+1].toString(),
    total: total.toString()
  };
}

function frameScore(rolls, i) {
  return rolls[i] + (rolls[i+1] ? rolls[i+1] : 0);
}


export function scoreThrows(rolls) {
  const frames = initialScoreBoard();
  let i=0;
  let currentFrame = 0;
  let total = 0;
  while (i < rolls.length) {
    total += frameScore(rolls, i);
    frames[currentFrame] = frame(rolls, i, total);
    i += 2;
    currentFrame++;
  }

  return frames;
}
