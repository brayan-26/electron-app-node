const { app, BrowserWindow , ipcMain} = require('electron');
const path = require('node:path');
const {connection} = require('./config/db.js');
const mysql = require('mysql');
const { loginUser, registerUser, Select } = require('./controller/consults.js');
const { error } = require('node:console');

// Se reinicia la pagian automaticamente
require('electron-reload')(__dirname); 

// creamos la ventana (ancho y alto)
let win;
function createWindow () {
  const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        // leemos el objecto de (index.js)
         preload: path.join(__dirname, 'preload.js'),
      }
  });
  //leemos el (index.html) y lo mostramos
  win.loadFile('./views/index.html');
};

// cuando inicie el npm start app creamos la ventana
app.whenReady().then(() => {
  createWindow();

  // Activar la aplicación cuando no hay ventanas disponibles debería abrir una nueva.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// Se cierra correctamente las ventana
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// cerramos la session
ipcMain.on('exitApp', (event, data)=>{
    const {exit} = data;
    if(exit === 1){
      if (process.platform !== 'darwin') {
        app.quit()
      }
    }
});

// requerimos los datos de (index.js)
ipcMain.on('login-user', (event, data) => {
  // cogemos nombre y contraseña de data y las guardamos
  const {empleado,  nombre, contrasena } = data;

  // usuamos la funcion loginUser para logear al usuario
  loginUser(empleado, nombre, contrasena, (error, success) => {
    if (error) {
      console.log(error);
    } 
    else if (success) {
      console.log("Inicio de sesión exitoso");
      // renderizamos a (incio.html)
      const win = BrowserWindow.getFocusedWindow();
      win.loadFile('./views/inicio.html');
    }
  });
});

// requerimos los datos de (register.js)
ipcMain.on('register-user', (event, data) => {

  // asignamos los datos a guardar
  const {nombreRegister, nombreCompletoRegister, cumpleaRegister, contrasenaRegister, contrasenaRepetida, numeroPerRegister , gender} = data;

  // usuamos la funcion registerUser para registrar al usuario
  registerUser(nombreRegister, nombreCompletoRegister, cumpleaRegister, contrasenaRegister, contrasenaRepetida, numeroPerRegister , gender,   (error, success)=>{
    
    if(error){
      console.log(error);
    }else if(success){
      console.log("registro exitoso");
      const win = BrowserWindow.getFocusedWindow();
      win.loadFile('./views/inicio.html');
    }
  })
});