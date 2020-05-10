import isEnglish from './isEnglish';

describe('isEnglish', () => {
  it('should return result', () => {
    expect(isEnglish()).toBeDefined();
  });
  it('should return false if the input is in Russian', () => {
    expect(isEnglish('по-русски')).toEqual(false);
  });
  it('should work correctly with capital letters', () => {
    expect(isEnglish('CAPITAL LETTERS')).toEqual(true);
  });
});
