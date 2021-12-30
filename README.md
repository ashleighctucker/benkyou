# Welcome to 勉強 Benkyou!

[Benkyou](https://benkyou-app.herokuapp.com/) is a rough clone of [Brainscape](https://www.brainscape.com) with full C/R/U/D features for study decks, cards inside of those decks, and deck lists (which allows users to add/remove decks from other Benkyou users to their lists). Check out the full front-end [feature](https://github.com/ashleighctucker/benkyou/wiki/Feature-List) list to see all Benkyou currently has deployed!

![preview](https://github.com/ashleighctucker/benkyou/blob/main/images/preview-benkyou.gif)

 You can find Benkyou's current databse schema [here](https://github.com/ashleighctucker/benkyou/wiki/Database-Schema). 
 
 ## Tech Stack
 
 
 ### [Front-End](https://github.com/ashleighctucker/benkyou/wiki/React-Routes):
 * ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
 * ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
 * ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
 * ![HTML](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
 * ![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
 * ![NODE JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
 * ![MUI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)
 * ![HEROKU](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)

 ### [Back-end](https://github.com/ashleighctucker/benkyou/wiki/API-Routes):
 * ![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
 * ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
 * ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
 * ![AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
 * SQL Alchemy/Alembic
 * WTForms
 * Faker
 * Docker
 * [Owlbot API](https://owlbot.info)

## Future Features for Benkyou

* Enhacing the badges feature with an alert pop up when a user is awarded a badge
* Enhancing the study feature with 3D Flip card animations 
* Allowing users to favorite decks to save for later

## Want to contribute to Benkyou or try it locally?

1. clone the repo with the command `git clone https://github.com/ashleighctucker/benkyou.git`
2. cd into the newly created project directory and install the backend dependencies with: `pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt`
3. create a .env file based on the example .env file in the root direcotry with the proper settings for your development environment
4. setup your PostgresSQL user and database, matching the .env file you just created 
5. enter the pipenv shell: `pipenv shell`
6. migrate the datbase: `flask db upgrade`
7. seed the database: `flask seed all` 
8. start the backend server: `flask run`
9. open another terminal for the front-end server, cd into the '/react-app' directory
10. install the front-end dependencies: `npm install`
11. start the front-end server: `npm start`


