import shuffleArray from './shuffleArray';

describe('shuffle', () => {
  it('shuffles an array', () => {
    const arr = [0, 1, 2, 3, 4];
    Math.random = () => 0;

    const newArr = shuffleArray(arr);

    expect(newArr).not.toBe(arr);
    expect(newArr).toEqual([1, 2, 3, 4, 0]);
  });
});
