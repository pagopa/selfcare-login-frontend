import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Location } from 'history';
import SpidSelect from '../SpidSelect';

const oldWindowLocation = global.window.location;

beforeAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: { assign: jest.fn() } });
});
afterAll(() => {
  // eslint-disable-next-line functional/immutable-data
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

test('go to the spid url', () => {
  render(<SpidSelect onBack={() => {}} />);
  const spidImg = screen.getByAltText(/Infocert ID/i);
  expect(spidImg).not.toBeNull();
  const spidSpan = spidImg.parentNode;
  expect(spidSpan).not.toBeNull();
  const spidButton = spidSpan.parentNode;
  expect(spidButton).not.toBeNull();
  expect(spidButton.nodeName).toBe('BUTTON');
  fireEvent.click(spidButton);
  expect(global.window.location.assign).toBeCalledWith(
    'http://selfcare/login?entityID=infocertid&authLevel=SpidL2'
  );
});
