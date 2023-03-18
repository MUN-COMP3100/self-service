# Student Self Service

### Submission 2:
- Project Structure
	- We used `Routes, Controller, Middlewares`.
	- We defined our routes in `./routes`, it's where we write the GET/POST/UPDATE/DELETE for every feature of our project.
	- Querying the database happens in `./controllers`, it's a where all the functions between the app and database happen. We also do validation, encrypting, and error checking there.
	- we define our middlewares in `./middlewares`, we will use middlewares to check for permissions, authorization, and authentications.
- Mongodb Connection ( Feature 1)
	- We used mongoose to easily create relationship between tables and easier validation.
	- The connection is initialised  in `./db/index.mjs`, where we create a Mongodb connection then return the connection to be used.
	- Models and defined Schemas are located in `./models`, it's where we defined our data types and relationships.
- Register Account ( Feature 2 )
	- When a student register, we check if username exists first.
	- When creating, we encrypt the password for security using bcryptjs.
	- Then we save everything with the hashed password in database
- Student Controller ( Feature 3 )
	- We defined student schema with student details and username and password.
	- username is unique
	- The operation for student is only create, update.
	- We don't want to have get all or get by id until we implement admin feature.
- Course Controller (Feature 4)
  - We defined course schema with details.
  - We will have get all courses and course by id avaialable for public
  - Create, Update Delete courses will only be for Admin
- Favorite Course (Feature 5)
  - Every student will have a list of favorite courses.
  - We added additional schema definition for student which is a list of object ids of courses.
  - We made sure the id is for courses using mongoose relationship and references.
- Authentication (Feature 6)
  - For authentication we are using `mongo-connect` and `express-sessions`
  - Code for login is in `./controllers/student.controller.mjs`
  - When a user calls for login we get the username and password
  - We check if username exist in database, if not we say username or password isn't correct for security
  - If it does exist, we compare the hash in database with given password
  - If password not correct we throw an error, if it is then we add a cookie of the new session, and everytime we authorize we check for the session


