const BlogPost = (sequelize, DataTypes) => {
    const BlogPostTable = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: DataTypes.STRING,
          title: DataTypes.STRING,
          content: DataTypes.STRING,
          userId: DataTypes.INTEGER,
          published: DataTypes.DATE,
          updated: DataTypes.DATE
    }, 
    {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false,
    });

    BlogPostTable.associate = (models) => {
        BlogPostTable.belongsTo(models.User, 
        { foreignKey: 'user_id', as: 'users'})

        BlogPostTable.hasMany(models.PostCategory, 
            { foreignKey: 'post_id', as: 'post_categories'})
    };

    return BlogPostTable;
};


module.exports = BlogPost;