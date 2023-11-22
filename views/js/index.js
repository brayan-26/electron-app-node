// guardamos los elementos en variables (index.html)
const form = document.getElementById('form');
const empleadoForm = document.getElementById('employee');
const nombreForm = document.getElementById('name');
const contraseñaForm = document.getElementById('password');
const mostrarPassForm = document.getElementById('mostrarPass'); 
const salirSession = document.getElementById('exitSession');

// tomamos los datos con el .value del formulario
form.addEventListener('submit', (e)=>{
    e.preventDefault()

    // llamamos los elementos del form
    const empleado = empleadoForm.value;
    const nombre = nombreForm.value;
    const contraseña = contraseñaForm.value;

    // guardamos los datos en un objecto
    const datos ={
        empleado: empleado,
        nombre: nombre, 
        contrasena: contraseña
    }
    console.log(datos);

    // exportamos los datos 
    window.renderDatosLogin.sendVariableToMain(datos); 
}); 

// mostramos la contraseña checkbox
mostrarPassForm.addEventListener("change", ()=>{
    
    // si el checkbox esta marcado muestre la contraseña
    if (mostrarPassForm.checked){
        contraseñaForm.type = "text";
    }
    else {
        contraseñaForm.type = "password";
    }
});

// salimos de la app
salirSession.addEventListener('click', () => {
    const salir = {
        exit: 1,
    };

    console.log(salir);
    window.renderExit.sendVariableToMain(salir); 
});
