import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../../../redux/store";
import Container from "../Container";

describe("Testing Functional Ability Grid", () => {
  afterEach(cleanup);

  it("Renders the page without crashing", () => {
    const page = render(
      <Provider store={store}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </Provider>,
    );

    const title = page.getAllByText("FUNCTIONAL ABILITIES");

    expect(title).toBeTruthy();
    expect(page).toBeDefined();
  });
});