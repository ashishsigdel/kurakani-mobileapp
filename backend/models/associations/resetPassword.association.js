const resetPasswordAssociation = (db) => {
  db.ResetPassword.belongsTo(db.User, {
    foreignKey: "userId",
    as: "resetUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};

export default resetPasswordAssociation;
