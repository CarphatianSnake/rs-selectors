import { capitalize } from 'utils';

test('Capitalize "help" to equal "Help"', () => {
  expect(capitalize('help')).toBe('Help');
});

test('Capitalize "some string" to equal "Some string"', () => {
  expect(capitalize('some string')).toBe('Some string');
});

test('Capitalize "cAmElCaSe" to equal "Camelcase"', () => {
  expect(capitalize('cAmElCaSe')).toBe('Camelcase');
});
