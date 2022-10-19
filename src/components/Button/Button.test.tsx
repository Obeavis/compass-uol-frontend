import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  test("renders the component", async () => {
    const { container } = render(<Button />);

    expect(container).toMatchSnapshot();
  });
});
