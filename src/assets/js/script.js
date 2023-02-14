const form = document.querySelector("form");
const player = document.querySelector("#player");
const mensagem = document.querySelector("#mensagem");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const text = document.querySelector("#palavra").value;
    const voice = document.querySelector("#idioma").value;

    mensagem.textContent = "Carregando...";
    player.innerHTML = "";

    try {
        const response = await fetch("https://api.soundoftext.com/sounds", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                engine: "Google",
                data: {
                    text,
                    voice,
                },
            }),
        });
        const data = await response.json();
        const soundId = data.id;

        const result = await fetch(`https://api.soundoftext.com/sounds/${soundId}`);
        const resultJson = await result.json();

        if (resultJson.status === "Done") {
            const audio = new Audio(resultJson.location);
            player.innerHTML = `<audio id="audioplayer" controls autoplay src="${resultJson.location}"></audio>`;
            mensagem.textContent = "";
        } else {
            mensagem.textContent = "Erro: Envie novamente";
        }
    } catch (error) {
        mensagem.textContent = "Erro: Envie novamente";
    }
});