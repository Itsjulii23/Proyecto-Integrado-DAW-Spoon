//Archivo que se dedica a las funcionalidades de mi interfaz de la edicion del perfil de usuario
//asi como poder cambiar la foto de perfil la del banner el nombre de usuario o la contraseña.

document.addEventListener("DOMContentLoaded", () => {
    let originalUser = "";
    let profileImage = null;
    let bannerImage = null;

    const userInput = document.getElementById("upUser");
    const passInput = document.getElementById("upPass");
    const profileInput = document.getElementById("profileImage");
    const bannerInput = document.getElementById("bannerImage");
    const form = document.getElementById("updateForm");

    fetch("../session/session.php")
        .then(response => response.json())
        .then(data => {
            originalUser = data.usuario.user;
            userInput.value = originalUser;
        });

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const currentUser = userInput.value.trim();
        const currentPass = passInput.value.trim();
        profileImage = profileInput.files[0];
        bannerImage = bannerInput.files[0];

        if (
            currentUser === originalUser &&
            currentPass === "" &&
            !profileImage &&
            !bannerImage
        ) {
            mostrarModal("No se ha realizado ningún cambio.");
            return;
        }
        const formData = new FormData();
        formData.append("userId", window.userId);
        formData.append("upUser", currentUser);
        if (currentPass !== "") formData.append("upPass", currentPass);
        if (profileImage) formData.append("profileImage", profileImage);
        if (bannerImage) formData.append("bannerImage", bannerImage);

        fetch("editProfile.php", {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    mostrarModal("Perfil actualizado correctamente.");
                    setTimeout(() => {
                        window.location.href = "../ProfilePage/profilePage.html";
                    }, 3000);
                } else {
                    mostrarModal("Hubo un error al actualizar.");
                }
            })
            .catch(err => {
                console.error("Error en la actualización:", err);
                mostrarModal("Error en la solicitud.");
            });
    });
});

function mostrarModal(mensaje) {
    const modal = document.querySelector(".modalAlert");
    const textModal = document.querySelector(".modalAlert p");
    textModal.innerHTML = mensaje;
    modal.classList.add("modalShow");

    setTimeout(() => {
        modal.classList.remove("modalShow")
    }, 3000);
}