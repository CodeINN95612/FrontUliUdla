import React, { useState } from "react";
import Styles from "./Chatbot.styles";
import { ChatbotProps as Props } from "./Chatbot.types";

import SendSVG from "../../assets/send-svgrepo-com.svg";

const Chatbot: React.FC<Props> = (props) => {
  const [inputText, setInputText] = useState("");
  const [chat, setChat] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [error, setError] = useState(null); // State variable to track API errors

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      // Add the user's input message to the chat state instantly
      setChat([...chat, { text: inputText, type: "user" }]);
      // Make the API call to get the chatbot's response
      fetchChatbotResponse();
      setInputText("");
    }
  };

  const fetchChatbotResponse = () => {
    const apiUrl = "https://localhost:7103/api/Chat/makeTextConversation";
    const requestData = {
      text: inputText,
      previousRequests: [
        {
          question: "string",
          answer: "string",
        },
      ],
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
        console.log("Resultado de la API:", data);
        setCurrentAnswer(data?.currentAnswer);
        console.log(data?.currentAnswer);
        // Add the chatbot's response to the chat state
        setChat([...chat,{ text: data?.currentQuestion, type: "user" }, { text: data?.currentAnswer, type: "chatbot" }]);
        setError(null); // Reset the error state
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error); // Set the error state when an error occurs
      });
  };

  return (
    <Styles className="Chatbot">
      <div className="Chatbot__body">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`Chatbot__${message.type === 'user' ? 'user' : 'chatbot'}`}
          >
            {message.text}
          </div>
        ))}
        {/* <div className="message chatbot">
          {currentAnswer}
        </div> */}
         {error && (
          <div className="message error">
            Error: {error.message}
          </div>
        )}
      </div>
      <div className="Chatbot__inputContainer">
      <input
        type="text"
        value={inputText}
        onChange={handleInputTextChange}
        onKeyPress={handleEnterPress}
        placeholder="Escribe una pregunta y presiona Enter"
        className="Chatbot__input"
      />
   {/* <img src={SendSVG} alt="Send" /> */}

      </div>
     
    </Styles>
  )
};

Chatbot.defaultProps = {};

export default Chatbot;
