const Groq = require("groq-sdk");
const History = require("../models/History");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });


const summarizeText = async (req, res) => {
  const {text} = req.body;
  
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // llama-3.3-70b-versatile
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: "You are a helpful study assistant. Be clear and concise.",
        },
        {
          role: "user",
          content: `Summarize the following text clearly and concisely in bullet points:\n\n${text}`,
        },
      ],
    });
    const result = response.choices[0].message.content;

    // save to db for history
    await History.create({
      userId: req.user._id,
      type: "summarize",
      inputText: text,
      outputText: result,
    });

    return res.status(200).json({text: result});
    console.log("AI Response: ", result);
  } catch (err) {
    console.error("Groq summarize error:", err.message);
    return res.status(500).json({ message: "Failed to summarize text" });
  }
};

const generateQuestions = async (req, res) => {
  const {text} = req.body;
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: "You are a helpful study assistant. Be clear and concise.",
        },
        {
          role: "user",
          content: `Generate 5 thoughtful study questions based on this text. Number them 1-5:\n\n${text}`,
        },
      ],
    });

    
    const result = response.choices[0].message.content;

    await History.create({
      userId: req.user._id,
      type: "questions",
      inputText: text,
      outputText: result,
    });

    return res.status(200).json({ text: result });
  } catch (err) {
    console.error("Groq questions error:", err.message);
     return res.status(500).json({ message: "Failed to generate questions" });
  }
};

module.exports = { summarizeText, generateQuestions };