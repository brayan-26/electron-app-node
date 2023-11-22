const cerrarSession = document.getElementById('closedSession');
const salirSession = document.getElementById('exitSession');

const ventanaTravel = document.getElementById('ventanaTravel');
const ventanaOwner = document.getElementById('ventanaOwner');

const containerPrueba = document.getElementById('containerprueba');

// cerramos la session 
cerrarSession.addEventListener('click', ()=>{
    // eliminamos el token de autenticacion
    localStorage.removeItem('token');

    // renderizamos index
    window.location.href = 'index.html';
});

// salir de la app
salirSession.addEventListener('click', () => {
    const salir = {
        exit: 1,
    };

    console.log(salir);
    window.renderExit.sendVariableToMain(salir); 
});

// creamos las ventanas para navegar
function abrirTravel() {
    ventanaTravel.style.display = "block";
    ventanaOwner.style.display = "none";
}

function abrirOwner() {
    ventanaOwner.style.display = "block";
    ventanaTravel.style.display = "none";
}


  