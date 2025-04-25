const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("No arguments provided exiting");
  process.exit(1);
}
const password = process.argv[2];
const url = `mongodb+srv://Georgios:${password}@cluster0.mnov4eg.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);
mongoose.connect(url);
const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});
const Phone = mongoose.model("Phone", phoneSchema);

if (process.argv.length < 5) {
  console.log("If you want to add give  a name and a number");
  Phone.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}

const name = process.argv[3];
const number = process.argv[4];

const phone = new Phone({
  name,
  number,
});

if (process.argv.length === 5) {
  phone.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
}
