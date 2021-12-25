import express from "express";
import dialogflow from "dialogflow";
import bot from "../config/dev.js";
import { TOTAL_PRODUCT } from "../constants/botConstants.js";
import Product from "../models/productModel.js";
const projectId = bot.googleProjectID;
const sessionId = bot.dialogFlowSessionID;
const languageCode = bot.dialogFlowSessionLanguageCode;
const dialogflowRouter = express.Router();
// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

dialogflowRouter.post("/text", async (req, res) => {
  // A unique identifier for the given session

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: req.body.text,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");

  const result = responses[0].queryResult;
  const event =
    result.fulfillmentMessages[0].payload?.fields?.payload?.stringValue;
  if (event) {
    switch (event) {
      case TOTAL_PRODUCT:
        const product = await Product.find({
          userCreate: "a",
        });
        if (product) {
          const caculated = {
            fulfillmentText:product.length.toString()
          }
          return res.send(caculated);
        }else{
          return res.send('cc')
        }
    }
  }
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  res.send(result);
});

// Event
dialogflowRouter.post("/event", async (req, res) => {
  // A unique identifier for the given session

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        name: req.body.event,
        // The language used by the client (en-US)
        languageCode: languageCode,
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");

  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  res.send(result);
});

export default dialogflowRouter;
