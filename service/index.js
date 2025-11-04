import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from "openai"

dotenv.config();
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const app = express();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, 
})

app.use(express.static('public'));
app.use(cors())
app.use(express.json())
app.use(cookieParser())

// Mock Database
const users = {}
const sessions = {}
const scores = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 72 },
  { name: 'Carla', score: 90 },
];

app.post('/api/register', async(req, res) => {
    const {username, password} = req.body;
    if (users[username]) {
    return res.status(400).json({ message: 'Username already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    users[username] = { username, password: hashed };
    res.status(201).json({ message: 'Registered successfully' });

});

app.post('/api/login', async(req, res) => {
    const {username, password} = req.body;
    const user = users[username]
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    const sessionId = uuidv4();
    sessions[sessionId] = username;
    res.cookie('sessionId', sessionId, {httpOnly: true});
    res.json({message: 'Login Successful', username});
});

app.post('/api/logout', (req, res) => {
    const {sessionId} = req.cookies;
    delete sessions[sessionId];
    res.clearCookie('sessionId');
})

app.get('/api/profile', (req, res) => {
    const {sessionId} = req.cookies;
    const username = sessions[sessionId];
    if (!username){
        return res.status(401).json({message: 'Unauthorized'})
    }
    res.json({username, message: `Welcome Back ${username}!`});
})

app.get('/api/scores', (req, res) => {
    res.json(scores.sort((a, b) => b.score - a.score));
});

app.get('/api/info/:name', async (req, res) => {
  const { name } = req.params;

  async function fetchCountryInfo(country) {
    const prompt = `
    Give me a JSON object describing *key cultural information* about the country "${country}".
    Use this exact format (no nesting or extra keys):
    {
      "Official languages of the country": [...],
      "most known greetings": [...],
      "core cultural values": [...],
      "traditions": [...],
      "taboos": [...],
      "key short history facts": [...]
    }
    Each field must have only 2 meaningful entries. Keep it short and factual.
    Avoid saying "N/A" — if unsure, make your best factual guess.
    `;

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(completion.choices[0].message.content);

      const data = {
        languages: result["Official languages of the country"] || [],
        greetings: result["most known greetings"] || [],
        values: result["core cultural values"] || [],
        traditions: result["traditions"] || [],
        taboos: result["taboos"] || [],
        history: result["key short history facts"] || [],
      };


      return data;

    } catch (err) {
      console.error('OpenAI fetch failed:', err);
      return null;
    }
  };

  try {
    let attempts = 0;
    let data = null;

    while (attempts < 3) {
      data = await fetchCountryInfo(name);
      if (
        data &&
        Object.values(data).some(
          (v) =>
            v &&
            v.length > 0 &&
            !v.some((item) =>
              typeof item === 'string' ? item.toUpperCase().includes('N/A') : false
            )
        )
      ) {
        break;
      }
      attempts++;
      console.log(`Retrying OpenAI fetch... (Attempt ${attempts})`);
    }

    if (!data) {
        return res.status(500).json({ message: 'Could not fetch valid country info.' });
    }

    res.json(data);

    return res;

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch data from ChatGPT' });
  }
});

app.post('/api/quiz', async (req, res) => {

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a quiz generator. Return a single multiple-choice question with 3 options and the correct answer."
          },
          {
            role: "user",
            content: `Generate one quiz question about a random country from one of the following categories (Official languages of the country, most known greetings,
            core cultural values, traditions, taboos, key short history facts) in JSON format: {question, options: [a,b,c], correctAnswer}`
          }
        ],
      }),
    });

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.listen(port, () => console.log('Service running!'))