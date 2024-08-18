import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders homepage", () => {
  render(<App />);
  const text = screen.getByText(/Todo Board/i);
  const text2 = screen.getByText(/built with/i);
  expect(text).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
});
