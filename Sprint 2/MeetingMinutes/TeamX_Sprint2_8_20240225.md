# Meeting Minutes 8 - 25th February 2024 - 11 AM
## Present Members
* Khaled Elshokri
* Omar Hassanein
* Kyle Rasinger
* Thomas Mejia
* Ahmed Obeid
* Viktor Dimitrov
## Topics Discussed
1. Discussing Progress of Members 
2. Debugging Backend
3. Discussing Focus Points
4. To Do in Next Session
### Discussing Progress of Members 
* Viktor: Start coding HTML frontend, Info Page.
* Kyle: Data strucutre is already set up. As soon as the database is ready, all users can start working on their parts in concordance with the database setup. Build will be done in RunDev. 
* Khaled: Worked on backend. Tried implementing data from API found in repository of [PERSON]. Without the next off, in MongoDB we can just send the Json. There is a car rental database, and inside you have the collections. If MongoDB doesn't find a collection, it creates one automatically and puts the Json inside. Khaled tried to link to MongoDB a registration form, which he created. The logic is already set to see if the email is not already used, etc. He plans on testing MongoDB database with some inputs to see if the checking property works. Khaled a problem with making the npm build, however he was able to make the routings (OR routes). When you send the Json to MongoDB, it stores it and creates an API automatically. 
* Thomas: Did a plan of front-end: login page for 3 types of users, then user page with listing of cars and filters. Currently coding the page listing all available cars.
* Ahmed: Doing the unit tests.
* Omar: Working on backend and APIs. 
### Debugging Backend
* We tried debugged a backend feature of the header which kept gaving error, because it is using next off. Khaled wanted to create a branch without next off, but it is not fully gone. Then ,we install the API. 
* We want to remove the authentication from API and just show at some user endpoints or we can do it at both. We must decide. 
* We need to host separately MongoDB, backend and frontend.
* Solution: clone repo, dependencies are diff so do Jsons between them and link. Everyone starts working on a part of the frontend in order to make some progress. That, way, we have empty blocks (until we link them to the database).
* Do test software API. Postman is to see the data coming in and out of the Json. 
### Discussing Focus Points
* We reviewed the instructions for Sprint 2 and decided we must focus on implementing the features before worrying about the bigger problems. Also, we must write a test for each code file using a testing framework. 
### To Do in Next Session:
* Utilise backend api of [PERSON] and tailor it to our specific needs 
* Having started/finishing front end components. 
* Start figuring out how the repo works so we can understand our backend and database work and link it to the front end.  
