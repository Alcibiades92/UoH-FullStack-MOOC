const express = require("express");
const app = express();

const phonebook = [
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
  response.json(phonebook);
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
const PORT = 3002;
app.listen(PORT, () => {
  console.log(`This app is running on port :${PORT}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const phone = phonebook.find((n) => n.id === id);
  if (phone) {
    response.json(phone);
  } else {
    // response.json(phone);

    response.status(404).end();
  }
});
