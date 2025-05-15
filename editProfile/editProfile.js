document.getElementById("updateForm").addEventListener("submit", actualizarPerfil);

function actualizarPerfil(event) {
    event.preventDefault();

    const formData = new FormData();
    const profileImage = document.getElementById("profileImage").files[0];
    const bannerImage = document.getElementById("bannerImage").files[0];

    formData.append("accion", "update");
    formData.append("user", document.getElementById("upUser").value.trim());
    formData.append("password", document.getElementById("upPass").value.trim());
    formData.append("birthdate", document.getElementById("upBirthdate").value.trim());

    if (profileImage) formData.append("profileImage", profileImage);
    if (bannerImage) formData.append("bannerImage", bannerImage);

    console.log(profileImage)
    console.log(bannerImage)

    fetch("editProfile.php", {
        method: "POST",
        body: formData,
    })
        .then(res => res.json())
        .then(response => {
            if (response.error) {
                alert(response.error);
            } else {
                alert("Perfil actualizado correctamente");
            }
        })
        .catch(error => console.error("Error:", error));
}