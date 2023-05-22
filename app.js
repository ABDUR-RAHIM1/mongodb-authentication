const express = require('express')
const app = express();
const bodyParser = require('body-parser');
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
const User = require('./Database/model/users.model');

app.get("/", (req, res) => {
       res.sendFile(__dirname + "/view/index.html")
})



//// main routes 
app.post('/register', async (req, res) => {
       try {
              const { email, password } = req.body;
              const newUser = new User({ email, password })
              await newUser.save()
              res.status(201).json({ messsage: " user created", newUser })
       } catch (error) {
              res.status(500).json({ massage: "Error", error })
       }
})

app.post('/login', async (req, res) => {
       try {
              const { email, password } = req.body;
              const user = await User.findOne({ email: email });
              if (user && user.password === password) {
                     res.status(201).sendFile(__dirname + "/view/loggedIn.html")
              } else {
                     res.status(404).json({ massage: "user Not found" })
              }

       } catch (error) {
              res.status(500).json(error.massage)
       }
})



// server request error handler 
app.use((req, res, next) => {
       res.sendFile(__dirname + '/view/error.html')
})


module.exports = app;