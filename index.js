// Evento para detectar la tecla Enter
document.getElementById("searchInput").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchGithub(); // Llama a la función de búsqueda
    }
});

// Función de búsqueda del usuario
const searchGithub = async () => {
    const username = document.getElementById("searchInput").value;
    if (!username.trim()) {
        alert("Por favor ingresa un nombre de usuario válido.");
        return;
    }

    // API para encontrar el usuario de GitHub
    const response = await fetch(`https://api.github.com/users/${username}`);
    const detailsContainer = document.querySelector(".details");
    const data = await response.json();

    if (response.ok) {
        detailsContainer.style.display = "flex";
        document.getElementById("result").innerHTML = `
         <div class="profile">
                <div class="profile-image">
                    <img src="${data.avatar_url}" />
                </div>
                <div class="profile-details">
                    <h2 class="name">${data.name || data.login}</h2>
                    <p class="username">@${data.login}</p>
                    <p class="bio">${data.bio || 'Esta cuenta no tiene una biografía.'}</p>

                    <div class="stats">
                        <div>
                            <div class="stats-name">Repositorios Públicos</div>
                            <div class="stats-value">${data.public_repos}</div>
                        </div>
                        <div>
                            <div class="stats-name">Seguidores</div>
                            <div class="stats-value">${data.followers}</div>
                        </div>
                        <div>
                            <div class="stats-name">Seguidos</div>
                            <div class="stats-value">${data.following}</div>
                        </div>
                    </div>

                <div class="media">
                    <p>
                        <span class="media-value">${data.location || 'No disponible'}</span>
                    </p>
                    <p>
                        <span class="media-value">${data.blog || 'No disponible'}</span>
                    </p>
                    <p>
                        <span class="media-value">${data.twitter_username || 'No disponible'}</span>
                    </p>
                    <p>
                        <span class="media-value">${data.company || 'No disponible'}</span>
                    </p>
                </div>
                <a href="${data.html_url}" target="_blank" class="view-profile">Ver perfil en GitHub</a>
            </div>
        </div>
        `;
    } else {
        alert(data.message);
    }
};