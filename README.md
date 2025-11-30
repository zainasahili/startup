# CultureConnect 🌍


## 🚀 Specification Deliverable

### Elevator pitch

CultureConnect is an interactive platform that helps users learn and test their cultural knowledge. Imagine Dulingo, but for culture: instead of just langauges, users learn the different greetings, values, traditions, taboos, and key historical facts. Information is gathered from trusted online sites, with user ability to suggest edits that would be reviewed by team before updating. Users can quiz themselves after learning about any country and then compare their scores with that of other users.

### Design

![map image](images/map.png)
<br>
<br>
![quiz image](images/quiz.png)
<br>
<br>
![scoreboard image](images/scoreboard.png)
<br>
<br>
<br>

```mermaid
sequenceDiagram
  actor U as Player A
  participant F as Frontend (A)
  participant S as API
  participant WS as WebSocket
  participant F2 as Frontend (Others)

  U->>F: Submit final quiz
  F->>S: POST /quiz/submit {score}
  S->>WS: publish {user, score}
  WS-->>F: push {you placed RANK}
  WS-->>F2: push {A scored X in Country Y}
```

### Key features

- Interactive World Map: Click on a country to learn about it
- Dynamic data: pull real cultulral information through third party APIs
- Authorization: User can register and login to save progress.
- Scoreboard: comparing score with other users through real time updates using websocket.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Structured layout for the site: map page, register/login, quizzez page, scoreboard
- **CSS** - responsive design to work on laptops and phones, matching colors, consistent branding
- **React** - Provides login, interactive map, answer choosing, comparing and showing others scores
- **Service** - Backend endpoints include: register/ login/ fetch data for country/ save quiz score/ pulling scores
- **DB/Login** - store users, quiz scores, user ranks, cultural data
- **WebSocket** - real time scoreboard updates

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** 
- [x] **Proper HTML element usage**
- [x] **Links**
- [x] **Text**
- [x] **3rd party API placeholder** 
- [x] **Images**
- [x] **Login placeholder**
- [x] **DB data placeholder**
- [x] **WebSocket placeholder** 

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** 
- [x] **Navigation elements** 
- [x] **Responsive to window resizing**
- [x] **Application elements**
- [x] **Application text content**
- [x] **Application images**

- Created a "styles.css" and linked it to all HTML pages
- Styled the **header, footer, and navigation** with a gradient background and responsive layout.  
- Styled **main sections** (APIs, Database Data, WebSocket data, etc.) with card backgrounds and shadows.  
- Added **table styling** so database placeholder looks clean.  
- Styled **forms and buttons** with consistent padding and colors.  
- Ensured **images** resize properly and have rounded corners.  
- Added a **responsive design rule**: when the screen is smaller than 768px, the navigation and header stack vertically.  

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** 
- [x] **Components**
- [x] **Router** 

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** 
- [x] **Hooks** 

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Node.js/Express HTTP service** 
- [x] **Static middleware for frontend** 
- [x] **Calls to third party endpoints** 
- [x] **Backend service endpoints** 
- [x] **Frontend calls service endpoints**
- [x] **Supports registration, login, logout, and restricted endpoint** 


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [x] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

- Added MongoDB database integration for user registration, login, and score tracking.
- Created database.js and dbConfig.json files to manage and securely connect to the MongoDB.
- Updated server (index.js) to initialize the database connection on startup and handle user authentication routes.
- Implemented quiz scoring logic. Users now earn points for each correct quiz answer, which are saved in the database.
- Configured environment variables for database connection and API keys to ensure secure deployment.
- Improved frontend quiz handling to check if a user is logged in before updating their score.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [x] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [x] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [x] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [x] **Application is fully functional** - I did not complete this part of the deliverable.

- Integrated WebSocket server into the Node.js backend to enable realtime communication between clients.
- Implemented server side logic to broadcast quiz submissions and scores to all connected users.
- Updated the frontend to establish a WebSocket connection and listen for live quiz notifications.
- Learned how to manage multiple concurrent connections and ensure all users receive updates immediately.