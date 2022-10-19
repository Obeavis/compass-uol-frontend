import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer component", () => {
  test("renders the component", async () => {
    const reset = jest.fn();
    const logout = jest.fn();
    const { container } = render(
      <Footer logout={logout} reset={reset} countdown={100} />
    );

    expect(container).toMatchSnapshot();
  });
});
