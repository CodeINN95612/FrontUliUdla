import React from "react";

import { render } from "setupTests";
import SpeakBot from "./SpeakBot";

describe("SpeakBot", () => {
  it("renders with default props", () => {
    render(<SpeakBot />);
  });
});
