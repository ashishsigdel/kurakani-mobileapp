const refreshTokenAssociation = (db) => {
  db.RefreshToken.belongsTo(db.User, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default refreshTokenAssociation;
