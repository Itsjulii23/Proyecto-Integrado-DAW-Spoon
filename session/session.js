document.addEventListener("DOMContentLoaded", function () {
    fetch("../session/session.php")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.status === "ok") {
                window.userId = data.usuario.id;
            } else {
                console.warn("No has iniciado sesión.");
            }
        })
        .catch(error => console.error("Error al obtener sesión:", error));
});