import http from "http";
// app
import { createApp } from "./app.js";

async function runServer() {
  let server = null;
  try {
    // let connection = await dbconnection({
    //     host: "localhost",//"bookappdb.cgw2xd35fmzw.ap-south-1.rds.amazonaws.com",
    //     database: "bookdb",
    //     password: "onerker@$Q1",//"aryanUIQ12",
    //     username: "root",//"admin",
    //     dialect : "mysql"
    // })

    server = http.createServer(await createApp());

    server.listen(7890, "0.0.0.0", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Server Started...");
      }
    });
  } catch (err) {
    console.log(err);
    server.close();
  }
}

runServer();
