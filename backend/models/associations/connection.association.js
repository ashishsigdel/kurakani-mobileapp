const connectionAssociation = (db) => {
  db.Connection.belongsToMany(db.User, {
    through: "user_connection",
    foreignKey: "connectionId",
    otherKey: "userId",
    as: "users",
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
