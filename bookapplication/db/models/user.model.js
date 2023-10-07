import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import { dbconnection } from "../connection.js";

export const UserModel = dbconnection.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userNames: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        this.setDataValue("userNames", value.toLowerCase())
      }
    },
    contacts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hash = (v) => {
          const saltRound = 10;
          const salt = bcrypt.genSaltSync(saltRound);
          const hash = bcrypt.hashSync(v, salt);
          return hash;
        };
        this.setDataValue("password", hash(value));
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: ["m", "f", "o"],
      },
    },
    intersedBooks: {
      type: DataTypes.JSON,
    },
    profileImgUrl: {
      type: DataTypes.STRING,
    },
    acc_type: {
      type: DataTypes.STRING,
      isIn: ["admin", "user"],
      defaultValue: "user",
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        unique: true,
        fields: ["contacts"],
      },
    ],
  }
);

await UserModel.sync(
  // { alter: true }
)
