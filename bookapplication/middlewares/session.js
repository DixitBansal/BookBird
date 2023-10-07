import session from "express-session";
import MongoStore from "connect-mongo";

export function sessions() {
  console.log("Connecting to MongoDB...")
  const store = MongoStore.create({
    mongoUrl: "mongodb+srv://aryan_yadav:onerker12@cluster0.qlqm1jf.mongodb.net/?retryWrites=true&w=majority",
    collectionName: "sessions",
  });
  console.log("Connected to MongoDB...")

  return session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      httpOnly: false,
      maxAge: 3600000
    },
  });
}
