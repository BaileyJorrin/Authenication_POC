import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../../../../redux/store";
import Container from "../Container";

describe("Testing Control Point Grid", () => {
  afterEach(cleanup);

  it("Renders the page without crashing", () => {
    const page = render(
      <Provider store={store}>
        <Container />
      </Provider>,
    );

    const title = page.getAllByText("CONTROL POINTS");

    expect(title).toBeTruthy();
    expect(page).toBeDefined();
  });
});
