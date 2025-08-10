const express = require("express")
const PORT = 3000
const app = express()

//data
const users = [
  { id: 1, name: "Meefr"},
  { id: 2, name: "Amr" },
  { id: 3, name: "Mohamed" },
];
app.use(express.json());
// // #region middleware
// const greeting = (req,res,next)=>{
//     console.log("hello world!");
//     next();
// }
// app.use(greeting)

//#endregion 
app.get('/',(req,res)=>{ //post put get delete
   // res.status(200).send("Hello World !")
    return res.status(200).json({msg: "Hello World!"}) 

})
//#region query
app.get("/users", (req, res) => {
    const { name } = req.query;
    if (name) {
      const foundUsers = users.filter(user => user.name.toLowerCase() === name.toLowerCase());
      return res.json(foundUsers);
    }
    res.send(users);
});
//#endregion

//#region parameter
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).send({ status: 200, data: user });
});
//#endregion

//#region req body
  app.post("/users", (req, res) => {
    const { name,age } = req.body;
    if (!name || !age) return res.status(400).json({ msg: "Name and Age is required " });
    const newUser = { id: users.length + 1, name:name,age:age };
    users.push(newUser);
    res.status(201).json(users);
  });
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))