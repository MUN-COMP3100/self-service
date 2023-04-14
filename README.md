# Student Self Service

-   Mohammed Balfaqih 202051926
-   Ripudaman Singh 202054565

Submission: Saturday, 14 April, 2023

# Submission 3:

We implemented 8 core frontend/client side features. We made 5 pages to contain all of the features.

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
    - Student will put all the CRNs for courses and it will register to all of them
    - It will show an error incase there is any conflicts or similar courses registered
5. Login/Logout
    - A login page where it will authenticate the user to access dashboard
    - Selfservice routes are middleware protected, only logged on users can see them and interact with them
    - Login page is also route protected, only not logged in users can see them
    - Login will add a cookie with session id
    - before every api call we have access to the user who did the call using middlewares
    - In client side you can click on the logout buton top right corner
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

-   Login Page (only guests): /login
-   Register Page (only guests): /register
-   Home Page (auth required): /
-   Courses Page (auth required): /courses
-   Bulk Register (auth required): /bulk

# Tech Stack
- Server Side:
  - ExpressJs
  - MongoDb
- Client Side:
  - Ejs: make it easy to serve HTML with server side rendering
  - Tailwindcss: Instead of having premade components like Boostrap, we decided to go for this one because it gives css utilities to make the design looks the way we want.
  - Javascript: We went with vanilla javascript instead of Jquery.


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

## Seeding Courses ( Important )
- After installing dependencies, you will need to seed database with courses data
- To do that run 
```
npm run seed
```
- This will put all courses data in selfservice database in `Course` collection

## Seeding a Default User ( Optional )
- If you want a default user to be made for testing run 
```
npm run seed:users
```
- username: user
- password: user123
- That can be changed in `/seeders/user.seed.mjs`

## Running The App
- After making sure that you installed dependencies and seeded database with data run the following command:
```bash
npm run start
#or
node app.mjs
```

# Testing

## Testing Instructions for Backend
- We are testing the CRUD operation for courses
- Testing for students and auth are together because they are relevant
- We tested if login is successful by logging in and then calling a protected route `/api/auth/me` which return logged on user data
- we are testing creating new account with a random username
- then create it again with same username to expect a unique error
- to run the test run
```bash
npm run test
```

## Testing Instruction for Frontend
- Basically open the website in http://localhost:3000
- You should be redirected to /login page since all routes are protected
- Create a user in /register page then login with the account you created

# Attributions
- Ripudaman Singh's Code from Assignment one was used to check for conflicts and parsing the data.
- Mohammed Balfaqih's code from other projects for directory structure and error handlers
