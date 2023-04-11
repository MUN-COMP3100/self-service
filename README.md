# Student Self Service

- Mohammed Balfaqih 202051926
- Ripudaman Singh 202054565

Submission: Saturday, 13 March, 2023

# Submission 3:

We implemented 7 core frontend/client side features. We made 5 pages to contain all of the features.

# Features:
1. Statistics
   - In the Home Page student can see how many registered and favorite courses there are
2. View Courses
   - Student can see all offered courses
   - Student can filter course by subject
3. Register Course
   - Students can register courses from /courses page
   - If student already registered to course it will show an error message
   - If student has a course with a time conflict it will show an error message
   - Student can see the schedule of the course
4. Bulk Register Course
   - This will help the student if they already got all the CRNs of the course they need
   - Student will put all the CRNS for courses and it will register to all of them
   - It will show an error incase there is any conflicts or similar courses registered
5. Login/Logout
   - A login page where it will authenticate the user to access dashboard
   - Selfservice routes are middleware protected, only logged on users can see them and interact with them
   - Login page is also route protected, only not logged in users can see them
   - Login will add a cookie with session id 
   - before every api call we have access to the user who did the call using middlewares
6. Register User
   - Students can register their user to selfservice
   - Usernames are unique so if they choose one already taken it will give them an error message
7. View Registered/Favorite Courses and Drop them
   - In the home page students can view their registered courses
   - There is a delete button where it will drop the course for the student
8. Favorite Course
   - Students can put a course as a favorite so they can watch them
   - They can favorite the course using the star in Courses page
   - This is for an unimplemented feature where students will get push notification/email if the course opens up or there is an empty seat.

# Pages
- Login Page (only guests): /login
- Register Page (only guests): /register
- Home Page (auth required): /
- Courses Page (auth required): /courses
- Bulk Register (auth required): /bulk

# Setup Instructions

- We are using `localhost:3000` as local URL
- To setup, after you clone run this to install all dependencies
```bash
npm install
```
- We used 127.0.0.1:27017 for host and port of database 
- selfservce for database
- so connection URI is setup as
```
mongodb://127.0.0.1:27017/selfservice
```
- After installing dependencies, you will need to seed database with courses data
- To do that run `npm run seed`
- You will have exit manually using `CTRL + C`, we are having trouble making it exist by itself, but it should populate database
- This will put all courses data in selfservice database in `Course` collection
- To run

```bash
npm run start
#or
node app.js
```

## Testing Instructions
- We are testing the CRUD operation for courses
- Testing for students and auth are together because they are relevant
- We tested if login is successful by logging in and then calling a protected route `/auth/me` which return logged on user data
- we are testing creating new account with a random username
- then create it again with same username to expect a unique error
- to run the test run
```bash
npm run test
```