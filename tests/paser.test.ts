import { parseLine } from '../src/parser';
import { BookRecord } from '../src/types';

describe('parseLine', () => {
  const validLine =
    '9781234567890' + 
    'The Great Gatsby'.padEnd(100, ' ') + 
    'F. Scott Fitzgerald'.padEnd(50, ' ') + 
    '1925' + 
    '050'; 

  test('should correctly parse a valid fixed-width line', () => {
    const result = parseLine(validLine);

    const expected: BookRecord = {
      ISBN: '9781234567890',
      Title: 'The Great Gatsby',
      Author: 'F. Scott Fitzgerald',
      PublishedYear: 1925,
      Copies: 50,
    };

    expect(result).toEqual(expected);
  });

  test('should return null for empty line', () => {
    const result = parseLine('');
    expect(result).toBeNull();
  });

  test('should return null for invalid numeric fields', () => {
    const invalidLine =
      '9781234567890' +
      'Invalid Book'.padEnd(100, ' ') +
      'Unknown'.padEnd(50, ' ') +
      'abcd' + // Invalid PublishedYear
      'xyz'; // Invalid Copies

    const result = parseLine(invalidLine);
    expect(result).toBeNull();
  });

  test('should return null when ISBN is missing', () => {
    const invalidLine =
      ''.padEnd(13, ' ') + // Empty ISBN
      'Book Without ISBN'.padEnd(100, ' ') +
      'Anonymous'.padEnd(50, ' ') +
      '2000' +
      '010';

    const result = parseLine(invalidLine);
    expect(result).toBeNull();
  });

  test('should trim spaces correctly from fields', () => {
    const spacedLine =
      '9780000000000' +
      '   A Spaced Title   '.padEnd(100, ' ') +
      '   An Author   '.padEnd(50, ' ') +
      '1999' +
      '005';

    const result = parseLine(spacedLine);

    expect(result).toEqual({
      ISBN: '9780000000000',
      Title: 'A Spaced Title',
      Author: 'An Author',
      PublishedYear: 1999,
      Copies: 5,
    });
  });
});
