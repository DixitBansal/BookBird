import { DataTypes } from "sequelize"
import { dbconnection } from "../connection.js"

export const BookModel = dbconnection.define("Books", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('bookName', val.toLowerCase())
        }
    },
    bookEdition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bookAuthor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publication: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('publication', val.toLowerCase())
        }
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: false,
        set(val) {
            this.setDataValue('subject', val.toLowerCase())
        }
    },
    ISBN: {
        type: DataTypes.STRING,
        allowNull: false,

    }
}, {
    indexes: [
        {
            type: "UNIQUE",
            fields: ['ISBN']
        },
        {
            type: "FULLTEXT",
            fields: ["bookName"]
        },
        {
            type: "FULLTEXT",
            fields: ["bookAuthor"]
        },
        {
            type: "FULLTEXT",
            fields: ["publication"]
        },
    ],
    timestamps: true
})
await BookModel.sync(
    // { alter: true }
)
// dbconnection.getQueryInterface().addIndex('Books', ['bookName']);
// dbconnection.getQueryInterface().addIndex('Books', ['bookAuthor']);
// dbconnection.getQueryInterface().addIndex('Books', ['bookEdition']);
// dbconnection.getQueryInterface().addIndex('Books', ['subject']);
// dbconnection.getQueryInterface().addIndex('Books', ['publication']);