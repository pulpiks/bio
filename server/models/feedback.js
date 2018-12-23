module.exports = function(sequelize, DataTypes) {
    var feedback = sequelize.define('feedback', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        msg: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        // timestamps: false,
        // freezeTableName: true
    });

    // feedback.associate = function(models) {
    //     models.feedback.hasMany(models.quote, { foreignKey: "author_id", sourceKey: "id" });
    // }

    return feedback;
}