const formulario = document.querySelector("#form-cadastro");

let imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

let id = parseInt(localStorage.getItem("proximoId")) || 1;

formulario.addEventListener("submit", function (e) {
  e.preventDefault();

  imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

  const imovel = {
    id: id,
    titulo: formulario.titulo.value,
    descricao: formulario.descricao.value,
    valor: Number(formulario.valor.value),
    area: Number(formulario.area.value),
    quartos: Number(formulario.quartos.value),
    tipo: formulario.tipo.value,
    localizacao: formulario.localizacao.value,
    mapa: formulario.mapa.value,
    venda_aluguel: formulario.venda_aluguel.value,
    finalidade: formulario.finalidade.value,
    fotos: formulario.fotos.value.split(",").map((url) => url.trim()),
    status: formulario.status.checked,
    created_at: new Date().toISOString(),
  };

  imoveis.push(imovel);
  localStorage.setItem("imoveis", JSON.stringify(imoveis));

  id++;
  localStorage.setItem("proximoId", id);

  formulario.reset();

  renderizar();
});

function renderizar() {
  imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

  const listagem = document.querySelector("#listagem");

  if (imoveis.length === 0) {
    listagem.textContent = "Nenhum imóvel disponível";
    return;
  }

  listagem.innerHTML = "";

  imoveis.forEach((imovel) => {
    if (!imovel.status) return;

    const card = document.createElement("div");
    card.classList.add("card");
    listagem.appendChild(card);

    const img = document.createElement("img");
    card.appendChild(img);
    img.src = imovel.fotos[0];
    img.addEventListener("error", function () {
      img.src = "https://placehold.co/400x200?text=Sem+Foto";
    });

    const tag = document.createElement("span");
    tag.classList.add(
      imovel.venda_aluguel === "venda" ? "tag-venda" : "tag-aluguel",
    );
    tag.textContent = imovel.venda_aluguel === "venda" ? "VENDA" : "ALUGUEL";
    card.appendChild(tag);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("card-info");
    card.appendChild(cardInfo);

    const titulo = document.createElement("h3");
    cardInfo.appendChild(titulo);
    titulo.textContent = imovel.titulo;

    const descricao = document.createElement("p");
    descricao.classList.add("descricao");
    cardInfo.appendChild(descricao);
    descricao.textContent = imovel.descricao;

    const tipo = document.createElement("p");
    tipo.classList.add("tipo");
    cardInfo.appendChild(tipo);
    tipo.textContent =
      imovel.tipo.charAt(0).toUpperCase() + imovel.tipo.slice(1);

    const localizacao = document.createElement("p");
    localizacao.classList.add("localizacao");
    cardInfo.appendChild(localizacao);
    localizacao.textContent = imovel.localizacao;

    const quartos = document.createElement("p");
    quartos.classList.add("quartos");
    cardInfo.appendChild(quartos);
    quartos.textContent = `${imovel.quartos} quartos, 📐 ${imovel.area} m²`;

    const valor = document.createElement("p");
    valor.classList.add("valor");
    cardInfo.appendChild(valor);
    valor.textContent = imovel.valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const cardBotoes = document.createElement("div");
    cardBotoes.classList.add("card-botoes");
    card.appendChild(cardBotoes);

    const btnDetails = document.createElement("button");
    btnDetails.classList.add("btn-details");
    btnDetails.textContent = "Detalhes";
    cardBotoes.appendChild(btnDetails);

    const btnEditar = document.createElement("button");
    btnEditar.classList.add("btn-editar");
    btnEditar.textContent = "Editar";
    cardBotoes.appendChild(btnEditar);

    const btnExcluir = document.createElement("button");
    btnExcluir.classList.add("btn-excluir");
    btnExcluir.textContent = "Excluir";
    cardBotoes.appendChild(btnExcluir);

    btnDetails.addEventListener("click", function () {
      window.open(`imovel.html?id=${imovel.id}`);
    });

    btnExcluir.addEventListener("click", function () {
      const confirmacao = confirm("Deseja excluir este imóvel?");

      if (confirmacao) {
        const indice = imoveis.findIndex((i) => i.id === imovel.id);
        imoveis.splice(indice, 1);
        localStorage.setItem("imoveis", JSON.stringify(imoveis));
        renderizar();
      }
    });

    btnEditar.addEventListener("click", function () {
      const modal = document.querySelector("#modal-edicao");
      modal.showModal();
      modal.dataset.id = imovel.id;

      const formEdicao = document.querySelector("#form-edicao");
      formEdicao.titulo.value = imovel.titulo;
      formEdicao.descricao.value = imovel.descricao;
      formEdicao.valor.value = imovel.valor;
      formEdicao.area.value = imovel.area;
      formEdicao.quartos.value = imovel.quartos;
      formEdicao.tipo.value = imovel.tipo;
      formEdicao.localizacao.value = imovel.localizacao;
      formEdicao.mapa.value = imovel.mapa;
      formEdicao.venda_aluguel.value = imovel.venda_aluguel;
      formEdicao.finalidade.value = imovel.finalidade;
      formEdicao.fotos.value = imovel.fotos.join(", ");
      formEdicao.status.checked = imovel.status;
    });
  });
}

renderizar();

const formEdicao = document.querySelector("#form-edicao");
const modal = document.querySelector("#modal-edicao");

formEdicao.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = parseInt(modal.dataset.id);
  const indice = imoveis.findIndex((i) => i.id === id);

  imoveis[indice].titulo = formEdicao.titulo.value;
  imoveis[indice].descricao = formEdicao.descricao.value;
  imoveis[indice].valor = Number(formEdicao.valor.value);
  imoveis[indice].area = Number(formEdicao.area.value);
  imoveis[indice].quartos = Number(formEdicao.quartos.value);
  imoveis[indice].tipo = formEdicao.tipo.value;
  imoveis[indice].localizacao = formEdicao.localizacao.value;
  imoveis[indice].mapa = formEdicao.mapa.value;
  imoveis[indice].venda_aluguel = formEdicao.venda_aluguel.value;
  imoveis[indice].finalidade = formEdicao.finalidade.value;
  imoveis[indice].fotos = formEdicao.fotos.value
    .split(",")
    .map((url) => url.trim());
  imoveis[indice].status = formEdicao.status.checked;

  localStorage.setItem("imoveis", JSON.stringify(imoveis));

  renderizar();
  
  modal.close();
});

const btnCancelar = document.querySelector(".btn-cancelar");

btnCancelar.addEventListener("click", function () {
  modal.close();
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.close();
    }
});
