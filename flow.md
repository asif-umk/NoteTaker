# create folder structure
 
 create a folder and name it notestaker, inside it create two more folders, one for backend and one for frontend.

1. client folder (frontend)
2. server folder (backend)


# basics
run the follwing commands to install the dependencies

```bash
npm init -y 
npm install express dotenv mongoose bcryptjs jsonwebtoken nodemon cors cookie-parser 
```

## server.js

1. sab se pehle basic setup karo, like express cors mongoose cookie-parser etc inside index.js
2. secret data rakhne keleye .env folder banaw. 
3. oske bad config folder banaw aur os me mongoose ko connect karo


## schema and models

1. create a folder name models inside backend, and inside it create all your schemas and models. 
2. phir oske andar user.js file banaw jis me user schema and model hoga, sath me presave hook banaw jis me password ko hash karo. aur sath me matchPassword method banaw jis me password ko unhash karo aur check karo ki password match kya hua.
3. Note schema and model create karo, aur sath me createdBy field banaw jis me user ke id hoga. aur sath me timestamps add karo. 

## routes

1. create a folder name routes inside backend, and inside it create 2 files auth.js and notes.js
2. auth.js will handle login and register user, it will also container generate JWT Token and pitch user data 
3. notes.js will contain all the routes for notes like create note, get all notes, get single note, update note, delete note
4. each route is protect by a middle ware which will check if user is logged in or not.

## middleware

1. create a folder name middleware inside backend, and inside it create a file auth.js
2. auth.js will contain protect middleware which will check if user is logged in or not.




