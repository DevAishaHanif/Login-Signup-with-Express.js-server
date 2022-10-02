import express from 'express'
import cors from 'cors'
import { nanoid } from 'nanoid'
import  mongoose from 'mongoose'

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName:  String,
  email:     String,
  password:  String,
  createdOn:  { type: Date, default: Date.now },
});
const userModel = mongoose.model('User', userSchema);


app.post("/signup", (req, res) => {

  let body = req.body;
  if (!body.firstName
    || !body.lastName
    || !body.email
    || !body.password
  ) {
    res.status(400).send(
      `required fields missing, request example:
        {
          "firstName": "John",
          "lastName": "Doe",
          "email":abc@abc.com",
          "password":  "12345"
        }`
    );
    return;
  }
  
let newUser = new userModel({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email.toLowerCase(),
    password: body.password
  });
  
  newUser.save((err, result) => {
    if (!err) {
      console.log("data saved:", result )
      res.status(201).send({ message: "user is created :-)" });
   } else {
    console.log("db error: ",err);
    res.status(500).send({ message: "Internal Server Error" });
   }
  })
});


app.post("/login", (req, res) => {
   let body = req.body;
  if (!body.email || !body.password) {
    res.status(400).send(
      `required fields are missing, request example:
            {
              "email": "abc@abc.com",
              "password": "12345"
            }`);
    return;
  }
  let isFound = false;
  for (let i = 0; i < userBase.length; i++) {
    if (userBase[i].email === body.email) {
      isFound = true;
      if (userBase[i].password === body.password) {
        res.status(200).send({
          firstName: userBase[i].firstName,
          lastName: userBase[i].lastName,
          email: userBase[i].email,
          message: "Congratulations!! Login successful :-)"
        })
        return;

      } else {
        res.status(401).send({
          message: "Sorry!! Incorrect Password :-("
        })
        return;
      }
    }
  }
  if (!isFound) {
    res.status(404).send({
      message: "user not found :-/"
    })
    return;
  }

})    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



///////////////////////////////////////////////////////////////////////////
let dbURI = ('mongodb+srv://abc:abc@cluster0.zauilio.mongodb.net/socialMediaBase?retryWrites=true&w=majority');
mongoose.connect(dbURI);

// //////////////  MONGODB CONNECTED DISCONNECTED EVENTS /////////////////// 
mongoose.connection.on('connected', function() {
  console.log("MONGOOSE is connected");
});

mongoose.connection.on('disconnected', function() {
  console.log("MONGOOSE is disconnected");
});


mongoose.connection.on('error', function(err) {
  console.log("MONGOOSE connection error:", err);
  process.exit(1);
});

process.on('SIGINT', function() {
  console.log("APP is terminating");
  mongoose.connection.close(function() {
    console.log('MONGOOSE default connection closed');
    process.exit(0);
  });
});
//////////////////// MONGODB CONNECTED DISCONNECTED EVENTS ////////////////


