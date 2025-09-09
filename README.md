# CultureConnect 🌍


## 🚀 Specification Deliverable

### Elevator pitch

CultureConnect is an interactive platform that helps users learn and test their cultural knowledge. Imagine Dulingo, but for culture: instead of just langauges, users learn the different greetings, values, traditions, taboos, and key historical facts. Information is gathered from trusted online sites, with user ability to suggest edits that would be reviewed by team before updating. Users can quiz themselves after learning about any country and then compare their scores with that of other users.

### Design

![map image](images/map.png)
![quiz image](images/quiz.png)
![scoreboard image](images/scoreboard.png)


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

- [ ] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **HTML pages** - I did not complete this part of the deliverable.
- [ ] **Proper HTML element usage** - I did not complete this part of the deliverable.
- [ ] **Links** - I did not complete this part of the deliverable.
- [ ] **Text** - I did not complete this part of the deliverable.
- [ ] **3rd party API placeholder** - I did not complete this part of the deliverable.
- [ ] **Images** - I did not complete this part of the deliverable.
- [ ] **Login placeholder** - I did not complete this part of the deliverable.
- [ ] **DB data placeholder** - I did not complete this part of the deliverable.
- [ ] **WebSocket placeholder** - I did not complete this part of the deliverable.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Header, footer, and main content body** - I did not complete this part of the deliverable.
- [ ] **Navigation elements** - I did not complete this part of the deliverable.
- [ ] **Responsive to window resizing** - I did not complete this part of the deliverable.
- [ ] **Application elements** - I did not complete this part of the deliverable.
- [ ] **Application text content** - I did not complete this part of the deliverable.
- [ ] **Application images** - I did not complete this part of the deliverable.

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Bundled using Vite** - I did not complete this part of the deliverable.
- [ ] **Components** - I did not complete this part of the deliverable.
- [ ] **Router** - I did not complete this part of the deliverable.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **All functionality implemented or mocked out** - I did not complete this part of the deliverable.
- [ ] **Hooks** - I did not complete this part of the deliverable.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
