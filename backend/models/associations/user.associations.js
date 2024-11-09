const userAssociation = (db) => {
  db.User.hasMany(db.RefreshToken, {
    foreignKey: "userId",
    as: "refreshTokens",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.User.hasMany(db.ConnectionRequest, {
    foreignKey: "senderId",
    as: "sentRequest",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.User.hasMany(db.ConnectionRequest, {
    foreignKey: "receiverId",
    as: "receivedRequest",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.User.belongsTo(db.Connection, {
    // through: "user_connection",
    foreignKey: "userId",
    // otherKey: "connectionId",
    as: "connections",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.User.hasMany(db.ConnectionRequest, {
    foreignKey: "senderId",
    as: "sentRequests",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.User.hasMany(db.ConnectionRequest, {
    foreignKey: "receiverId",
    as: "receivedRequests",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.User.hasMany(db.ResetPassword, {
    foreignKey: "userId",
    as: "otp",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default userAssociation;
