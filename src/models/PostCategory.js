const PostCategory = (sequelize, DataTypes) => {
    const PostCategoryTable = sequelize.define('PostCategory', {
        postId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
        categoryId: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
    }, 
    {
    tableName: 'post_categories',
    underscored: true,
    timestamps: false,
    });

    PostCategoryTable.associate = (models) => {
        models.Category.belongsToMany(models.BlogPost, 
        { 
            as: 'blog_posts',
            through: PostCategoryTable,
            foreignKey: 'post_id', 
            otherKey: 'category_id',
        });
    
        models.BlogPost.belongsToMany(models.Category, 
        { 
        as: 'categories',
        through: PostCategoryTable,
        foreignKey: 'category_id', 
        otherKey: 'post_id',
    });
    };

    return PostCategoryTable;
};



module.exports = PostCategory;