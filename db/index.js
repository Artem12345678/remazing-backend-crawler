const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

const mongoURI = process.env.MONGO_URL;

class DB {
  constructor() {
    this.connection = null;
  }

  connect() {
    return mongoose
      .connect(mongoURI)
      .then(() => {
        this.connection = mongoose.connection;

        this.connection.on("error", err => {
          console.log(err);
        });

        this.connection.on("close", () => {
          console.log("MongoDB Disconnected");
        });

        console.log("MongoDB Connected");
      })
      .catch(err => console.log(err));
  }
}

module.exports = new DB();
