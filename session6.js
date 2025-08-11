const express = require("express")
const PORT = 3000
const app = express()

//data
// const users = [
//   { id: 1, name: "Meefr"},
//   { id: 2, name: "Amr" },
//   { id: 3, name: "Mohamed" },
// ];

app.use(express.json());
// #region middleware
// const greeting = (req,res,next)=>{
//     console.log("hello world!");
//     next();
// }
// app.use(greeting)

//#endregion 
// app.get('/',(req,res)=>{ 

//     return res.status(200).json({
//       status: 200,
//       msg: "Hello World!"}) 

//  })
//#region query - get all users/get user by name
// app.get("/users", (req, res) => {
//     const { name } = req.query; 
//     if (name) {
//       const foundUsers = users.filter(user => user.name.toLowerCase() === name.toLowerCase());
//       return res.status(200).json(foundUsers);
//     }
//     res.status(200).json(users);
// });
// //#endregion

// //#region parameter - get user by id
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).send({ status: 200, data: user });
});
// //#endregion

// //#region req body - add new user to array
  // app.post("/users", (req, res) => {
  //   const { name,age } = req.body;
  //   if (!name || !age) return res.status(400).json({ msg: "Name and Age is required " });
  //   const newUser = { id: users.length + 1, name:name,age:age };
  //   users.push(newUser);
  //   res.status(201).json(users);
  //  });

// //update info of a user given the id
// app.put("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = users.findIndex((user) => user.id === id);
//   if (index === -1) return res.status(404).json({ msg: "User not found" });
//   users[index] = { id, ...req.body }; // 
//   res.status(200).json({data:users[index]});
//  });

// //delete user from array
// app.delete("/users/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = users.findIndex((user) => user.id === id);
//   if (index === -1) return res.status(404).json({ msg: "User not found" });
//   users.splice(index, 1);
//   res.status(200).json({ msg: "User deleted successfully" });
// });


///////////////////////// hands on //////////////////////////
const users = [
  {
    id: 1,
    name: "Dalia",
    hobbies: [
      { name: "reading", skill: "advanced" },
      { name: "coding", skill: "intermediate" }
    ],
  },
  {
    id: 2,
    name: "Lina",
    hobbies: [
      { name: "gaming", skill: "beginner" },
      { name: "drawing", skill: "advanced" }
    ],
  }
];
//1
app.get("/users", (req, res) => {
  const { name } = req.query;
  if (name) {
    const filtered = users.filter(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );
    return res.json(filtered);
  }
  res.status(200).json(users);
});

//2
  app.post("/users", (req, res) => {
    const { name,hobbies } = req.body;
    if (!name) return res.status(400).json({ msg: "Name is required " });
    const newUser = { id: users.length + 1, name:name,hobbies:hobbies };
    users.push(newUser);
    res.status(201).json(users);
   });


   //3
app.post("/users/:id/hobbies", (req, res) => {
  const id = parseInt(req.params.id);
  const {name, skill} = req.body;

  if (!name || !skill)
    return res.status(400).json({ error: "Invalid hobby data" });
 const index = users.findIndex((user) => user.id === id);
  if (index===-1) return res.status(404).json({ error: "User not found" });
const newHobby={name:name,skill:skill};
  users[index].hobbies.push(newHobby);
  res.status(201).json(newHobby);
});
   //4
app.put("/users/:id/hobbies/:hobbyName", (req, res) => {
  const id = parseInt(req.params.id);
  const hobbyName = req.params.hobbyName; 
  const { skill } = req.body;

  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) return res.status(404).json({ msg: "User not found" });

  const hobbyIndex = users[userIndex].hobbies.findIndex(
    (hobby) => hobby.name === hobbyName
  );
  if (hobbyIndex === -1)
    return res.status(404).json({ msg: "Hobby not found" });

  if (!skill)
    return res.status(400).json({ msg: "Skill is required" });

  users[userIndex].hobbies[hobbyIndex].skill = skill;

  res.status(200).json(users[userIndex]);
});


app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))