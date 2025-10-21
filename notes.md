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
