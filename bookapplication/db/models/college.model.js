import { DataTypes } from "sequelize";
import { dbconnection } from "../connection.js";

export const CollegeModel = dbconnection.define('College', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    collegeName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('collegeName', val.toLowerCase())
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('city', val.toLowerCase())
        }
    },
    pincode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6]
        }
    }
}, {
    indexes: [

    ]
})

await CollegeModel.sync({
    // alter: true
})
