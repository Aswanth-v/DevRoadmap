import { useState } from "react";
import { Bot, Send } from "lucide-react";
function AskAI() {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const askAI = () => {
    console.log(question);
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-black text-white text-md shadow-lg flex items-center justify-center"
        >
          <Bot />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 bg-transparent p-3 rounded-xl shadow-lg w-72">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-transparent/90">
              AI Assistant
            </span>
            <button onClick={() => setOpen(false)}>x</button>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ask your doubts..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1  px-3 py-2 rounded-lg outline-none bg-transparent/100"
            />

            <button
              onClick={() => {
                askAI();
                setQuestion("");
              }}
              className="bg-transparent text-white px-4 rounded-lg"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AskAI;
