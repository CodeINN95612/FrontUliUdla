import { useState } from 'react';

const Chatbot = () => {
  const [inputText, setInputText] = useState('');
  const [chat, setChat] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  // useEffect(() => {
  //   const jsonData = {
  //     "currentQuestion": "Hola",
  //     "currentAnswer": "El fraude fiscal es una actividad ilegal en la que una persona, empresa u organización evade el pago de impuestos de manera deliberada y engañosa al ocultar, subdeclarar o manipular sus ingresos, gastos o activos con el fin de pagar menos impuestos de los que legalmente le corresponderían. Este acto perjudica a las arcas públicas al reducir los recursos disponibles para financiar servicios gubernamentales y programas sociales, lo que a menudo conlleva sanciones legales y penales cuando es descubierto por las autoridades fiscales. El fraude fiscal socava la equidad del sistema tributario y es considerado una infracción seria en la mayoría de las jurisdicciones",
  //     "completeConversation": [
  //       {
  //         "question": "string",
  //         "answer": "string"
  //       }
  //     ],
  //     "isCommand": true,
  //     "location": "string"
  //   };
  //   setCurrentAnswer(jsonData.currentAnswer);
  //   // const conversation = jsonData.completeConversation.map(item => ({
  //   //   text: item.question,
  //   //   type: 'user'
  //   // }));
  //   // setChat(conversation);
  // }, []);

  function componentDidMount() {
    const apiUrl = 'https://localhost:7103/api/Chat/makeTextConversation';
    const requestData = {
        "text": inputText,
        "previousRequests": [
          {
            "question": "string",
            "answer": "string"
          }
        ],
        "language": "string"
    };

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    };

    fetch(apiUrl, requestOptions)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Error en la solicitud');
        }
      })
      .then(data => {
        setCurrentAnswer(data?.currentAnswer);
        setChat([...chat, { text: inputText, type: 'user' },{text: data?.currentAnswer, type:'chatbot'}]);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  const handleInputTextChange = (e) => {
    setInputText(e.target.value);
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      componentDidMount();
      setInputText('');
    }
  };

  return (
    <div>
      <div className="chatbot">
        {chat.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'user' ? 'user' : 'chatbot'}`}
          >
            {message.text}
          </div>
        ))}
        {/* <div className="message chatbot">
          {currentAnswer}
        </div> */}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputTextChange}
        onKeyPress={handleEnterPress}
        placeholder="Escribe una pregunta y presiona Enter"
      />
    </div>
  );
};

export default Chatbot;
