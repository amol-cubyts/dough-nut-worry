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
app.use(express.json())

// for parsing application/x-www-form-urlencoded
app.use(
  express.urlencoded({
    extended: true,
  })
)

// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// /* OPEN AI CONFIGURATION */
const configuration = new Configuration({
  organization: "org-ohUkdifjxF9kT0el5eg1kndh",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

// console.log(response)

const getThePrompt = ({
  isNonVeg = true,
  ingredients = [],
  cuisine = "Indian",
  occasion = "lunch",
  excludedDishes = [],
}) => {
    console.log('ingredients.length ??? ', ingredients)
  return `list of 10 ${
    isNonVeg ? "non" : ""
  } vegetarian ${cuisine} meal for ${occasion}  ${
    ingredients.length > 0 ? `that can use ingredients "${ingredients.join('", "')}"` : ""
  }.${
    excludedDishes.length > 0 ? ` Exclude "${excludedDishes.join('", "')}" from suggestion` : ""
  }`;
};

app.post("/openai/text", async (req, res) => {
  try {
    //   try {
    const apiKey = process.env.OPENAI_API_KEY; // Replace with your OpenAI API key

    console.log('req ???????', req)
    const prompt = getThePrompt(req.body); // Modify the prompt as needed

    const apiUrl =
      "https://api.openai.com/v1/engines/text-davinci-003/completions";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };

    const data = {
      prompt: prompt,
      max_tokens: 4000, // Adjust as needed
    };
    axios
      .post(apiUrl, data, { headers })
      .then((response) => {
        console.log(response.data);
        const choicesText = response.data.choices[0].text.trim();
        const choicesArray = choicesText
          .split("\n")
          .filter((item) => item.trim() !== "");

        // Create an array of choices in JSON format
        const choicesJSON = choicesArray.map((choice, index) => {
          return {
            id: index + 1,
            name: choice.trim(),
          };
        });
        res.status(200).json({
        //   data: response && response.data ? response.data : [],
        data: choicesJSON,
        prompt,
        });
      })
      .catch((error) => {
        console.error("Error:", error.message);
        res.status(500).json({ error });
      });

    // res.status(200).json({
    //   // data: response && response.data ? response.data : [],
    // //   data: prompt,
    //   data: choicesJSON,
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
