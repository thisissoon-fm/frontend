import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('should transform time object', () => {
    const result = pipe.transform(`${2 * 60 * 1000}`);
    expect(result).toEqual('2:00');
  });

  it('should transform time object', () => {
    const result = pipe.transform(`${30 * 60 * 1000}`);
    expect(result).toEqual('30:00');
  });

  it('should transform time object', () => {
    const result = pipe.transform(`${65 * 60 * 1000}`);
    expect(result).toEqual('1:05:00');
  });

  it('should NOT transform time object', () => {
    const result = pipe.transform('foo');
    expect(result).toEqual('foo');
  });
});
