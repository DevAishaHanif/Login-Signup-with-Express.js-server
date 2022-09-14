import express from 'express'
import cors from 'cors'
const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

let userBase = [];

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
  let isFound = false;
  for (let i = 0; i < userBase.length; i++) {
    if (userBase[i].email === body.email.toLowerCase()) {
      isFound = true;
      break;
    }
  }
  if (isFound) {
    req.status(400).send({
      message: `Email ${body.email} Alredy Exist :-(`
    });
    return;
  }


  let newUser = {
    userId: naonid(),
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email.toLowerCase(),
    password: body.password
  }
  userBase.push(newUser);
  res.status(201).send({ message: "USER is created :-)" });
});


app.post("/login", (req, res) => {

  let body = req.body;
  if (!body.email || !body.password) {
    res.status(400).send(
      `required fields are missing, request example:
            {
              "email": "abc@abc.com",
              "password": "12345"
            }`
    );
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
          message: "Congratulations!! Login successful :-) ..."
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
      message: "USER not found :-/"
    })
    return;
  }

}
)    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})






