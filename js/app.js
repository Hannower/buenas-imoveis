    const formulario = document.querySelector('#form-cadastro');

    let imoveis = JSON.parse(localStorage.getItem('imoveis')) || [];

    let id = parseInt(localStorage.getItem('proximoId')) || 1

    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

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
            fotos: formulario.fotos.value.split(",").map(url => url.trim()),
            status: formulario.status.checked,
            created_at: new Date().toISOString()
        }

        imoveis.push(imovel);
        localStorage.setItem('imoveis', JSON.stringify(imoveis));

        id++;
        localStorage.setItem('proximoId', id)

        formulario.reset();

    })

