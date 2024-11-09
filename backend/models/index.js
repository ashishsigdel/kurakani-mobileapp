import { Sequelize, DataTypes, Op, sequelize } from "../database/dbConfig.js";

import associations from "./associations/index.js";

import User from "./user.model.js";
import RefreshToken from "./refreshToken.model.js";
import ConnectionRequest from "./connectionRequest.model.js";
import Connection from "./connection.model.js";
import Conversation from "./conversation.model.js";
import Message from "./message.model.js";
import ResetPassword from "./resetPassword.model.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.DataTypes = DataTypes;
db.Op = Op;

db.User = User(sequelize, Sequelize, DataTypes);
db.RefreshToken = RefreshToken(sequelize, Sequelize, DataTypes);
db.ConnectionRequest = ConnectionRequest(sequelize, Sequelize, DataTypes);
db.Connection = Connection(sequelize, Sequelize, DataTypes);
db.Conversation = Conversation(sequelize, Sequelize, DataTypes);
db.Message = Message(sequelize, Sequelize, DataTypes);
db.ResetPassword = ResetPassword(sequelize, Sequelize, DataTypes);

associations(db);

export default db;
