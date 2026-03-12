function init() {
  const idImovel = new URLSearchParams(window.location.search).get("id");
  const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];
  const imovel = imoveis.find((i) => i.id === parseInt(idImovel));

  if (!imovel) {
    const body = document.querySelector("body");
    const p = document.createElement("p");
    p.textContent = "Imóvel não encontrado.";
    body.appendChild(p);
    return;
  }

  const detalheImovel = document.querySelector("#detalhe-imovel");
  const img = document.createElement("img");
  img.src = imovel.fotos[0];
  img.addEventListener("error", function () {
    img.src = "https://placehold.co/400x200?text=Sem+Foto";
  });
  detalheImovel.appendChild(img);

  const tag = document.createElement("span");
  tag.classList.add(
    imovel.venda_aluguel === "venda" ? "tag-venda" : "tag-aluguel",
  );
  tag.textContent = imovel.venda_aluguel === "venda" ? "VENDA" : "ALUGUEL";
  detalheImovel.appendChild(tag);

  const titulo = document.createElement("h3");
  detalheImovel.appendChild(titulo);
  titulo.textContent = imovel.titulo;

  const descricao = document.createElement("p");
  descricao.classList.add("descricao");
  detalheImovel.appendChild(descricao);
  descricao.textContent = imovel.descricao;

  const tipo = document.createElement("p");
  tipo.classList.add("tipo");
  detalheImovel.appendChild(tipo);
  tipo.textContent = imovel.tipo.charAt(0).toUpperCase() + imovel.tipo.slice(1);

  const finalidade = document.createElement("p");
  finalidade.classList.add("finalidade");
  detalheImovel.appendChild(finalidade);
  finalidade.textContent = imovel.finalidade;

  const localizacao = document.createElement("p");
  localizacao.classList.add("localizacao");
  detalheImovel.appendChild(localizacao);
  localizacao.textContent = imovel.localizacao;

  const quartos = document.createElement("p");
  quartos.classList.add("quartos");
  detalheImovel.appendChild(quartos);
  quartos.textContent = `${imovel.quartos} quartos`;

  const area = document.createElement("p");
  area.classList.add("area");
  detalheImovel.appendChild(area);
  area.textContent = `${imovel.area} m²`;

  const valor = document.createElement("p");
  valor.classList.add("valor");
  detalheImovel.appendChild(valor);
  valor.textContent = imovel.valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const dataCadastro = document.createElement("p");
  dataCadastro.classList.add("data-cadastro");
  detalheImovel.appendChild(dataCadastro);
  dataCadastro.textContent = new Date(imovel.created_at).toLocaleDateString(
    "pt-BR",
  );

  if (imovel.mapa) {
    const iframe = document.createElement("iframe");
    iframe.src = imovel.mapa;
    detalheImovel.appendChild(iframe);
  }
}

init(); 
