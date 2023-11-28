import React from "react";

import { render } from "setupTests";
import Chatbot from "./Chatbot";

describe("Chatbot", () => {
  it("renders with default props", () => {
    render(<Chatbot />);
  });
});
