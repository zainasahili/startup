import express from 'express';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const port = process.argv.length > 2 ? process.argv[2] : 4000;
const app = express();

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
