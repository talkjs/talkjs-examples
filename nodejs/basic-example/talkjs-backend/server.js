import express from "express";
import cors from "cors";
import { LowSync, JSONFileSync } from "lowdb";

const adapter = new JSONFileSync("users.json");
const db = new LowSync(adapter);
db.read();
// Initialize with an empty array if users.json is empty or doesn't exist
db.data ||= { users: [] };

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.post("/createUser", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const photoUrl = req.body.photoUrl;
  const role = req.body.role;
  const welcomeMessage = req.body.welcomeMessage;
  db.data.users.push({
    id: id,
    name: name,
    email: email,
    photoUrl: photoUrl,
    role: role,
    welcomeMessage: welcomeMessage,
  });
  db.write();
  res.status(200).send("User created successfully");
});

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  let record = db.data.users.find((p) => p.id == id);
  if (!record) {
    console.log("No data found!");
  } else {
    console.log("== Record found ==");
    console.log(record);
    res.status(200).send(record);
  }
});

app.listen(port, () => console.log(`Server up and running on port ${port}`));
