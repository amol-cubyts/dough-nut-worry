import express, { response } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

router.get("/text", async (req, res) => {
  try {
    const { text } = req.body;
    try {
         response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: text,
            temperature: 0.5,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });
        res.status(200).json({ data });
    } catch (error) {
        console.log("first request error : ", error);
    }

    // const data = await axios.post(
    //   `https://api.openai.com/v1/chat/completions`,
    //   {
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "user",
    //         content: "Hello!",
    //       },
    //     ],
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //     },
    //   }
    // );
    // const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
    //   prompt: text,
    //   max_tokens: 50, // Adjust as needed
    // }, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //   }
    // });

    // res.status(200).json({ data });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
