import { render } from "@testing-library/react";
import Input from "./Input";

describe("Button component", () => {
  test("renders the component", async () => {
    const { container } = render(<Input name="teste" />);

    expect(container).toMatchSnapshot();
  });
});
