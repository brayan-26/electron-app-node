// guardamos los elementos en variables (index.html)
const formRegister = document.getElementById('formRegis');
const nombreFormRegister = document.getElementById('nameRegister');
const nombreCompleRegister = document.getElementById('fullNameRegister');
const cumpleañosRegister = document.getElementById('birthdayRegister');
const contraseñaFormRegister = document.getElementById('passwordResgister');
const verificarContraseña = document.getElementById('repitePassword');
const numeroRegister = document.getElementById('numberRegister');
const botonRegister = document.getElementById('submit');

// terminos y condiciones
const verTerminosCondiciones = document.getElementById('verTerminos');
const cerrarTerminosCondiciones = document.getElementById('cerrarTerminos');
const containerTerminos = document.getElementById('terminos');
const aceptoTer = document.getElementById('aceptarTerminos');


// tomamos los datos con el .value del formulario
formRegister.addEventListener('submit', (e)=>{
    e.preventDefault()

    // llamamos los elementos del form
    const nombreRegister = nombreFormRegister.value;
    const nombreCompletoRegister = nombreCompleRegister.value;
    const cumpleaRegister = cumpleañosRegister.value;
    const contraseñaRegister = contraseñaFormRegister.value;
    const contraseñaRepetida = verificarContraseña.value;
    const numeroPerRegister = numeroRegister.value; 
    const generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;
    
    // guardamos los datos en un objecto
    const datosRegister ={
        nombreRegister: nombreRegister, 
        nombreCompletoRegister : nombreCompletoRegister,
        cumpleaRegister : cumpleaRegister,
        contrasenaRegister: contraseñaRegister, 
        contrasenaRepetida: contraseñaRepetida,
        numeroPerRegister : numeroPerRegister,
        gender : generoSeleccionado
    }
    console.log(datosRegister);

    // exportamos los datos 
    window.renderDatosRegister.sendVariableToMain(datosRegister); 
}); 

// mostramos los terminos
function abrir() {
    containerTerminos.style.display = 'block';
}
// Función para cerrar los términos
function cerrar() {
    containerTerminos.style.display = 'none';
}
// ponemos el boton de acetar terminso en visible
verTerminosCondiciones.addEventListener('click', ()=>{
    aceptoTer.disabled = false; 
});
// cuando acepte los terminos lo deje registrar
aceptoTer.addEventListener('change', ()=>{
    if(aceptoTer.checked){
        botonRegister.disabled = false; 
    }else{
        botonRegister.disabled = true; 
    }
});
