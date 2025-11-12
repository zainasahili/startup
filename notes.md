# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS

My IP address is: 54.147.116.174

## Caddy

No problems worked just like it said in the [instruction](https://github.com/webprogramming260/.github/blob/main/profile/webServers/https/https.md).

## HTML

I just finished the HTML excercise, and here are some useful functions to remember:

for links: <a><href></a><href>
for images: <img src = >
for tables: <table><tr><th></th></tr></table>

Created 6 pages.
Linked my GitHub Repo
Placeholders added for:
- Interactive SVG map
- Quiz engine
- Database table / saved scores
- WebSocket realtime feed
- Authentication (register/login forms)


## CSS

- Created a "styles.css" and linked it to all HTML pages
- Styled the **header, footer, and navigation** with a gradient background and responsive layout.  
- Styled **main sections** (APIs, Database Data, WebSocket data, etc.) with card backgrounds and shadows.  
- Added **table styling** so database placeholder looks clean.  
- Styled **forms and buttons** with consistent padding and colors.  
- Ensured **images** resize properly and have rounded corners.  
- Added a **responsive design rule**: when the screen is smaller than 768px, the navigation and header stack vertically.  


## React Part 1: Routing

- Learned how to convert static HTML/CSS into reusable React components.
- Practiced React Router setup.
- Used Bootstrap for layout and responsive design for Simon.
- Deployed app using deployReact.sh.

## React Part 2: Reactivity

- Built multiple React components (Home, Login, Map, Quiz, Scoreboard) and connected them with React Router for navigation.
- Used useState to manage component data and useEffect to handle initialization logic (e.g., loading from localStorage).
- Mocked API responses by returning hardcoded JSON objects that simulate real data.
- Implemented localStorage to act as a mock database for saving usernames and quiz scores.
- Created a mock WebSocket setup plan to simulate future live score updates.
- Added an interactive map using react-simple-maps with hover and click events for user feedback.
- Built a scoreboard component that updates dynamically and sorts player scores.
- Designed a mock quiz section with question placeholders and simple scoring logic.


## Service

- learned how to connect a React frontend with an Express backend using API routes to fetch and display dynamic data.
- implemented user registration and login functionality using localStorage, understanding how data persistence and user sessions work.
- learned how to use OpenAI to generate quiz questions dynamically based on country topics.
- gained experience managing app states like loading, error, and success using React hooks (`useState`, `useEffect`).

## DB
- Added MongoDB database integration for user registration, login, and score tracking.
- Created database.js and dbConfig.json files to manage and securely connect to the MongoDB.
- Updated server (index.js) to initialize the database connection on startup and handle user authentication routes.
- Implemented quiz scoring logic. Users now earn points for each correct quiz answer, which are saved in the database.
- Configured environment variables for database connection and API keys to ensure secure deployment.
- Improved frontend quiz handling to check if a user is logged in before updating their score.



