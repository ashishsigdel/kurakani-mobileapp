const messageAssociation = (db) => {
  db.Message.belongsTo(db.User, {
    foreignKey: "senderId",
    as: "sender",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Message.belongsTo(db.User, {
    foreignKey: "receiverId",
    as: "receiver",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  db.Message.belongsTo(db.Conversation, {
    foreignKey: "conversationId",
    as: "conversation",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default messageAssociation;
