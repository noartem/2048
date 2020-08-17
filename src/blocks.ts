export type Direction = 0 | 1 | 2 | 3;

function toRows(arr: number[], direction: Direction, chunkSize: number) {
  var R = [];
  if (direction === 0 || direction === 2) {
    for (let i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
  } else {
    for (let i = 0, len = arr.length; i < len; i++) {
      let n = i % chunkSize;
      if (R[n]) {
        R[n].push(arr[i]);
      } else {
        R.push([arr[i]]);
      }
    }
  }

  if (direction > 1) {
    R = R.map((el) => el.reverse());
  }

  return R;
}

function toBlocks(
  rows: number[][],
  direction: Direction,
  chunkSize: number
): number[] {
  if (direction > 1) {
    rows = rows.map((row) => row.reverse());
  }

  if (direction === 0 || direction === 2) {
    return rows.reduce((acc, row) => acc.concat(row), []);
  } else {
    const count = rows.reduce((acc, row) => row.length + acc, 0);

    return rows.reduce((acc, row, rowIndex) => {
      row.forEach((block, blockIndex) => {
        acc[blockIndex * chunkSize + rowIndex] = block;
      });

      return acc;
    }, new Array(count));
  }
}

function moveRow(row: number[]) {
  let score = 0;
  for (let i = 0; i < row.length; i++) {
    if (row.slice(i).reduce((acc, block) => block === 0 && acc, true)) {
      return { row, score };
    }

    if (row[i] === 0) {
      row.splice(i, 1);
      row.push(0);

      if (i !== row.length - 1) {
        i--;
      }

      continue;
    }

    if (i > 0 && row[i - 1] === row[i]) {
      score += row[i] * 2;
      row[i - 1] = row[i] * 2;
      row.splice(i, 1);
      row.push(0);

      // i--;

      // if (row[i] === row[i - 1]) {
      //   i--;
      // }

      continue;
    }
  }

  return { row, score };
}

const moveBlocks = (blocks: number[], direction: Direction, size: number) => {
  let newScore = 0;
  let newBlocks = toBlocks(
    toRows(blocks.slice(), direction, size).map((row) => {
      const { row: newRow, score } = moveRow(row);
      newScore += score;
      return newRow;
    }),
    direction,
    size
  );

  return { newBlocks, newScore };
};

const randEl = <T>(arr: T[]) => arr[(arr.length * Math.random()) | 0];

const addRandom = (blocks: number[]) => {
  const nulls = blocks.reduce(
    (nulls, block, index) => (block === 0 ? [...nulls, index] : nulls),
    new Array<number>()
  );

  blocks[randEl(nulls)] = randEl([2, 2, 2, 4]);

  return blocks;
};

const eq = <T>(a: T, b: T) => JSON.stringify(a) === JSON.stringify(b);

const checkIfFail = (blocks: number[], size: number) => {
  const d1 = moveBlocks(blocks, 0, size),
    d2 = moveBlocks(blocks, 1, size),
    d3 = moveBlocks(blocks, 2, size),
    d4 = moveBlocks(blocks, 3, size);

  return {
    newBlocks: blocks,
    isFailed: eq(d1, d2) && eq(d2, d3) && eq(d3, d4),
  };
};

export const nextBlocks = (
  blocks: number[],
  direction: Direction,
  size: number
) => {
  const { newBlocks, newScore } = moveBlocks(blocks, direction, size);

  return { ...checkIfFail(addRandom(newBlocks), size), newScore };
};

export const newBlocks = (size: number) =>
  addRandom(new Array(size * size).fill(0));

export type BlockColor = {
  font: string;
  background: string;
};

export const getColor = (block: number): BlockColor => {
  switch (block) {
    case 0:
      return { background: "#CDC0B4", font: "#CDC0B4" };
    case 2:
      return { background: "#EEE4DA", font: "#797066" };
    case 4:
      return { background: "#EFE3D1", font: "#797066" };
    case 8:
      return { background: "#F9B482", font: "#FAF7F4" };
    case 16:
      return { background: "#FB9569", font: "#FAF7F4" };
    case 32:
      return { background: "#FD7C64", font: "#FAF7F4" };
    case 64:
      return { background: "#F15A40", font: "#FAF7F4" };
    case 128:
      return { background: "#F5D873", font: "#FAF7F4" };
    case 256:
      return { background: "#F3D058", font: "#FAF7F4" };
    case 512:
      return { background: "#E6C03E", font: "#FAF7F4" };
    case 1024:
      return { background: "#E5BA32", font: "#FAF7F4" };
    case 2048:
      return { background: "#EFC42F", font: "#FAF7F4" };
    case 4096:
      return { background: "#BA84AA", font: "#FAF7F4" };
    default:
      return { background: "#AE60A4", font: "#FAF7F4" };
  }
};
