import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../../../redux/store";
import Container from "../Container";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: () => ({
    id: "new",
  }),
  useRouteMatch: () => ({ url: "functional-abilities/functional-abilities-details/id" }),
}));

describe("Testing Functional Ability Details", () => {
  afterEach(cleanup);

  it("Renders the page without crashing", () => {
    const page:any | undefined = render(
      <Provider store={store}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </Provider>,
    );

    expect(page).toBeDefined();
  });

  it("Renders the Details page correctly", async () => {
    const page = render(
      <Provider store={store}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </Provider>,
    );

    const name = page.getAllByText("Name");
    expect(name).toBeTruthy();

    const description = page.getAllByText("Description");
    expect(description).toBeTruthy();

    const isActive = page.getAllByText("Status");
    expect(isActive).toBeTruthy();

    const createdDate = page.getAllByText("Created Date");
    expect(createdDate).toBeTruthy();

    const updatedDate = page.getAllByText("Updated Date");
    expect(updatedDate).toBeTruthy();

  });
});