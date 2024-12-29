import React, { useState, useEffect, useRef } from "react";
import { FaMosque, FaPaperPlane, FaInfoCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const AiBot = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [showInfoModal, setShowInfoModal] = useState(false);
  const chatContainerRef = useRef(null);

  const SendPrompt = async () => {
    if (input.trim() === "") return;

    setChat([...chat, { you: input }]);
    setInput("");
    setLoading(true);

    const url = "https://sam-bot-qkwp.vercel.app/api/ai/chat";
    try {
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });
      const res = await req.json();

      liveTextRenderer(res.message);
    } catch (error) {
      console.error(error);
      setChat((prevChat) => [
        ...prevChat,
        { bot: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const liveTextRenderer = (message) => {
    let index = 0;
    setTypingMessage("");
    const interval = setInterval(() => {
      setTypingMessage((prev) => prev + message[index]);
      index++;
      if (index >= message.length) {
        clearInterval(interval);
        setChat((prevChat) => [...prevChat, { bot: message }]);
        setTypingMessage("");
      }
    }, 50);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat, typingMessage]);

  return (
    <div className="flex flex-col h-screen bg-gray-200">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <FaMosque className="text-3xl" />
          <h1 className="text-xl font-bold">Spiritual Bot</h1>
        </div>
        <button
          onClick={() => setShowInfoModal(true)}
          className="text-white hover:text-gray-300 transition"
        >
          <FaInfoCircle size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main
        ref={chatContainerRef}
        className="flex-grow p-4 overflow-y-auto"
        style={{ scrollBehavior: "smooth" }}
      >
        {chat.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {chat.map((item, index) => (
              <div key={index} className="flex flex-col space-y-2">
                {item.bot && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="self-start bg-gray-500 p-4 rounded-lg shadow-md max-w-sm"
                  >
                    <p className="text-white">{item.bot}</p>
                  </motion.div>
                )}
                {item.you && (
                  <div className="self-end bg-blue-500 text-white p-4 rounded-lg shadow-md max-w-sm">
                    <p>{item.you}</p>
                  </div>
                )}
              </div>
            ))}

            {typingMessage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="self-start bg-teal-800 p-4 rounded-lg shadow-md max-w-sm"
              >
                <p className="text-white">{typingMessage}</p>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FaMosque className="text-6xl text-white mb-4" />
            <p className="text-xl italic">
              "Indeed, in the remembrance of Allah do hearts find rest."
            </p>
          </div>
        )}

        {loading && !typingMessage && (
          <div className="flex justify-center mt-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-teal-500 text-white py-2 px-4 rounded-full shadow-md"
            >
              Typing...
            </motion.p>
          </div>
        )}
      </main>

      {/* Input Area */}
      <footer className="p-4 shadow-lg flex items-center space-x-3">
        <input
          type="text"
          placeholder="Type your message here..."
          className="flex-grow p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={SendPrompt}
          className="bg-blue-500 text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all flex items-center space-x-2"
        >
          <FaPaperPlane />
          <span>Send</span>
        </motion.button>
      </footer>

      {/* Developer Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4">About the Developer</h2>
            <p className="text-gray-700 mb-4">
              This application was developed by Muhammad Sameer, a passionate
              software developer specializing in web and mobile applications.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Sameer-khan0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-sameer-719b9a270"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                LinkedIn Profile
              </a>
            </div>
            <button
              onClick={() => setShowInfoModal(false)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-left"
        autoClose={5000}
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AiBot;
