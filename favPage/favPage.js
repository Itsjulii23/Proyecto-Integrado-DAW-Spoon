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
            selectRestaurantesFav(window.userId);
        })
        .catch(error => {
            console.error("Error al verificar la sesión:", error);
            window.location.href = "../loginPage/loginPage.html";
        });
});

function selectRestaurantesFav(userId) {
    peticion.accion = 'selectRestaurantesFav';
    peticion.userId = userId;

    postData("favPage.php", {data: peticion})
        .then(restaurantes => {
            let html = `

    <section class="modalAlert">
        <div class="modalContainerAlert">
            <h2>SPOON</h2>
            <p></p>
        </div>
    </section>

<header>
    <h1 class="title" onclick="window.location.href='../mainPage/mainPage.html'">Spoon</h1>
    <nav class="topnav">
        <a href="../mainPage/mainPage.html">Home</a>
        <a id="loginLink" href="../loginPage/loginPage.html" style="display: none;">Login</a>
        <a id="signupLink" href="../registerPage/registerPage.html" style="display: none;">Sign Up</a>
    </nav>
</header>

<h2>Restaurantes Guardados</h2>
<section id="restaurantes">
`;
            restaurantes.forEach(restaurantes => {
                const imgSrc = `${restaurantes.img}`;
                html += `
<div class="restaurante">
    <h3>${restaurantes.nombre}</h3>
    <p>${restaurantes.descripcion}</p>
    <img class="restauranteImg" src="../${imgSrc}" alt="Restaurante">
        <button onclick="window.location.href='../bookPage/bookPage.html?id=${restaurantes.id}'">Reservar</button>
        <button class="viewReviewBtn" data-id="${restaurantes.id}">Ver Reseñas</button>
        <button onclick="window.location.href='../reviewsPage/reviewPage.html?id=${restaurantes.id}'">Hacer Reseña</button>
        <button class="eliminarGuardado" id="${restaurantes.id}">Eliminar de Favoritos</button>
</div>
            `;
            });
            html += `
</section>

<footer>
    <nav class="nav">
        <a href="../mainPage/mainPage.html" class="nav__link">
            <i class="material-icons nav__icon">home</i>
            <span class="material-symbols-outlined">Inicio</span>
        </a>
        <a href="../bookingPage/bookingPage.html" class="nav__link nav__link--active">
            <i class="material-icons nav__icon">book</i>
            <span class="material-symbols-outlined">Reservas</span>
        </a>
        <a href="../ProfilePage/profilePage.html" class="nav__link">
            <i class="material-icons nav__icon">person</i>
            <span class="material-symbols-outlined">Perfil</span>
        </a>
    </nav>
</footer>
        `;
            document.body.innerHTML = html;

            document.getElementById("restaurantes").addEventListener("click", function (event) {
                if (event.target.classList.contains("eliminarGuardado")) {
                    event.preventDefault();
                    const idRestauranteFav = event.target.id;
                    console.log(idRestauranteFav)
                    deleteRestauranteFav(idRestauranteFav);
                }
            });
        })
        .catch(error => {
            console.error("Error al cargar reservas:", error);
        });
}

function deleteRestauranteFav(idRestauranteFav) {
    peticion.accion = "deleteRestauranteFav";
    peticion.idRestauranteFav = idRestauranteFav;
    console.log(idRestauranteFav);
    postData("favPage.php", {data: peticion})
        .then(() => {
            mostrarModal("Restaurante favorito eliminado con éxito.");
            setTimeout(() => {
                window.location.href = "../favPage/favPage.html";
            }, 3000);
        })
        .catch(error => {
            mostrarModal("Error eliminando restaurante favorito:");
        });
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