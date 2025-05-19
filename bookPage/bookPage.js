//Archivo que se encarga de las funcionalidades de la interfaz del restaurante en donde
//hacemos la reserva como escoger la hora el dia o el numero de persona

let peticion = {};

document.addEventListener("DOMContentLoaded", function () {
    fetch("../session/session.php")
        .then(response => response.json())
        .then(data => {
            if (data.status === "ko") {
                window.location.href = "../loginPage/loginPage.html";
                return;
            }
            console.log("Sesión iniciada como:", data.usuario);
            window.userId = data.usuario.id;
            cargarHTML();
        })
        .catch(error => {
            console.error("Error al verificar la sesión:", error);
        });
});

function cargarHTML() {
    let html = '';
    const restauranteId = new URLSearchParams(window.location.search).get('id');
    console.log("Restaurante ID:", restauranteId);
    html = `
<header>
    <h1 class="title" onclick="window.location.href='../mainPage/mainPage.html'">Spoon</h1>
    <nav class="topnav">
        <a href="../mainPage/mainPage.html">Home</a>
    </nav>
</header>

<section class="modalAlert">
    <div class="modalContainerAlert">
        <h2>SPOON</h2>
        <p></p>
    </div>
</section>

<div class="main-container">
    <section class="bookForm">
        <form>
            <h3 class="">Haz tu reserva en</h3>
            <label for="fechaReserva">Date</label>
            <input type="date" id="fechaReserva" name="fechaReserva" required/>
            <label for="horaReserva">Hora</label>
            <input type="time" id="horaReserva" name="horaReserva" required/>
            <label for="numPersonas">Número de Personas</label>
            <input type="number" id="numPersonas" name="numPersonas" required/>
            <button type="button" id="reservarBtn">Reservar</button>
        </form>
    </section>
</div>

<footer>
    <nav class="nav">
        <a href="../mainPage/mainPage.html" class="nav__link">
            <i class="material-icons nav__icon">home</i>
            <span class="material-symbols-outlined">Inicio</span>
        </a>
        <a href="../bookingPage/bookingPage.html" class="nav__link">
            <i class="material-icons nav__icon">book</i>
            <span class="material-symbols-outlined">Reservas</span>
        </a>
        <a href="../ProfilePage/profilePage.html" class="nav__link nav__link--active">
            <i class="material-icons nav__icon">person</i>
            <span class="material-symbols-outlined">Perfil</span>
        </a>
    </nav>
</footer>`;

    document.body.innerHTML = html;

    peticion.accion = 'selectRestauranteId';
    peticion.restauranteId = restauranteId;

    postData("reservas.php", {data: peticion})
        .then((response) => {
            console.log("Restaurante:", response[0].nombre);
            document.querySelector("h3").textContent = `Haz tu reserva en: ${response[0].nombre}`;
        })
        .catch(error => console.error("Error cargando restaurante:", error));

    document.getElementById('reservarBtn').addEventListener('click', function (event) {
        insertarReserva(event, restauranteId);
    });
}

function insertarReserva(event, restauranteId) {
    event.preventDefault();
    const fechaReserva = document.getElementById('fechaReserva').value;
    const horaReserva = document.getElementById('horaReserva').value;
    const numPersonas = document.getElementById('numPersonas').value;

    if (!fechaReserva || !horaReserva || !numPersonas) {
        mostrarModal("Por favor, complete todos los campos.");
        return;
    }

    if (!validarFechaReserva(fechaReserva)) {
        return
    }

    peticion.accion = 'insertReservaId';
    peticion.restauranteId = restauranteId;
    peticion.fechaReserva = fechaReserva;
    peticion.horaReserva = horaReserva;
    peticion.numPersonas = numPersonas;
    peticion.userId = window.userId;

    postData("reservas.php", {data: peticion})
        .then(() => {
            mostrarModal("Has realizado tu reserva con éxito");
            setTimeout(() => {
                window.location.href = "../ProfilePage/profilePage.html";
            }, 3000);
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
            mostrarModal("Error en la solicitud, intente más tarde.");
        });
}

function validarFechaReserva(fecha) {
    if (!fecha) {
        mostrarModal("Por favor, selecciona una fecha.");
    }
    const fechaSeleccionada = new Date(fecha);
    const dia = fechaSeleccionada.getUTCDay();
    if (dia === 1 || dia === 2) {
        mostrarModal("El bar está cerrado los lunes y martes.");
    }
}

function mostrarModal(mensaje) {
    const modal = document.querySelector(".modalAlert");
    const textModal = document.querySelector(".modalAlert p");

    textModal.innerHTML = mensaje;
    modal.classList.add("modalShow");

    setTimeout(() => {
        modal.classList.remove("modalShow")
    }, 3000);
}