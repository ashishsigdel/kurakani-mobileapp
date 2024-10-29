const Conversation = (sequelize, Sequelize, DataTypes) => {
  return sequelize.define(
    "Conversation",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: true,
      underscored: true,
      paranoid: true,
    }
  );
};

export default Conversation;
