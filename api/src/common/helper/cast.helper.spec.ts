import { toLowerCase, trim, toDate, toBoolean } from './cast.helper';

describe('cast helper', () => {
  describe('toLowerCase', () => {
    it('should return lower case string', () => {
      expect(toLowerCase('Hello WORLD!')).toBe('hello world!');
    });
  });
  describe('trim', () => {
    it('should return trimmed string', () => {
      expect(trim(' Hello WORLD! ')).toBe('Hello WORLD!');
    });
  });
  describe('toDate', () => {
    it('should return date', () => {
      expect(toDate('2020-01-01')).toEqual(new Date('2020-01-01'));
    });
  });
  describe('toBoolean', () => {
    it('should return true', () => {
      expect(toBoolean('true')).toBe(true);
    });
    it('should return true', () => {
      expect(toBoolean('1')).toBe(true);
    });
    it('should return false', () => {
      expect(toBoolean('false')).toBe(false);
    });
    it('should return false', () => {
      expect(toBoolean('0')).toBe(false);
    });
  });
});
