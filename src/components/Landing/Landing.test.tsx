import React from "react";

import { render } from "setupTests";
import Landing from "./Landing";

describe("Landing", () => {
  it("renders with default props", () => {
    render(<Landing />);
  });
});
