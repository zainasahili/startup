import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from "openai";
import { connectToDatabase, getDb } from './database.js';

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

let db;

connectToDatabase()
  .then(async () => {
    db = getDb();
    await db.collection('sessions').deleteMany({});
    app.listen(port, () => console.log('Service running and connected to DB!'));
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });


app.post('/api/register', async(req, res) => {
  const {username, password} = req.body;
  try{
    const existing = await db.collection('users').findOne({username});
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ username, password: hashed, score: 0 });
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err){
    console.error('Registeration error: ', err);
    res.status(500).json({ message: 'Internal server error' });
  }

});

app.post('/api/login', async(req, res) => {
  const {username, password} = req.body;
  try {
    const user = await db.collection('users').findOne({username})
    if (!user || !(await bcrypt.compare(password, user.password))){
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const sessionId = uuidv4(); 
    await db.collection('sessions').insertOne({sessionId, username})
    res.cookie('sessionId', sessionId, {httpOnly: true}); 
    res.json({message: 'Login Successful', username});
  } catch (err){
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/logout', async (req, res) => {
    const {sessionId} = req.cookies;
    try{
      await db.collection('sessions').deleteOne({sessionId});
      res.clearCookie('sessionId');
      res.json({ message: 'Logged out successfully' });
    } catch (err){
      console.error('Logout error:', err);
      res.status(500).json({ message: 'Internal server error' });
  }
   
})

app.get('/api/profile', async (req, res) => {
    const {sessionId} = req.cookies;
    try{
      const session = await db.collection('sessions').findOne({sessionId});
      const username = session?.username;
      if (!username){
        return res.status(401).json({message: 'Unauthorized'})
      }
      res.json({username, message: `Welcome Back ${username}!`});
    } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
})

app.get('/api/scores', async (req, res) => {
    try{
      const users = await db
        .collection('users')
        .find(({}, {projection: {username: 1, score: 1, _id:0}}))
        .sort({ score: -1 })
        .toArray();
      res.join(users);
    } catch (err){
      console.error('Failed to fetch scores:', err);
      res.status(500).json({ message: 'Failed to fetch scores' });
    }
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


app.get('/api/quiz', async (req, res) => {
  try {

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 1.1,
      messages: [
          {
          role: "user",
          content: `Generate a single multiple-choice question about any country in the world. Choose a random different country each time.
            Choose randomly from one of the following topics : traditions, taboos, values, greetings, or languages.
            Respond ONLY in JSON format:
            {
              "question": "...",
              "options": ["A", "B", "C"],
              "correctAnswer": "...",
            }`
          }
        ],
      response_format: { type: 'json_object' },
    });
    
    let content;

    try {
      content = JSON.parse(completion.choices[0].message.content);
    } catch (err) {
      console.error("Invalid JSON from OpenAI:", err);
      content = {
        question: "Failed to generate question",
        options: [],
        correctAnswer: ""
      };
    }

    res.json(content);

  } catch (err) {
    console.error("Quiz generation failed:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.post('/api/quiz/submit', async (req, res) => {
  const { sessionId } = req.cookies;
  const { answer, correctAnswer } = req.body;

  try {
    const isCorrect =
      answer === correctAnswer;

    let response = {
      correct: isCorrect,
      pointsEarned: 0,
      totalScore: null,
      message: isCorrect
        ? 'Correct! Login to earn points'
        : 'Incorrect answer'
    };

    if (sessionId) {
      const session = await db.collection('sessions').findOne({ sessionId });

      if (session) {
        const username = session.username;
        const user = await db.collection('users').findOne({ username });

        if (user && isCorrect) {
          await db.collection('users').updateOne(
            { username },
            { $inc: { score: 5 } }
          );
          const updatedUser = await db.collection('users').findOne({ username });

          response = {
            correct: true,
            pointsEarned: 5,
            totalScore: updatedUser.score,
            message: `Correct! +5 points earned, Your score is ${updatedUser.score}`
          };
        } else if (user && !isCorrect) {
          response.message = 'Try Again!';
          response.totalScore = user.score;
        }
      }
    }

    res.json(response);
  } catch (err) {
    console.error('Quiz submit error:', err);
    res.status(500).json({ message: 'Failed to submit quiz' });
  }
});



