import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { Page } from "./index.page";

test("home", () => {
  render(<Page />);
  expect(screen.getByText("Welcome")).toBeDefined();
});
