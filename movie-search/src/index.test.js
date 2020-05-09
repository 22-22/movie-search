import searchMovie from './script';

describe('searchMovie', () => {
  it('should return result', () => {
    expect(searchMovie()).toBeDefined();
  });
});
