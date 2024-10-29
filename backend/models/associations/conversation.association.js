const conversationAssociation = (db) => {
  db.Conversation.hasMany(db.Connection, {
    foreignKey: "conversationId",
    as: "connections",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default conversationAssociation;
