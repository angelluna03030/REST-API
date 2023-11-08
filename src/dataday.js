const mysql =require("mysql");

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'multimediadb'
    }
)
if(mysqlConnection){
    console.log("conexion exitosa");
}else{
    console.log("Error en la conecion ")
}

module.exports = mysqlConnection;