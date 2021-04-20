module.exports = (sequelize, dataTypes) =>{

    const User = sequelize.define('User',{
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.STRING,
        image: dataTypes.STRING,
        tipe: dataTypes.STRING,
    },{
        underscored: true,
        timestamps: true
    });
    /*User.associate = models =>{
        User.belongsToMany(models.Product, {
            through: 'users_products',
        });
    };*/


    return User

}
