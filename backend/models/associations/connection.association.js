const connectionAssociation = (db) => {
  db.Connection.belongsTo(db.User, {
    // through: "user_connection",
    foreignKey: "friendId",
    // otherKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.Connection.belongsTo(db.Conversation, {
    foreignKey: "conversationId",
    as: "conversation",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default connectionAssociation;
