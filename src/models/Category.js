const Category = (sequelize, DataTypes) => {
    const CategoryTable = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          name: DataTypes.STRING,
    }, 
    {
    tableName: 'categories',
    underscored: true,
    timestamps: false,
    });

    CategoryTable.associate = (models) => {
        CategoryTable.hasMany(models.PostCategory, 
            { foreignKey: 'category_id', as: 'post_categories'})
    };

    return CategoryTable;
};

module.exports = Category;
