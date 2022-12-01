import { render, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../../../redux/store";
import Container from "../Container";

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useParams: () => ({
    id: "new",
  }),
  useRouteMatch: () => ({ url: "clients/client-details/id" }),
}));

describe("Testing Client Details", () => {
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

    const projectName = page.getAllByText("Client Name");
    expect(projectName).toBeTruthy();

    const projectStatus = page.getAllByText("Client Status");
    expect(projectStatus).toBeTruthy();

    const createdDate = page.getAllByText("Created Date");
    expect(createdDate).toBeTruthy();

    const updatedDate = page.getAllByText("Updated Date");
    expect(updatedDate).toBeTruthy();

  });
});
