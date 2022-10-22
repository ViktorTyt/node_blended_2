const { connect } = require("mongoose");

const connectDB = async () => {
  try {
    const db = await connect(process.env.DB_URI);
    console.log(
      `mongoDB are connection on host ${db.connection.host}. on port ${db.connection.port}, DB name: ${db.connection.name}`
        .cyan.bold.italic
    );
  } catch (error) {
    console.log(error.message.magenta);
    process.exit(1);
  }
};

// const Cat = mongoose.model("Cat", { name: String });

// const kitty = new Cat({ name: "Zildjian" });
// kitty.save().then(() => console.log("meow"));
module.exports = { connectDB };
