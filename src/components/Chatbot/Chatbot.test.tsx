import React from "react";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import Chatbot from "./Chatbot";

describe("Chatbot", () => {
  it("renders with default props", () => {
    render(<Chatbot />);
    // Ensure that the Chatbot component renders without crashing
    const chatbotElement = screen.getByTestId("chatbot-component");
    expect(chatbotElement).toBeInTheDocument();
  });

  it("sends messages and displays chat", async () => {
    render(<Chatbot />);
    
    // Get the input and send button elements
    const inputElement = screen.getByPlaceholderText("Type your message here");
    const sendButton = screen.getByText("Send");

    // Simulate user input and send a message
    userEvent.type(inputElement, "Hello, Uli!");
    userEvent.click(sendButton);

    // Wait for API response and check if the message appears in the chat
    const chatMessage = await screen.findByText("Hello, Uli!");
    expect(chatMessage).toBeInTheDocument();
  });

  // Add more specific tests for other functionalities if needed
});
