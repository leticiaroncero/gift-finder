module.exports = function (sequelize, DataTypes) {
    var Bookmark = sequelize.define("Bookmark", {
        
        title: {
            type: DataTypes.STRING,
            allowNull: false
            },
        image: {
            type: DataTypes.STRING,
            allowNull: false
            },
        url: {
            type: DataTypes.STRING,
            allowNull: false
          },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
        });
        

    return Bookmark;
};
