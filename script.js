const temas = []; // Array para armazenar os temas
const listaTemas = document.querySelector(".temas");
const filtroTema = document.querySelector("#filtro-tema");
const btnNovoTema = document.querySelector("#btn-novo-tema");
const modalEdicaoTema = document.querySelector("#modal-edicao-tema");
const formEdicaoTema = document.querySelector("#form-edicao-tema");

function buscarTemas() {
  const temasMock = [
    {
      id: 1,
      name: "Tema Azul",
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
        success: "#28a745",
        danger: "#dc3545",
        warning: "#ffc107",
      },
    },
    {
      id: 2,
      name: "Tema Verde",
      colors: {
        primary: "#28a745",
        secondary: "#6c757d",
        success: "#218838",
        danger: "#c82333",
        warning: "#ffc107",
      },
    },
  ];
  temas.push(...temasMock);
  renderizarTemas();
}

function renderizarTemas() {
    listaTemas.innerHTML = "";
    const temasFiltrados = temas.filter((tema) =>
        tema.name.toLowerCase().includes(filtroTema.value.toLowerCase())
    );
    temasFiltrados.forEach((tema) => {
        if (!tema) return;
        const itemTema = document.createElement("li");
        itemTema.classList.add("tema");
        itemTema.dataset.id = tema.id;
        const miniatura = document.createElement("div");
        miniatura.classList.add("miniatura");
        miniatura.style.backgroundColor = tema.colors?.primary;
        itemTema.appendChild(miniatura);
        const nome = document.createElement("span");
        nome.classList.add("nome");
        nome.textContent = tema.name;
        itemTema.appendChild(nome);
        const btnEditar = document.createElement("button");
        btnEditar.classList.add("editar");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => abrirModalEdicao(tema));
        itemTema.appendChild(btnEditar);
        const btnAplicar = document.createElement("button");
        btnAplicar.classList.add("aplicar");
        btnAplicar.textContent = "Aplicar";
        btnAplicar.addEventListener("click", () => aplicarTema(tema));
        itemTema.appendChild(btnAplicar);
        const btnRemover = document.createElement("button");
        btnRemover.classList.add("remover");
        btnRemover.textContent = "Remover";
        btnRemover.addEventListener("click", () => removerTema(tema.id));
        itemTema.appendChild(btnRemover);
        listaTemas.appendChild(itemTema);
    });
}

function abrirModalEdicao(tema = null) {
    modalEdicaoTema.style.display = "flex";

    if (tema) {
        formEdicaoTema.elements["id"].value = tema.id;
        formEdicaoTema.elements["name"].value = tema.name;
        const colors = tema.colors;
        for (const cor in colors) {
            if (formEdicaoTema.elements[cor]) {
                formEdicaoTema.elements[cor].value = colors[cor];
            }
        }
    } else {
        formEdicaoTema.reset();
    }
}

function fecharModalEdicao() {
  modalEdicaoTema.style.display = "none";
}

function aplicarTema(tema) {
    const body = document.querySelector("body");
    body.style.backgroundColor = tema.colors?.primary;
    body.style.color = tema.colors?.secondary;
}

function removerTema(id) {
  const index = temas.findIndex((tema) => tema.id === id);
  if (index !== -1) {
    temas.splice(index, 1);
    renderizarTemas();
  }
}

function salvarTema(event) {
  event.preventDefault();
  const { id, name, ...colors } = Object.fromEntries(
    new FormData(formEdicaoTema)
  );

  if (!name || Object.values(colors).some((cor) => !cor)) {
    alert("Preencha todos os campos obrigatórios!");
    return;
  }

  const tema = {
    id: parseInt(id) || Math.max(...temas.map((t) => t.id)) + 1,
    name,
    colors,
  };

  if (id) {
    const index = temas.findIndex((t) => t.id === tema.id);
    temas[index] = tema;
  } else {
    temas.push(tema);
  }

  renderizarTemas();
  fecharModalEdicao();
}

buscarTemas();

filtroTema.addEventListener("keyup", renderizarTemas);

btnNovoTema.addEventListener("click", () => abrirModalEdicao());

listaTemas.addEventListener("click", (event) => {
  const item = event.target.closest(".tema");
  if (item) {
    const id = parseInt(item.dataset.id);
    const tema = temas.find((t) => t.id === id);
  }
});

formEdicaoTema.addEventListener("submit", salvarTema);

function removerTema(id) {
    const index = temas.findIndex((tema) => tema.id === id);
    if (index !== -1) {
        temas.splice(index, 1);
        renderizarTemas();
    }
}
