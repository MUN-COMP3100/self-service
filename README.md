# Student Self Service

- Mohammed Balfaqih 202051926
- Ripudaman Singh 202054565

Submission: Saturday, 14 April, 2023

## Submission 3:

We implemented 8 core frontend/client side features. We made 5 pages to contain all of the features.

## Project Video

https://www.youtube.com/watch?v=jmOUzrdpF6I (unlisted)

We have implemented more features than we show in the video due to video length constraint, such as:

- `View Schedule` modal for each course
- The hamburger menu (three horizontal lines) can open or close
- Validation while creating accounts

## Features:

1. Statistics
   - In the Home Page student can see how many registered and favorited courses there are
2. View Courses
   - Student can see all offered courses
   - Student can filter courses by subject
3. Register Course
   - Students can register courses from /courses page
   - If student is already registered to the course, we show an error message
   - If student has an already registered course with a schedule conflict, we show an error message saying which courses conflict
   - Student can see the schedules of the course in a modal
4. Bulk Register Course
   - This will help the student if they already have all the CRNs of the courses they want to register for
   - Student will put all the CRNs for courses and it will register all of them to the current student
   - It will show an error in case there are any schedule conflicts,or if registering same course again
5. Login/Logout
   - A login page where it will authenticate the user to access dashboard
   - Selfservice routes are middleware protected, only logged in users can see them and interact with them
   - Login page is also route protected, only not logged in users can see them
   - Login will add a cookie with session id
   - Before every api call, we have access to the user who did the call using middlewares
   - In client side you can click on the logout buton top right corner
   - We are handling passwords in a secure manner using bcrypt and using sessions
6. Register User
   - Students can register themselves to selfservice by creating an account
   - Usernames are unique, so if they choose one that is already taken, we display an error message
   - We are also performing basic email validation, to ensure that the right elements are present
7. View Registered/Favorite Courses and Drop them
   - In the home page, students can view their registered courses
   - Courses added to favorites are also present here
   - There is a remove button which will drop the course for the student
   - Similar functionality exists for the favorite courses
8. Favorite Course
   - Students can put a course as a favorite so they can watch them
   - They can favorite the course using the star in Courses page
   - This is for an unimplemented feature where students will get push notification/email if the course opens up or there is an empty seat.

### All features are functioning and considered complete, excpet push notifications for favortie courses

## Pages

- Login Page (only guests): /login
- Register Page (only guests): /register
- Home Page (auth required): /
- Courses Page (auth required): /courses
- Bulk Register (auth required): /bulk

### We are using a router to separate and simplify things. All interal routes can be found in `/routes`

## Tech Stack

- Server Side:
  - ExpressJs
  - MongoDB
- Client Side:
  - Ejs: make it easy to serve HTML with server side rendering
  - Tailwindcss: Instead of having premade components like Bootstrap, we decided to go for this one because it provided css utilities to make the design look the way we want, giving us more control over the design
  - Javascript: We went with vanilla javascript instead of JQuery.

## Setup Instructions

- We are using `localhost:3000` as local URL
- To setup, after you clone, run this to install all dependencies

```bash
npm install
```

- We used 127.0.0.1:27017 for host and port of database
- selfservice for database
- so connection URI is setup as

```
mongodb://127.0.0.1:27017/selfservice
```

## Seeding Courses ( Important )

### Before running these, please ensure you are starting from a fresh database and drop as required

- After installing dependencies, you will need to seed database with courses data
- To do that run

```
npm run seed
```

- This will put all courses data in selfservice database in `Course` collection

## Seeding a Default User ( Optional )

- If you want a default user to be made for testing, run

```
npm run seed:users
```

Creates a student account with:

- username: user
- password: user123

These can be changed in `/seeders/user.seed.mjs`

## Running The App

- After making sure that you installed dependencies and seeded database with data run the following command:

```bash
npm run start
```

or

```bash
node app.mjs
```

## Testing

### Ensure the server is running before running the tests

### Testing Instructions for Backend

- We are testing the CRUD operation for courses
- Testing for students and auth are together because they are relevant
- We tested if login is successful by logging in and then calling a protected route `/api/auth/me` which returns logged in user data
- we are testing creating new account with a random username
- then create it again with same username to expect a unique error
- to run the test run

```bash
npm run test
```

## Testing Instruction for Frontend

- Open the website in http://localhost:3000
- You should be redirected to /login page since all routes are protected
- Create a user in /register page, or use the default user provided by using the seeder, then login

## Attributions

- Ripudaman Singh's code from Assignment One was modified to check for conflicts and for parsing the course data
- Mohammed Balfaqih's code from other projects for directory structure and error handlers
