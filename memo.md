<role> You are my CTO, expert in web design, backend development, etc. </role> 

<context> I want to create a Duolingo-style gamified-learning app, for topics outside language - in this case, for learning about the Roman Empire. The end-game should have 1) a home/ lecture path intro scene, 2) lecture/ game scenes with the lecture content, 3) error or congrats scenes after failing/ completing a lecture, 4) additional pages such as analytics, settings, leaderboard and login/ create account, 5) transition and animation pages. All powered by 1) a DB with the content, structured by lecture; and 2) a DB with the progress of the user. 

The home/ lecture path page should have 1) a path will all the lectures by order (first ones easy, last ones difficult), ordered by block and then lecture, 2) on the top, a small header with the app name, a day and number of lessons "streak" counter, and a display with number of lives available, 3) on the bottom, a menu with icons/ buttons to access the different extra pages (e.g. settings, analytics, review page). The path should have a "path like" nature, not just blocks in a "SaaS format". The blocks/ lessons information to see there should be succint.

The lectures module should have four different task modes i) question and select the correct answer among 4 options, ii) link two lists, left to right (e.g. matching people with their dates, born place or significant impacts; dates with important events; places or battles with the date, place, or importance), iii) visual matching (e.g. displaying portraits of caesars, and giving three potential options; same for flags, regions, art), iv) text filling (you have a paragraph with something about Roman history with some gaps, and you need to fill the gaps with some options in a dropdown menu). All lectures have a selection of 10 tasks, from either of the three modes. In all these lectures, the page should show i) in the top, the lesson title, task progress bar, lives remaining, current lesson strike, ii) the lesson itself (e.g. question and possible answers), a iii) a save for letter button, iv) a hint button, v) a skip button, vi) on top of the question, a collapsible "theory behind the question" paragraph text, vii) after the answer is correctly given, a "deep dive/ data point" brief paragraph on the response. The lecture module should be interactive with the user response. If a user selects the correct answer, the correct answer should in a nice way turn green, and some sort of succint "congrats" animation should appear. If the user selects an incorrect response, such response should temporarily turn red, before going back to normal. After the lesson is completed or the user finishes it lives, a success (with number of lessons correct, time, summary of lessons) or failure (out of lives, reset lives button) should appear. The site should have a profesional, cool, interactive webpage, with animations

The app should be able to have an internal database of Roman information to power such tasks. The database should be structured at a 1) block (sets of 10 lessons, e.g. beginning of roman period), 2) lesson (sets of 10 questions, e.g. mythology and origins), and 3) task level (individual questions, e.g. what was the name of X god). For each task, the DB should have information about the complexity level, period, mode, and topic; as well as the question, possible responses, right response, hint (a short sentence regarding the correct answer), initial theory text (one paragraph explaining some history regarding the question), post-result theory text (one paragraph explaining some datapoints regarding the correct answer), "save for later" flag. The topics covered by the DB should be 1) geography (e.g. regions, rivers, cities), 2) military/ political events (e.g. battles, new emperors, conflicts, wars, Nero burning the city), 3) people/ generals (e.g. Julius Caesar, artists, Nero), 4) arts (literature, paintings, theater,  statues,  architecture, sports), 5) conquer strategy (e.g. battle strategies by each general), 6) day-to-day culture (events, cuisine, religion), 7) impacts today (e.g. inventions by romans used today, literature impacts today), 8) mythology (e.g. mythological foundations, gods, etc.). Each lecture should have 10 tasks assigned. 

The DB with the user progress should contain info such as 1) current progress, 2) current lives, 3) current streak, 4) history of incorrect responses, 5) analytics of responses (e.g. lessons acomplished, main topics, etc.), and should be updated dynamically </context>

<wayofwork> I use VS Code, in Windows, using Python. Have a conversational tone: if you do not have enough information to proceed with your goal, ask me questions. If asked a "from-scratch" plan, make a progressive development plan: start testing with the basic a hello-world, then build progressively towards an MVP, then build the full script with full features. Such plan should also include 1) file-folder structure, 2) coding stack and logic behind it. If given multiple goals, start with the first ones before moving to the next ones. Be direct, exhaustive and professional and avoid common mistakes. Use coding best practices, such as i) documenting the code with succint explanations, ii) library import checks, iii) try-error and debugging, iv) using the most up-to-date libraries and frameworks, v) modularity and testability, vi) logging, vii) scalability. Be extermely detailed, go step by step. </wayofwork> 

<goal> Your goal is to prepare the PRDs for generating such web and product. For such goal, you should provide: 1) a detailed memo of the product, 2) a detailed memo of the features that such product should have (include additional features that you suggest would be worth adding, be creative and exhasutive), 3) a general overview of libraries, APIs, or general structure on how the end-game code should work. 4) the tech stack that we should use, basing yourself front-end in React Next js 14, Shadcn, Tailwind, 5) the complete file-folder structure, 6) a detailed progressive development plan, explaining the different steps to incrementally build the website (first setup, then front end hello world, then backend hello world, then connecting front-end with backend in a simple way (e.g. with a json hardcoded text), then front end nicer version, then front end csv and API version, then frontend extra functionality in the home and lessons, finally advanced functionality such as settings page, login and auth, DBs, etc. - VERY incremental: it should have like 20-30 steps), 7) the design guidelines, including color palette, font, motto, and all the guidelines a UI team might nead. Start with goal 1, in a super detailed manner. </goal>



# Product Memo: Roman Empire Learning App

## Overview

Our product is a gamified learning application inspired by Duolingo's successful model, but focused on teaching users about the Roman Empire. This innovative app aims to make learning history engaging, interactive, and fun, catering to history enthusiasts, students, and anyone interested in ancient civilizations.

## Core Concept

The app breaks down the vast history and culture of the Roman Empire into digestible, interactive lessons. Users progress through a structured path of increasing difficulty, completing various task types to reinforce their learning. The gamification elements, such as streaks, lives, and leaderboards, encourage consistent engagement and friendly competition.

## Key Features

1. **Structured Learning Path**
   - Lessons organized by historical periods and themes
   - Progressive difficulty from beginner to advanced levels
   - Visual representation of progress on a Roman-themed map or timeline

2. **Diverse Task Types**
   - Multiple-choice questions
   - Matching exercises (e.g., emperors to their achievements)
   - Visual recognition tasks (e.g., identifying artifacts or locations)
   - Fill-in-the-blank exercises with historical texts

3. **Gamification Elements**
   - Lives system to encourage careful learning
   - Daily streaks to promote regular usage
   - Experience points (XP) and level progression
   - Achievements and badges for milestones

4. **Rich Content Database**
   - Comprehensive coverage of Roman history, culture, and legacy
   - Diverse topics including geography, military events, key figures, arts, daily life, and mythology
   - High-quality images of artifacts, locations, and historical figures

5. **Interactive User Interface**
   - Engaging animations for correct and incorrect answers
   - Collapsible theory sections for additional context
   - Hint system for challenging questions

6. **Personalized Learning Experience**
   - Adaptive difficulty based on user performance
   - Review sessions focusing on previously incorrect answers
   - Customizable learning goals and pace

7. **Progress Tracking and Analytics**
   - Detailed statistics on completed lessons, accuracy, and topics mastered
   - Visualizations of learning progress over time
   - Identification of strengths and areas for improvement

8. **Social and Competitive Features**
   - Global and friend leaderboards
   - Option to share achievements on social media
   - Ability to form study groups or compete with friends

9. **Multimedia Content Integration**
   - Short video clips for important historical events
   - Audio pronunciations for Latin terms and names
   - Interactive maps showcasing the expansion of the Roman Empire

10. **Offline Mode**
    - Ability to download lessons for offline learning
    - Sync progress when reconnected to the internet

11. **Accessibility Features**
    - Text-to-speech option for lesson content
    - Colorblind-friendly design options
    - Adjustable text size and contrast

12. **Regular Content Updates**
    - Weekly or monthly addition of new lessons and tasks
    - Special event lessons tied to historical anniversaries

13. **Premium Features**
    - Ad-free experience
    - Exclusive advanced lessons or content
    - Priority access to new features and updates

## Target Audience

1. Students (high school and university level) studying ancient history or classics
2. History enthusiasts and lifelong learners
3. Travelers planning to visit Italy or other regions of the former Roman Empire
4. Educators looking for interactive teaching tools
5. General public interested in gamified learning experiences

## Unique Selling Points

1. First comprehensive gamified learning app focused solely on the Roman Empire
2. Blend of historical accuracy and engaging gameplay
3. Multidisciplinary approach covering various aspects of Roman civilization
4. Adaptive learning system tailoring content to individual user progress
5. Rich visual and interactive elements bringing ancient Rome to life

## Potential Expansion

1. Companion apps for other ancient civilizations (e.g., Ancient Greece, Egypt)
2. Virtual reality (VR) or augmented reality (AR) features for immersive experiences
3. Integration with formal education curriculums
4. Partnerships with museums or historical sites for exclusive content

## Conclusion

The Roman Empire Learning App represents an exciting opportunity to revolutionize how people engage with and learn about ancient history. By combining comprehensive content with engaging gamification elements, we aim to create an addictive yet educational experience that appeals to a wide range of users. This product has the potential to set a new standard in educational apps and foster a greater appreciation for the enduring legacy of the Roman Empire.


# Revised Feature Memo: Roman Empire Learning App

## Core Features

### 1. Home/Lecture Path
- Interactive path representing the learning journey
- Blocks of lessons grouped by historical periods or themes
- Visual indicators of completed, current, and locked lessons
- Difficulty progression (easier lessons at the start, more challenging towards the end)
- Header with app name, streak counter, and lives display
- Bottom menu with icons for additional pages (settings, analytics, review)

### 2. Lecture/Game Module
- Four task modes:
  a. Multiple choice questions
  b. Matching lists (e.g., emperors to achievements, events to dates)
  c. Visual matching (e.g., identifying portraits, artifacts, or locations)
  d. Text filling (completing historical passages)
- 10 tasks per lecture, randomly selected from the available modes
- Header displaying:
  - Lesson title
  - Task progress bar
  - Lives remaining
  - Current lesson streak
- Collapsible "Theory Behind the Question" section
- Hint button
- Skip button
- "Save for Later" functionality
- Interactive feedback (green for correct, red for incorrect answers)
- Brief congratulatory message for correct answers
- "Deep Dive" information snippet after answering correctly

### 3. Success/Failure Scenes
- Success scene:
  - Number of correct answers
  - Time taken
  - Summary of lessons completed
  - XP earned
- Failure scene:
  - "Out of Lives" message
  - Option to reset lives (wait for a set time)
  - Encouraging message to try again

### 4. User Profile and Progress Tracking
- Personal stats dashboard
- Achievements display
- Learning streak calendar
- Simple graphical representation of progress (e.g., pie chart for topic coverage)

### 5. Leaderboard
- Global leaderboard
- Weekly and all-time rankings

### 6. Settings Page
- Account management
- Notification preferences
- Sound and visual preferences
- Privacy controls

### 7. Review System
- Option to review past lessons
- Focus on previously incorrect answers

### 8. Content Database
- Structured at block, lesson, and task levels
- Information categorized by complexity, period, mode, and topic
- Images for visual tasks

### 9. User Progress Database
- Current progress tracking
- Lives and streak counters
- History of incorrect responses
- Basic analytics of user performance

## Additional Features (Within Scope)

### 10. Daily Challenge
- One special question or task per day
- Bonus XP for completing the daily challenge

### 11. Friend System
- Add friends using usernames
- View friends' progress on the learning path

### 12. Offline Mode
- Download a limited number of lessons for offline learning
- Sync progress when reconnected to the internet

### 13. Timed Quizzes
- Optional timed mode for lessons
- Bonus XP for completing lessons quickly and accurately

### 14. Difficulty Settings
- Allow users to adjust the overall difficulty of questions
- Impacts XP gained (higher difficulty = more XP)

These features focus on delivering a solid, educational, and engaging experience for users learning about the Roman Empire, while staying within a realistic scope for development. The combination of structured learning, basic gamification, and interactive elements aims to make history engaging and encourage consistent use of the app.

# Technical Overview: Roman Empire Learning App

## Front-End

### Core Technologies
1. **React**: For building the user interface
2. **Next.js 14**: For server-side rendering, routing, and API routes
3. **Tailwind CSS**: For styling
4. **Shadcn UI**: For pre-built, customizable UI components

### Additional Libraries
1. **React Query**: For efficient data fetching and caching
2. **Zustand**: For global state management
3. **React Hook Form**: For form handling and validation
4. **Framer Motion**: For animations and transitions
5. **Day.js**: For date and time manipulation (for streaks and timers)
6. **Recharts**: For creating progress and analytics charts

## Back-End

### Core Technologies
1. **Node.js**: As the runtime environment
2. **Express.js**: For creating the API server
3. **PostgreSQL**: As the main database for storing user data and content
4. **Prisma**: As the ORM for database operations

### Additional Libraries
1. **bcrypt**: For password hashing
2. **jsonwebtoken**: For authentication
3. **cors**: For handling Cross-Origin Resource Sharing
4. **helmet**: For securing HTTP headers

## APIs and Services

1. **Authentication API**: Custom-built for user registration, login, and session management
2. **Content API**: For fetching lesson content, questions, and answers
3. **Progress API**: For updating and retrieving user progress
4. **Leaderboard API**: For managing and displaying user rankings
5. **Analytics API**: For processing and serving user performance data

## General Structure

### Front-End Structure
```
src/
├── components/
│   ├── layout/
│   ├── lessons/
│   ├── profile/
│   ├── leaderboard/
│   └── common/
├── pages/
│   ├── index.js
│   ├── lessons/
│   ├── profile/
│   ├── leaderboard/
│   └── settings/
├── styles/
├── hooks/
├── utils/
├── context/
└── services/
```

### Back-End Structure
```
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
└── server.js
```

## Key Functionalities

1. **Lesson Path Rendering**:
   - Use Next.js for server-side rendering of the lesson path
   - Implement lazy loading for optimal performance

2. **Lesson Interaction**:
   - Use React state for managing current question and user input
   - Implement React Query for fetching lesson content and submitting answers

3. **Progress Tracking**:
   - Use Zustand for global state management of user progress
   - Implement optimistic updates for a responsive feel

4. **Animations and Transitions**:
   - Use Framer Motion for smooth transitions between questions and feedback animations

5. **Offline Functionality**:
   - Implement service workers for caching lesson content
   - Use IndexedDB for storing user progress locally

6. **Data Synchronization**:
   - Implement a queue system for syncing offline progress when online

7. **Authentication**:
   - Use JWT for secure authentication
   - Implement refresh tokens for prolonged sessions

8. **Leaderboard**:
   - Use server-side rendering for initial load
   - Implement web sockets for real-time updates

9. **Analytics**:
   - Use Recharts for rendering performance graphs
   - Implement data aggregation on the server-side for efficient processing

## Database Schema (High-Level)

1. **Users**: Store user information and authentication details
2. **Lessons**: Store lesson content, questions, and correct answers
3. **UserProgress**: Track user progress, completed lessons, and performance
4. **Leaderboard**: Store user rankings and scores
5. **UserAnalytics**: Store detailed user performance data for analytics

## API Endpoints (Examples)

1. `/api/auth`: Handle user authentication
2. `/api/lessons`: Fetch lesson content and submit answers
3. `/api/progress`: Update and retrieve user progress
4. `/api/leaderboard`: Fetch leaderboard data
5. `/api/analytics`: Fetch user performance data

This technical overview provides a foundation for building the Roman Empire Learning App. It outlines the key technologies, structures, and functionalities needed to implement the features we've discussed. The actual implementation may require adjustments based on specific requirements and challenges encountered during development.


# Technical Overview: Roman Empire Learning App

## Front-End

### Core Technologies
1. **React**: For building the user interface
2. **Next.js 14**: For server-side rendering, routing, and API routes
3. **Tailwind CSS**: For styling
4. **Shadcn UI**: For pre-built, customizable UI components

### Additional Libraries
1. **React Query**: For efficient data fetching and caching
2. **Zustand**: For global state management
3. **React Hook Form**: For form handling and validation
4. **Framer Motion**: For animations and transitions
5. **Day.js**: For date and time manipulation (for streaks and timers)
6. **Recharts**: For creating progress and analytics charts

## Back-End

### Core Technologies
1. **Node.js**: As the runtime environment
2. **Express.js**: For creating the API server
3. **PostgreSQL**: As the main database for storing user data and content
4. **Prisma**: As the ORM for database operations

### Additional Libraries
1. **bcrypt**: For password hashing
2. **jsonwebtoken**: For authentication
3. **cors**: For handling Cross-Origin Resource Sharing
4. **helmet**: For securing HTTP headers

## APIs and Services

1. **Authentication API**: Custom-built for user registration, login, and session management
2. **Content API**: For fetching lesson content, questions, and answers
3. **Progress API**: For updating and retrieving user progress
4. **Leaderboard API**: For managing and displaying user rankings
5. **Analytics API**: For processing and serving user performance data

## General Structure

### Front-End Structure
```
src/
├── components/
│   ├── layout/
│   ├── lessons/
│   ├── profile/
│   ├── leaderboard/
│   └── common/
├── pages/
│   ├── index.js
│   ├── lessons/
│   ├── profile/
│   ├── leaderboard/
│   └── settings/
├── styles/
├── hooks/
├── utils/
├── context/
└── services/
```

### Back-End Structure
```
server/
├── controllers/
├── models/
├── routes/
├── middleware/
├── utils/
├── config/
└── server.js
```

## Key Functionalities

1. **Lesson Path Rendering**:
   - Use Next.js for server-side rendering of the lesson path
   - Implement lazy loading for optimal performance

2. **Lesson Interaction**:
   - Use React state for managing current question and user input
   - Implement React Query for fetching lesson content and submitting answers

3. **Progress Tracking**:
   - Use Zustand for global state management of user progress
   - Implement optimistic updates for a responsive feel

4. **Animations and Transitions**:
   - Use Framer Motion for smooth transitions between questions and feedback animations

5. **Offline Functionality**:
   - Implement service workers for caching lesson content
   - Use IndexedDB for storing user progress locally

6. **Data Synchronization**:
   - Implement a queue system for syncing offline progress when online

7. **Authentication**:
   - Use JWT for secure authentication
   - Implement refresh tokens for prolonged sessions

8. **Leaderboard**:
   - Use server-side rendering for initial load
   - Implement web sockets for real-time updates

9. **Analytics**:
   - Use Recharts for rendering performance graphs
   - Implement data aggregation on the server-side for efficient processing

## Database Schema (High-Level)

1. **Users**: Store user information and authentication details
2. **Lessons**: Store lesson content, questions, and correct answers
3. **UserProgress**: Track user progress, completed lessons, and performance
4. **Leaderboard**: Store user rankings and scores
5. **UserAnalytics**: Store detailed user performance data for analytics

## API Endpoints (Examples)

1. `/api/auth`: Handle user authentication
2. `/api/lessons`: Fetch lesson content and submit answers
3. `/api/progress`: Update and retrieve user progress
4. `/api/leaderboard`: Fetch leaderboard data
5. `/api/analytics`: Fetch user performance data

This technical overview provides a foundation for building the Roman Empire Learning App. It outlines the key technologies, structures, and functionalities needed to implement the features we've discussed. The actual implementation may require adjustments based on specific requirements and challenges encountered during development.

# Progressive Development Plan: Roman Empire Learning App

## Phase 1: MVP Setup and Core Functionality

1. **Project Initialization**
   - Set up Next.js project with TypeScript
   - Initialize Git repository
   - Set up ESLint and Prettier

2. **Basic Styling Setup**
   - Install and configure Tailwind CSS
   - Create basic color scheme and typography styles

3. **Home Page and Navigation**
   - Create a simple home page with app title and description
   - Implement basic navigation menu

4. **Lesson Path Page**
   - Create a static lesson path layout
   - Implement basic lesson blocks without interactivity

5. **Basic Lesson Module**
   - Create a simple lesson page with static content
   - Implement a basic multiple-choice question component

6. **State Management Setup**
   - Set up Zustand for basic state management
   - Implement simple state for lesson progress

7. **Basic Backend Setup**
   - Initialize Express.js server
   - Set up a simple API endpoint for fetching lesson data

8. **Database Setup**
   - Set up PostgreSQL database
   - Create basic schema for lessons and questions

9. **Lesson Data Integration**
   - Connect frontend to backend for fetching lesson data
   - Display dynamic lesson content from the database

10. **Basic User Interaction**
    - Implement answer submission for multiple-choice questions
    - Add basic feedback for correct/incorrect answers

## Phase 2: Enhanced Learning Experience

11. **Implement Additional Question Types**
    - Add matching lists component
    - Create visual matching component
    - Develop text filling component

12. **Lesson Flow**
    - Implement progression through multiple questions in a lesson
    - Add a lesson completion screen

13. **User Progress Tracking**
    - Create a basic user model in the database
    - Implement progress saving after each completed lesson

14. **Lesson Path Interactivity**
    - Make lesson blocks on the path page interactive
    - Show locked/unlocked status based on user progress

15. **Basic Profile Page**
    - Create a simple profile page showing completed lessons
    - Display basic stats (e.g., number of completed lessons)

## Phase 3: Gamification Elements

16. **Implement Lives System**
    - Add lives counter to lesson module
    - Implement logic for decrementing lives on incorrect answers

17. **Streak Counter**
    - Add streak counting functionality
    - Display current streak on lesson pages

18. **XP and Leveling System**
    - Implement XP rewards for completed lessons
    - Create a basic leveling system based on XP

19. **Basic Leaderboard**
    - Create a simple leaderboard page
    - Implement backend logic for calculating user rankings

## Phase 4: Enhanced User Experience

20. **Improved Animations and Transitions**
    - Add Framer Motion for smoother transitions between questions
    - Implement animations for correct/incorrect answer feedback

21. **Hint System**
    - Add hint functionality to questions
    - Implement backend logic for storing and serving hints

22. **"Theory Behind the Question" Feature**
    - Add collapsible section for additional information
    - Integrate theory content with lesson data

23. **"Deep Dive" Information**
    - Implement post-answer additional information display
    - Add backend support for storing and serving deep dive content

## Phase 5: Polish and Optimization

24. **Responsive Design**
    - Ensure all pages and components are fully responsive
    - Optimize layout for various screen sizes

25. **Performance Optimization**
    - Implement lazy loading for lesson content
    - Optimize API calls and state management

26. **Error Handling and Loading States**
    - Add proper error handling throughout the application
    - Implement loading states for asynchronous operations

27. **Basic SEO Optimization**
    - Add meta tags and optimize for search engines
    - Implement dynamic page titles and descriptions

28. **Testing**
    - Write unit tests for critical components and functions
    - Implement basic integration tests for core user flows

This development plan focuses on building the core functionality of the Roman Empire Learning App in a progressive manner. It starts with the essential features needed for an MVP and gradually adds more complex functionality. Advanced features like authentication, dark mode, and production-level Docker setup are intentionally left out of this initial plan, as they would be part of a later, more production-focused phase.


# Design Guidelines: Roman Empire Learning App

## Brand Identity

### Motto
"Uncover the Glory of Rome, One Lesson at a Time"

### Brand Personality
- Educational yet engaging
- Authoritative but accessible
- Classical with a modern twist

## Color Palette

### Primary Colors
- Imperial Purple: #4A0E4E
  - Symbolizes Roman nobility and power
- Roman Gold: #FFD700
  - Represents the wealth and grandeur of the empire

### Secondary Colors
- Marble White: #F4F4F4
  - Evokes the clean, classic look of Roman architecture
- Terracotta: #E27D60
  - Reminiscent of Roman pottery and tiles

### Accent Colors
- Laurel Green: #7CAA2D
  - Symbolizes victory and achievement
- Sky Blue: #5DADE2
  - Represents the vast reach of the Roman Empire

### Functional Colors
- Success Green: #2ECC71
- Error Red: #E74C3C
- Warning Yellow: #F1C40F

## Typography

### Primary Font
- Font Name: "Trajan Pro"
  - A serif font inspired by Roman square capitals
  - Use for headings and important text elements

### Secondary Font
- Font Name: "Open Sans"
  - A clean, modern sans-serif font
  - Use for body text and UI elements

### Hierarchy
- H1: Trajan Pro, 32px, Imperial Purple
- H2: Trajan Pro, 24px, Imperial Purple
- H3: Trajan Pro, 20px, Roman Gold
- Body: Open Sans, 16px, Dark Gray (#333333)
- Small Text: Open Sans, 14px, Medium Gray (#666666)

## Iconography

- Style: Outline icons with 2px stroke
- Color: Primarily Roman Gold, with variations in Imperial Purple or Marble White depending on background
- Key Icons:
  - Laurel Wreath: Represents achievements and levels
  - Gladius (Roman Sword): Indicates challenges or quizzes
  - Scroll: Denotes lessons or information
  - Colosseum: Home or main menu icon

## UI Elements

### Buttons
- Primary: Roman Gold background, Imperial Purple text
- Secondary: Imperial Purple background, Marble White text
- Disabled: Light Gray background, Medium Gray text
- Hover Effect: Slight darkening of button color

### Input Fields
- Border: 1px solid Roman Gold
- Focus State: 2px solid Imperial Purple, with a subtle glow effect

### Cards
- Background: Marble White
- Border: Thin line in Roman Gold or Terracotta
- Shadow: Subtle drop shadow for depth

### Progress Bars
- Background: Light Gray (#E0E0E0)
- Fill: Gradient from Roman Gold to Imperial Purple

## Layout Principles

- Use a grid system based on 12 columns for responsive design
- Maintain ample white space for a clean, uncluttered look
- Use asymmetrical balance to create visual interest
- Implement a visual hierarchy that guides users through the content

## Imagery

- Style: Mix of realistic historical imagery and stylized illustrations
- Historical Accuracy: Ensure all imagery is historically accurate and vetted
- Diversity: Represent the diversity of the Roman Empire in character illustrations
- Background Textures: Subtle patterns inspired by Roman mosaics or frescoes

## Animations and Transitions

- Keep animations subtle and purposeful
- Use transitions to smoothly guide users between states
- Implement micro-interactions to enhance user engagement (e.g., subtle animation when completing a lesson)

## Accessibility

- Ensure color contrast ratios meet WCAG 2.1 AA standards
- Provide text alternatives for all images and icons
- Design with keyboard navigation in mind
- Use clear, descriptive labels for all interactive elements

## Responsive Design

- Design for mobile-first, then scale up to tablet and desktop
- Use flexible grids and images
- Adjust typography and spacing for different screen sizes
- Ensure touch targets are at least 44x44 pixels on mobile devices

## App-Specific Elements

- Lesson Path: Design as a winding road through Roman landscapes
- Question Screens: Clean layout with focus on the question and answer options
- Leaderboard: Design reminiscent of Roman military rankings
- Profile Page: Styled like a Roman citizen's personal record or "tabula"

These design guidelines provide a comprehensive framework for creating a visually cohesive and engaging user interface for the Roman Empire Learning App. They blend classical Roman aesthetics with modern design principles to create an app that is both educational and visually appealing. The UI team should use these guidelines as a foundation, while also allowing for creative interpretation and refinement as the app develops.
