const {connection} = require('../config/db.js');
const mysql = require('mysql');

// logear usuario
function loginUser(empleado, nombre, contrasena, callback) {

    // hacemos la consulta sql si por nombre
    const sql = 'SELECT * FROM users WHERE Username = ? AND Password = ?';
    const valuesIndex = [nombre, contrasena];

    // hacemos la consulta sql si por empleado
    const sqlEm = 'SELECT * FROM users WHERE UserTypeID = ? AND FullName = ? AND Password = ?';
    const valueIndex = [1, empleado, contrasena];

    // tomamos el usuario para ver si existe
    const usuario ='SELECT * FROM users WHERE Username = ?';
    const valueUser = [nombre];

    // valdidamos que ingrese un empelado o nombre de usuario
    if(!empleado && !nombre){
        console.log("ingrese un nombre o empelado");
    
    // si me da un empleado empezamos con las validaciones del usuario existente
    }else if(empleado){
        // valida si los campos estan vacidos
        if(!nombre || !contrasena){
            callback("llene todos los campos", null);
        }else {
            // validamos que el usuario exista
            connection.query(usuario, valueUser, (err, result)=>{
                if (err) {
                    callback("Error al consultar", null);
                } else {
                    if (result.length > 0) {
                        // si el usuario existe lo muesta por consola
                        console.log("el usuario existe", nombre);

                        // como existe el usuario validamos el empleado y la contra
                        connection.query(sqlEm, valueIndex, (err, result) => {
                            if (err) {
                                callback("Error al consultar", null);
                            } else {
                            // si el empleado y la contraseña estan bien me deja iniciar sesion
                                if (result.length > 0) {
                                    callback(null, true);
                                } else {
                                    callback("Nombre de empleado o contraseña incorrecta", null);
                                }
                            }
                        });

                    } else {
                        // si el usuario NO existe no se hace la consulta 
                        callback("El usuario NO existe", null);
                    }
                }
            })
        }
    }else{
        // si no me da un emeplado validamos solo un usuario y la contraseña
        if (!contrasena) {
            callback("inserte una contraseña", null);
        } else {

            // hacemos la consulta del usuario
            connection.query(sql, valuesIndex, (err, result) => {
            if (err) {
                callback("Error al consultar", null);
            } else {
                // si la contraseña y el usuario estan bien me inicia sesion
                if (result.length > 0) {
                    callback(null, true);
                } else {
                    callback("Usuario o contraseña incorrecta", null);
                }
            }
            });
        }
    }
}

// registrar el usuario
function registerUser(nombreRegister, nombreCompletoRegister, cumpleaRegister, contrasenaRegister, contrasenaRepetida, numeroPerRegister, gender, callback) {

    if (!nombreRegister || !nombreCompletoRegister || !cumpleaRegister || !contrasenaRegister || !contrasenaRepetida || !numeroPerRegister) {
        console.log("Ingrese todos los datos");
    } else{
        // conseguimos el id de la tabla user 
        connection.query('SELECT MAX(ID) AS maxID FROM users',(err,rows)=>{
            if (err) {
                callback("Error al registrar el usuario", null);
                console.log(err);
            }else{
                 // verificamos que las contraseñas sean las mismas
                 if(contrasenaRegister === contrasenaRepetida){
                    if(contrasenaRegister.length >= 5){
                        
                        // obtiene el valor máximo
                        let maxID = rows[0].maxID; 
                        if (maxID === null) {
                            // Si no hay registros, inicia en 0
                            maxID = 0; 
                        }
                        // Incrementa el ID
                        maxID++;

                        // Consultamos que el usuario no exista
                        connection.query('SELECT COUNT(*) AS count FROM users WHERE Username = ?', [nombreRegister], (err, result)=>{
                            if(err){
                                callback("Error al registrar el usuario", null);
                                console.log(err);
                            }else{
                                if(result[0].count > 0){
                                    callback("El usuario ya existe en la base de datos", nombreRegister)
                                }else{
                                    // hacemos la conexion sql para registrar los datos
                                    const sqlRegis = 'INSERT INTO users (ID, UserTypeID, Username, FullName, Gender, BirthDate, Password, FamilyCount) VALUES (?, ?, ?, ?, ?, ?, ? , ?)';
                                    
                                    // validamos los datos
                                    const valuesRegis = [maxID, 2, nombreRegister, nombreCompletoRegister, gender ,cumpleaRegister,contrasenaRegister, numeroPerRegister];
                                    
                                    // registramos los datos
                                    connection.query(sqlRegis, valuesRegis, (err, result) => {
                                        if (err) {
                                            callback("Error al registrar el usuario", null);
                                            console.log(err);
                                        } else {
                                            callback(null, true);
                                        }
                                    });
                                }
                            }
                        });
                    }else{
                        // si la contraseña no son 5 o mas de 5 caracteres no deja registrar
                        console.log("ingrese una contraseña valida, que tenga al menos 5 carateres")
                    }
                }else{
                    // si las contraseñas no son las mismas no me deja registrar
                    callback("las contraseñas no coinciden", null)
                }
            }
        });
    }
}


function Select(callback ) {
    connection.query('SELECT Title, Capacity, AreaID, ItemTypeID FROM items', (error, result)=>{
        if(error){
            callback(error)
        }else{
            const titulos = result.map(item => item.Title);
            const capacidad = result.map(item => item.Capacity);
            const id_area = result.map(item => item.AreaID);
            const tipo_item = result.map(item => item.ItemTypeID);

            const datos ={
                Title :titulos,
                Capacidad :capacidad,
                Area :id_area,
                Item :tipo_item
            }
            callback(null, datos);
        }
    })
}


// exportamos las funciones creadas
module.exports = {
  loginUser,
  registerUser, 
  Select,
};