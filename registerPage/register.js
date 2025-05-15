let peticion = {};

document.getElementById("btnReservar").addEventListener("click", registro);

function registro(event) {
    event.preventDefault();
    const registroUser = document.getElementById("regUser").value.trim();
    const registroEmail = document.getElementById("regEmail").value.trim();
    const registroBirthdate = document.getElementById("regBirthdate").value.trim();
    const registroPassword = document.getElementById("regPass").value.trim();
    const registroPasswordConf = document.getElementById("regPassConf").value.trim();

    if (!registroEmail || !registroPassword || !registroPasswordConf || !registroUser || !registroBirthdate) {
        alert("Rellene todos los campos");
        return;
    }
    if (registroPassword !== registroPasswordConf) {
        alert("Las contraseñas no coinciden");
        return;
    }
    peticion.user = registroUser;
    peticion.email = registroEmail;
    peticion.password = registroPassword;
    peticion.birthdate = registroBirthdate;

    postData("registro.php", {data: peticion})
        .then((response) => {
            if (response) {
                mostrarModal("Te has registrado con éxito.");
                setTimeout(() => {
                    window.location.href = "../ProfilePage/profilePage.html";
                }, 3000);
            } else {
                mostrarModal("Credenciales inválidas");
                setTimeout(() => {
                    window.location.href = "../registerPage/registerPage.html";
                }, 3000);
            }
        })
        .catch((error) => {
            console.error("Error en la solicitud:", error);
            mostrarModal("Error en la solicitud, intente más tarde.");
        });
}

function mostrarModal(mensaje) {
    const modal = document.querySelector(".modal");
    const textModal = document.querySelector(".modal p");

    textModal.innerHTML = mensaje;
    modal.classList.add("modalShow");
}