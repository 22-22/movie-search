import fetch from 'isomorphic-fetch';
import loadMovie from './loadMovie';

describe('loadMovie', () => {
  it('should work correctly if a search query has more then one word',
    () => loadMovie('museum hours', 1)
      .then((data) => expect(data[0].Title).toEqual('Museum Hours')));
  it('should return an array of results', () => loadMovie('summer', 1)
    .then((data) => expect(data).toBeInstanceOf(Array)));
});
