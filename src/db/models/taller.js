const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
const Talleres = sequelize.define('Talleres', {
    title: DataTypes.STRING,
    resume: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,    
    created_user_id: DataTypes.INTEGER

},{
    underscored: true,
    timestamps: true,
    tableName: "talleres"
});

Talleres.associate = (models =>{
    Talleres.belongsTo(models.User,{foreignKey: 'created_user_id' });

}); 



return Talleres
}