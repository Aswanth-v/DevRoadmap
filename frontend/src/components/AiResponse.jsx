import { useState } from "react";
import { Bot, Send } from "lucide-react";
import axios from "axios";

function AskAI() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAI, setShowAI] = useState(false);

  // ✅ ADDED: session-only history
  const [aiHistory, setAiHistory] = useState([]);

  const askAI = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/ai/chat",
        { message: question },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAiReply(response.data.reply);
      setShowAI(true);

      // ✅ ADDED: store each reply
      setAiHistory((prev) => [
        ...prev,
        {
          id: Date.now(),
          question,
          answer: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error("Error ai chat:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* AI Logo Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-black text-white shadow-lg flex items-center justify-center"
        >
          <Bot />
        </button>
      )}

      {/* Chat Box */}
      <div
        className={`
          fixed bottom-6 right-6 w-72 p-3 rounded-xl shadow-lg
          transform transition-all duration-300 ease-out
          ${open
            ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
            : "translate-y-6 opacity-0 scale-95 pointer-events-none"}
        `}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">AI Assistant</span>
          <button onClick={() => {setOpen(false); setShowAI(false)}} >x</button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask your doubts..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg outline-none bg-transparent/85"
          />

          <button
            onClick={() => {
              askAI();
              setQuestion("");
            }}
            className="px-3 rounded-lg hover:bg-gradient-to-t"
          >
            <Send />
          </button>
        </div>
      </div>

      {/* AI Response Panel */}
      {showAI && (
        <div className="fixed top-20 right-4 w-[380px] h-[70vh] bg-transparent shadow-2xl rounded-xl flex flex-col border-green-800 border z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-green-800 bg-transparent rounded-t-xl">
            <span className="font-semibold bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">AI Response</span>
            <button
              onClick={() => setShowAI(false)}
              className="text-gray-500 hover:text-red-500 text-lg"
            >
              ✕
            </button>
          </div>

          {/* Content */}
     <div className="flex-1 overflow-y-auto p-4 text-sm leading-relaxed space-y-4">
  {aiHistory.map((item) => (
    <div
      key={item.id}
      className="bg-transparent rounded-lg p-3bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent"
    >
      <p className="font-semibold bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent mb-1">
        You
        
      </p>
      <p className="mb-2 text-white">{item.question}</p>

      <p className="font-semibold bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent mb-1">
        AI
       
      </p>
      <p className="whitespace-pre-wrap text-white">{item.answer}</p>
    </div>
  ))}

  {loading && (
    <p className="text-gray-500 italic">AI is thinking…</p>
  )}
</div>

        </div>
      )}
    </>
  );
}

export default AskAI;
