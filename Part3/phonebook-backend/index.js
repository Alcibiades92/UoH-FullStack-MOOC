require("dotenv").config();
const express = require("express");
const Phone = require("./models/phone.js");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(express.json());
morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);
let phonebook = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  Phone.find({}).then((phones) => {
    response.json(phones);
  });
});
app.get("/info", (request, response) => {
  const howMany = phonebook.length;
  const phrase = `Phonebook has info for ${howMany} people \n `;
  const date = request.headers["date"]
    ? new Date(request.header["date"]).toLocaleString()
    : new Date().toLocaleString();
  const toBeReturned = { phrase, date };
  response.send(phrase + "\n" + date);
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This app is running on port :${PORT}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Phone.findById(id).then((phone) => {
    response.json(phone);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  phonebook = phonebook.filter((phone) => phone.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "Provide field for the phone",
    });
  }
  const phone = new Phone({
    number: body.number,
    name: body.name,
  });
  phone.save().then((savedPhone) => {
    response.json(savedPhone);
  });
});
