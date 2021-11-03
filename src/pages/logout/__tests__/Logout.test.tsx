import React from 'react';
import { render } from '@testing-library/react';
import Logout from '../Logout';
import { storageRead, storageWrite } from '../../../lib/storage-utils';
import {
  ROUTE_LOGIN,
  STORAGE_KEY_ON_SUCCESS,
  STORAGE_KEY_TOKEN,
  STORAGE_KEY_USER,
} from '../../../utils/constants';

const oldWindowLocation = global.window.location;

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: { assign: jest.fn() } });
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('test logout', () => {
  storageWrite(STORAGE_KEY_ON_SUCCESS, 'ON_SUCCESS', 'string');
  storageWrite(STORAGE_KEY_TOKEN, 'TOKEN', 'string');
  storageWrite(STORAGE_KEY_USER, 'USER', 'string');

  render(<Logout />);

  expect(storageRead(STORAGE_KEY_ON_SUCCESS, 'string')).toBeUndefined();
  expect(storageRead(STORAGE_KEY_TOKEN, 'string')).toBeUndefined();
  expect(storageRead(STORAGE_KEY_USER, 'string')).toBeUndefined();

  expect(global.window.location.assign).toBeCalledWith(ROUTE_LOGIN);
});
