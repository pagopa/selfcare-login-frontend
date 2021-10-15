import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SpidSelect from "../SpidSelect";
import { Location } from "history";

const oldWindowLocation = global.window.location;

beforeAll(() => {
   Object.defineProperty(window,'location',{value: { assign : jest.fn()} });
});
afterAll(() => {
  Object.defineProperty(window,'location',{value: oldWindowLocation });
});

test("go to the spid url", () => {
  render(
    <SpidSelect
      onBack={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
  const spidImg = screen.getByAltText(/Infocert ID/i);
  expect(spidImg).not.toBeNull();
  const spidSpan = spidImg.parentNode;
  expect(spidSpan).not.toBeNull();
  const spidButton = spidSpan.parentNode;
  expect(spidButton).not.toBeNull();
  expect(spidButton.nodeName).toBe("BUTTON");
  fireEvent.click(spidButton);
  expect(global.window.location.assign).toBeCalledWith('https://careerkarma.com/login?entityID=infocertid&authLevel=SpidL2');
});
