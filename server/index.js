import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";

import openAiRoutes from "./routes/openai.js";
import axios from "axios";

/* CONFIGURATIONS */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// /* OPEN AI CONFIGURATION */
const configuration = new Configuration({
  organization: "org-ohUkdifjxF9kT0el5eg1kndh",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// console.log(response)

app.get("/openai/text", async (req, res) => {
  try {
    const { text } = req.body;
    //   try {
    const apiKey = process.env.OPENAI_API_KEY; // Replace with your OpenAI API key

    const prompt = 'list of non vegetarian Indian meal for dinner that can use ingredients "aloo", "methi", "tomato" and can me cooked in 15 mins. Exclude "Veggie Stir-Fry", "Jeera Rice with Dal" from suggestion'; // Modify the prompt as needed

    const apiUrl =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      prompt: prompt,
      max_tokens: 50, // Adjust as needed
    };

    axios
      .post(apiUrl, data, { headers })
      .then((response) => {
        console.log(response.data);
        res.status(200).json({ data: response && response.data ? response.data : [] });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        res.status(500).json({ error });
      });
    //    working
    //
    //     const data = await axios.post(
    //   `https://api.openai.com/v1/chat/completions`,
    //   {
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "user",
    //         content: 'list of non vegetarian Indian meal for dinner that can use ingredients "aloo", "methi", "tomato" and can me cooked in 15 mins. Exclude "Veggie Stir-Fry", "Jeera Rice with Dal" from suggestion',
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
    // console.log('@@@@@@@@@@@@@@@@@@@@@@response >>> ', data)
    //       res.status(200).json({ data: data && data.data ? data.data : [] });
    //   } catch (error) {
    //       console.log("first request error : ", error);
    //       res.status(500).json({ error });
    //   }

    //   Working end

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

/* ROUTES */
// app.use('/openai', openAiRoutes);

app.post("/", (req, res) => {
  console.log("inside endpoint");
  res.send("POST request to the homepage");
});

/* SERVER SETUP */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
