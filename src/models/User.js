const User = (sequelize, DataTypes) => {
    const UserTable = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      tableName: 'users',
      underscored: true,
      timestamps: false,
    });

    UserTable.associate = (models) => {
      UserTable.hasMany(models.BlogPost, 
      { foreignKey: 'user_id', as: 'blog_posts'})
  };

    return UserTable;
  };
  
  module.exports = User;