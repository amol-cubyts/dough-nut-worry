import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv"
import morgan from "morgan";
import { Configuration, OpenAIApi } from "openai";
import openAiRoutes from "./routes/openai.js";

/* CONFIGURATIONS */
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
// app.use(bodyParser.json({ limit: "30mb", extended: true}));
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

/* OPEN AI CONFIGURATION */
const configuration = new Configuration({
    organization: "org-ohUkdifjxF9kT0el5eg1kndh",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

console.log(response)



/* ROUTES */
app.use('/openai', openAiRoutes);

app.post('/', (req, res) => {
    console.log("inside endpoint")
    res.send('POST request to the homepage')
  })

/* SERVER SETUP */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
});
