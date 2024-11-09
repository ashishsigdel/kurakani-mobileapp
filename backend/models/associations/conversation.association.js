const conversationAssociation = (db) => {
  db.Conversation.hasMany(db.Connection, {
    foreignKey: "conversationId",
    as: "connections",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });

  db.Conversation.hasMany(db.Message, {
    foreignKey: "conversationId",
    as: "messages",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default conversationAssociation;
