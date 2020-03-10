const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URL;

class DB {
  constructor() {
    this.connection = null;
  }

  connect() {
    return mongoose
      .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        this.connection = mongoose.connection;

        this.connection.on("error", err => {
          console.log(err);
        });

        console.log("MongoDB Connected");
      })
      .catch(err => console.log(err));
  }
}

module.exports = new DB();
