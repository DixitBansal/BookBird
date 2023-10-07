import { Sequelize } from "sequelize";

export async function createDBConnection({
  host,
  username,
  password,
  database,
  dialect,
}) {
  try {
    const connection = new Sequelize({
      dialect: dialect,
      host: host,
      username: username,
      password: password,
      database: database,
      logging: false
    });
    // createModels(connection)
    console.log("CONNECTED TO THE SERVER...");
    return connection;
  } catch (err) {
    console.log(err);
  }
}

export const dbconnection = await createDBConnection({
  host: "bookdee.cgw2xd35fmzw.ap-south-1.rds.amazonaws.com", //"bookappdb.cgw2xd35fmzw.ap-south-1.rds.amazonaws.com",
  database: "bookdee",
  password: "aryanUI&*", //"aryanUIQ12",
  username: "aryanyadav", //"admin",
  dialect: "mysql"
});
