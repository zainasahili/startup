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
    res.json({message: 'Logged Out'})
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

app.get('/api/info/:name', async(req, res) => {
    const {name} = req.params;
    try {
        const prompt = `
        Give me a JSON object describing key cultural information about this country ${name}.
      Include fields:
      - Main languages
      - common greetings
      - core values
      - important traditions
      - cultural taboos
      - 2 key historical facts
      Keep the answer concise and accurate.
      `;

      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{role: "user", content: prompt}],
        response_format: {type: "json_object"}, 
      })

      const data = JSON.parse(completion.choices[0].message.content);
      res.json(data);
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch data from ChatGPT" });
    }
});

app.listen(port, () => console.log('Service running!'))