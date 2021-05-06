const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
const Novedades = sequelize.define('Novedades', {
    title: DataTypes.STRING,
    resume: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,    
    created_user_id: DataTypes.INTEGER

},{
    underscored: true,
    timestamps: true,
    tableName: "novedades"
});

Novedades.associate = (models =>{
    Novedades.belongsTo(models.User,{foreignKey: 'created_user_id' });

}); 



return Novedades
}