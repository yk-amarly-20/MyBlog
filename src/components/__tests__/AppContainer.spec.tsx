import React from "react";
import renderer from "react-test-renderer";
import { AppContainer } from "../AppContainer";

test("AppContainer", () => {
  const component = renderer.create(<AppContainer />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
