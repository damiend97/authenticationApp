// index.js
// obviously not much for error handling but it works!

// console
// https://www.npoint.io/docs/793aedf7ca718c314548

// bin
// https://api.npoint.io/793aedf7ca718c314548

import './styles/main.scss';
import { userInput, passInput, submitButton } from './js/domLoader';

submitButton.addEventListener('click', () => {
    // userCredentials
    let userCredentials = {
        username: userInput.value,
        password: passInput.value
    }

    fetchDB()
    .then((loadedDatabase) => {
        console.log("fetchDB :", loadedDatabase)
        return loginUser(loadedDatabase.users, userCredentials);
    })
    .then((loadedUser) => {
        console.log("loginUser : ", loadedUser);
        return displayUser(loadedUser);
    })
})

const fetchDB = async () => {
    try {
        let userDB = await fetch('https://api.npoint.io/793aedf7ca718c314548');

        if(!userDB.ok) {
            throw new Error("Database not found");
        }

        // loadedDatabase
        return userDB.json();
    } catch (err) {
        return err;
    }
}

const loginUser = async (database, user) => {
    for (let i = 0; i < database.length; i++) {
        let dbUser = database[i];

        if(dbUser.username === user.username && dbUser.password === user.password) {
            return dbUser;
        }
    }    
}

const displayUser = async (user) => {
    document.querySelector('body').classList.add("flexCenter");
    document.querySelector('body').classList.add("fullScreen");
    document.querySelector('body').classList.add("whiteText");
    document.querySelector('body').innerHTML = (
        "<div><div>Welcome, " + user.username + "</div><br><div>YOUR COLOR IS...</div><br><div>" + user.color + "</div></div>"
    );
}