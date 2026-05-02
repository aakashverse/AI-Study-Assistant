import { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import {
  useSummarizeMutation,
  useGenerateQuestionsMutation,
  useGetHistoryQuery,
  useDeleteHistoryMutation,
} from "../features/ai/aiApiSlice";

export default function DashboardPage() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);   // null = untouched, "" = cleared
  const [activeTab, setActiveTab] = useState("summarize");
  const [isLoading, setIsLoading] = useState(false); // ✅ local state, not RTK's

  const [summarize] = useSummarizeMutation();
  const [generateQuestions] = useGenerateQuestionsMutation();

  const { data: history = [], isLoading: historyLoading } = useGetHistoryQuery();
  const [deleteHistory] = useDeleteHistoryMutation();

  const handleSubmit = async () => {
    if (!text.trim() || isLoading) return;

    setResult(null);
    setIsLoading(true);

    try {
      const action = activeTab === "summarize" ? summarize : generateQuestions;
      const res = await action({ text }).unwrap();
      setResult(res?.text ?? "No response received.");
    } catch (err) {
      console.error(err);
      setResult("Error: " + (err?.data?.message || "Something went wrong."));
    } finally {
      setIsLoading(false); // ✅ always runs — success or failure
    }
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ── Input Panel ── */}
        <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <h2 className="text-base font-semibold text-gray-800">Your notes</h2>
          <hr/>

          <div className="flex gap-2">
            {["summarize", "questions"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab === "summarize" ? "Summarize" : "Generate questions"}
              </button>
            ))}
          </div>

          <textarea
            className="border border-gray-300 rounded-lg p-3 text-sm resize-none h-48
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Paste your study notes here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Button onClick={handleSubmit} loading={isLoading} disabled={isLoading || !text.trim()}>
            {activeTab === "summarize" ? "Summarize" : "Generate questions"}
          </Button>
        </div>

        {/* ── Output Panel ── */}
        <div className="bg-white rounded-xl p-6 shadow-sm gap-4">
          <h2 className="text-base font-semibold text-gray-800 mb-4">AI output</h2>
          <hr/>

          {isLoading && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              Processing...
            </div>
          )}

          {!isLoading && result !== null && (
            <pre className="whitespace-pre-wrap text-sm text-gray-700 leading-relaxed">
              {result}
            </pre>
          )}

          {!isLoading && result === null && (
            <p className="text-gray-400 text-sm pt-3.5">Output will appear here...</p>
          )}
        </div>

        {/* ── History Panel ── */}
        <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-gray-800 mb-4">Recent history</h2>

          {historyLoading ? (
            <p className="text-gray-400 text-sm">Loading history...</p>
          ) : history.length === 0 ? (
            <p className="text-gray-400 text-sm">No history yet. Start by processing some text!</p>
          ) : (
            <div className="flex flex-col gap-3">
              {history.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-200 rounded-lg p-4 flex justify-between items-start gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.type === "summarize"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.type === "summarize" ? "Summary" : "Question"}
                    </span>
                    <p className="text-sm text-gray-500 mt-2 truncate">{item.inputText}</p>
                    <p className="text-sm text-gray-800 mt-1 line-clamp-2">{item.outputText}</p>
                  </div>

                    <Button variant="danger" onClick={() => deleteHistory(item._id)}>Delete</Button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}