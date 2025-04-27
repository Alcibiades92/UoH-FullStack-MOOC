const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
url = process.env.MONGODB_URI;
console.log("connecting");
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB", error.message);
  });

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 3;
      },
      message: (props) => {
        return `Expected at least 3 characters got ${props.value.length}`;
      },
    },
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^(?=.{8,}$)\d{2,3}-\d+$/.test(value);
      },
      message: (props) => {
        return `Pattern provided is not compatible with the correct one.`;
      },
    },
  },
});

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Phone", phoneSchema);
