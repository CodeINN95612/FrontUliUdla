import React, { useState, useRef } from "react";
import Styles from "./Chatbot.styles";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import UdlaLogo from "../../assets/udla.png";
import { MediaRecorder as MD, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

const Chatbot = (props) => {
  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previousRequest, setPreviousRequest]= useState([
    {
      question: "string",
      answer: "string",
    },
  ])


  const handleInputTextChange = (value) => {
    setInputText(value);
  };

  const handleSend = () => {
    if (inputText.trim()) {
      setChat([...chat, { text: inputText, type: "user" }]);
      fetchChatbotResponse();
      setInputText("");
    }
  };

  const fetchChatbotResponse = () => {
    setIsLoading(true);

    const apiUrl = 'https://udllamaapipresentation20240116105250.azurewebsites.net/api/Chat/makeTextConversation';
    const requestData = {
      text: inputText,
      previousRequests: previousRequest ,
      language: "string",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    };

    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud");
        }
      })
      .then((data) => {
        setChat([
          ...chat,
          { text: data?.currentQuestion, type: "user" },
          { text: data?.currentAnswer, type: "chatbot" },
        ]);
        setPreviousRequest(data?.completeConversation);
        setError(null);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  };

  async function conectar() {
    await register(await connect());
  }
  return (
    <Styles className="Chatbot">
      <div className="Chatbot__body">
        <MainContainer className="Chatbot__body">
          <ChatContainer >
            <MessageList>
              {chat.map((message, index) => (
                <Message
                  key={index}
                  model={{
                    message: message.text,
                    direction: message.type === "user" ? "outgoing" : "incoming",
                  }}
                >
                  {message.type !== "user" ? <Avatar src={UdlaLogo} name={"Uli"} /> : null}
                </Message>
              ))}
              {error && (
                <Message
                  model={{
                    message: `Error: ${error.message}`,
                    direction: "incoming",
                  }}
                />
              )}
            </MessageList>
            <MessageInput
              className="Chatbot__inputContainer"
              placeholder="Type your message here"
              value={inputText}
              onChange={handleInputTextChange}
              onSend={handleSend}
              attachButton={false}
              disabled={isLoading}
            />
          </ChatContainer>
          {isLoading? <TypingIndicator content="Uli esta pensando"/> : null}
        </MainContainer>
      </div>
    </Styles>
  );
};

export default Chatbot;
