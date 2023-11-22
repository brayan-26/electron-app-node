const { contextBridge, ipcRenderer } = require('electron');

// exportamos los datos de (index.html) para usarlos en (app.js)  
contextBridge.exposeInMainWorld('renderDatosLogin', {
    sendVariableToMain:(datos)=>{
        ipcRenderer.send('login-user', datos)
    }
})

// exportamos los datos de (register.html) para usarlos en (app.js)  
contextBridge.exposeInMainWorld('renderDatosRegister', {
    sendVariableToMain:(datosRegister)=>{
        ipcRenderer.send('register-user', datosRegister)
    }
})

// cerramos la session
contextBridge.exposeInMainWorld('renderExit', {
    sendVariableToMain:(salir)=>{
        ipcRenderer.send('exitApp', salir)
    }
})

  