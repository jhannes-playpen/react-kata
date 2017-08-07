
const FRAME_COUNT = 10,
  NUMBER_OF_PINS = 10;

function initialScoreBoard() {
  const frames = [];
  for (let i=0; i<FRAME_COUNT; i++) {
    frames[i] = {};
  }
  return frames;
}

function frameScore(rolls, throwIndex) {
  let total = 0;
  for (let i=0; i<=throwIndex; i++) {
    total += rolls[i] || 0;
  }
  return total;
}

function frame(rolls, i) {
  const first = rolls[i];
  let second = rolls[i+1];
  let total = frameScore(rolls, i+1);

  if (second === undefined) {
    second = "";
    total = "";
  } else if (first + second === NUMBER_OF_PINS) {
    second = "/";
    if (rolls[i+2]) {
      total += rolls[i+2];
    } else {
      total = "";
    }
  }

  return {
    first: first.toString(),
    second: second.toString(),
    total: total.toString()
  };
}


export function scoreThrows(rolls) {
  const frames = initialScoreBoard();
  let i=0;
  let currentFrame = 0;
  while (i < rolls.length) {
    frames[currentFrame] = frame(rolls, i);
    i += 2;
    currentFrame++;
  }

  return frames;
}
