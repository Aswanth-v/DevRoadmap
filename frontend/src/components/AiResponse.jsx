import { useState } from "react";
import { Bot, Send } from "lucide-react";
import axios from "axios";

function AskAI() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
 
const askAI = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/ai/chat",
      { message: question }, // 👈 FIX
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error ai chat:", error.response?.data || error);
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

      {/* Chat Box (ALWAYS mounted for animation) */}
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
          <span className="font-medium text-neutral-950">AI Assistant</span>
          <button onClick={() => setOpen(false)}>x</button>
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
    </>
  );
}

export default AskAI;
