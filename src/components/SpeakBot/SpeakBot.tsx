import React, { useState, useRef } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import UdlaLogo from "../../assets/udla.png";
import { MediaRecorder as MD, register } from "extendable-media-recorder";
import { connect } from "extendable-media-recorder-wav-encoder";

import Styles from "./SpeakBot.styles";
import { SpeakBotProps as Props } from "./SpeakBot.types";

const SpeakBot: React.FC<Props> = (props) => {
  const [chat, setChat] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previousChat, setPreviousChat] = useState([
    {
      question: "string",
      answer: "string",
    },
  ]);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioPlayback, setAudioPlayback] = useState(null); // State to keep track of audio playback

  async function conectar() {
    await register(await connect());
  }

  function playBase64Audio(base64Audio: string): void {
    stopAudio(); // Stop any playing audio before starting new playback

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const binaryData = atob(base64Audio);
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }
  
    // Decode the audio data using the AudioContext
    audioContext.decodeAudioData(arrayBuffer, (buffer) => {
      // Create a source node
      const source = audioContext.createBufferSource();
      source.buffer = buffer;
  
      // Connect the source to the audio context's destination (speakers)
      source.connect(audioContext.destination);
  
      // Start playing the audio
      source.start();

      setAudioPlayback(source); // Set the current audio playback source
    }, (error) => {
      console.error('Error decoding audio data:', error);
    });
  }

  function stopAudio() {
    if (audioPlayback) {
      audioPlayback.stop();
      setAudioPlayback(null);
    }
  }

  async function callSpeechApi(inputText) {
    const apiUrl = "https://udllamaapipresentation20240116105250.azurewebsites.net/api/Speech/tts";
  
    try {
      // Make the POST request
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse and handle the response data
      const data = await response.json();
      playBase64Audio(data.b64EncodedAudio);
    } catch (error) {
      // Handle errors
      console.error("Error:", error.message);
    }
  }
  
  const handleSend = async (inputText:string) =>{
    const apiUrl = "https://udllamaapipresentation20240116105250.azurewebsites.net/api/Chat/makeTextConversation";
        const requestData = {
          text: inputText,
          previousRequests: previousChat,
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
            setError(null);
            setPreviousChat(data?.completeConversation);
            callSpeechApi(data?.currentAnswer);
          })
          .catch((error) => {
            console.error("Error:", error);
            setError(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
  }

  const handleStart = async () => {
    stopAudio(); // Stop audio playback before starting recording

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    try {
      await conectar();
    } catch {}
    const mediaRecorder = new MD(stream, {
      mimeType: "audio/wav",
    });
    setMediaRecorder(mediaRecorder);
    const audioChunks = [];
    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });
    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks, {
        type: "audio/wav; codecs=0",
      });
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64data = reader.result.split("base64,")[1];

        const response = await fetch("https://udllamaapipresentation20240116105250.azurewebsites.net/api/Speech/stt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            b64EncodedAudio: base64data,
          }),
        });

        const data = await response.json();
        handleSend(data?.text);
        setIsLoading(true);
      };
    });
    mediaRecorder.start();
    setRecording(true);
  };

  const handleStop = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
      setMediaRecorder(null);
    }
  };

  return (
    <Styles className="SpeakBot">
      <div className="SpeakBot__body">
        <MainContainer className="SpeakBot__body">
          <ChatContainer>
            <MessageList>
              {chat.map((message, index) => (
                <Message
                  key={index}
                  model={{
                    message: message.text,
                    direction:
                      message.type === "user" ? "outgoing" : "incoming",
                  }}
                >
                  {message.type !== "user" ? (
                    <Avatar src={UdlaLogo} name={"Uli"} />
                  ) : null}
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
          </ChatContainer>
          <button onClick={recording ? handleStop : handleStart} disabled={isLoading}>
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
          {isLoading ? <TypingIndicator content="Uli esta pensando" /> : null}
        </MainContainer>
      </div>
    </Styles>
  );
};

SpeakBot.defaultProps = {};

export default SpeakBot;
