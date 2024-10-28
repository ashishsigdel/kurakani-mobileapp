import { Sequelize, DataTypes, Op } from "sequelize";

const sequelize = new Sequelize({
  database: "kurakani",
  username: "root",
  password: "rocket5%",
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});

export { sequelize, DataTypes, Op, Sequelize };
