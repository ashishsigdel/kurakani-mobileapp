const connectionRequestAssociation = (db) => {
  db.ConnectionRequest.belongsTo(db.User, {
    foreignKey: "senderId",
    as: "sender",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.ConnectionRequest.belongsTo(db.User, {
    foreignKey: "receiverId",
    as: "receiver",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default connectionRequestAssociation;
