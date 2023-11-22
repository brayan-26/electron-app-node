const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: '', 
    database: 'session1' 
});

// iniciamos la conexion
connection.connect((err)=>{
    if(err){
        console.log("Error al conectar a la base de datos", err);
    }else{
        console.log("Conexion a la base de datos exitosa");
    }
});

// exportamos la conexion
module.exports ={
    connection
}