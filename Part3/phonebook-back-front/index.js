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

app.get("/api/persons", (request, response) => {
  Phone.find({}).then((phones) => {
    response.json(phones);
  });
});
app.get("/info", (request, response) => {
  Phone.find({}).then((phones) => {
    const date = request.headers["date"]
      ? new Date(request.header["date"]).toLocaleString()
      : new Date().toLocaleString();
    const phrase = `Phonebook has info for ${phones.length} people, \n Date and time : ${date}`;
    response.send(phrase);
  });

  // const toBeReturned = { phrase, date };
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`This app is running on port :${PORT}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Phone.findById(id).then((phone) => {
    if (phone) {
      response.json(phone);
    } else {
      response.status(404).end();
    }
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Phone.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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
app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Phone.findById(request.params.id)
    .then((phone) => {
      if (!phone) {
        return response.status(404).end();
      }
      phone.name = name;
      phone.number = number;

      return phone.save().then((updatedPhone) => {
        response.json(updatedPhone);
      });
    })
    .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
  console.log("Error handler says ", error.message);
  if ((error.name = "CastError")) {
    return response.status(400).send({ error: "Bad request" });
  }
  next(error);
};

app.use(errorHandler);
