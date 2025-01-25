const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const OpenAI = require("openai");
require('dotenv').config();

//set app running on port 8000             REMEMBER FRONTEND IS ON 3000
const app = express();
const port = process.env.PORT || 8000;

const openai = new OpenAI({
  baseURL: "https://api.omnistack.sh/openai/v1", 
  apiKey: "REPLACE ME",  
});

async function getOpenAICompletion() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "What's in this image?"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
                    },
                },
            ],
        }
    ],
      model: "expressInk4omini",
    });

    console.log("OpenAI response:", completion.choices[0].message.content);
  } catch (error) {
    console.error("Error while calling OpenAI API:", error);
  }
}

// Call OpenAI API when the server starts
getOpenAICompletion();




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });