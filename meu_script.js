javascript:(function() {
    // ===== Configurações =====
    function calcularDistancia(coord1, coord2) {
        const [x1, y1] = coord1;
        const [x2, y2] = coord2;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    const raioMaximo = parseFloat(prompt('Insira o número máximo de campos:', '15'));
    if (isNaN(raioMaximo) || raioMaximo <= 0) {
        alert('Por favor, insira um valor válido para o número máximo de campos.');
        return;
    }

    // ===== Obter coordenadas da aldeia atual =====
    const coordenadasBaseTexto = document.querySelector('#menu_row2 b')?.textContent.match(/\d+\|\d+/);
    if (!coordenadasBaseTexto) {
        alert('Não foi possível obter as coordenadas da aldeia atual.');
        return;
    }
    const coordenadasBase = coordenadasBaseTexto[0].split('|').map(Number);
    console.log(`Coordenadas da aldeia atual: ${coordenadasBase}`);

    // ===== Obter aldeias no Assistente de Saque =====
    const tabela = document.querySelector('#plunder_list');
    if (!tabela) {
        alert('Tabela do Assistente de Saque não encontrada.');
        return;
    }

    const linhas = tabela.querySelectorAll('tr'); // Todas as linhas
    const aldeiasProximas = []; // Armazenar aldeias filtradas

    linhas.forEach((linha, index) => {
        const celulaCoordenadas = linha.querySelector('td span[data-coord]'); // Coordenadas
        const celulaNome = linha.querySelector('td:nth-child(2)'); // Nome da aldeia

        // Ignorar cabeçalhos e linhas inválidas
        if (!celulaCoordenadas || !celulaNome) {
            console.log(`Linha ${index} ignorada (sem dados de coordenadas ou nome).`);
            return;
        }

        const coordenadasTexto = celulaCoordenadas.getAttribute('data-coord');
        const nomeAldeia = celulaNome.textContent.trim();

        // Verificar se é uma aldeia bárbara (nome vazio ou "aldeia bárbara")
        if (nomeAldeia === '' || nomeAldeia.toLowerCase().includes('aldeia bárbara')) {
            const coordenadas = coordenadasTexto.split('|').map(Number);
            const distancia = calcularDistancia(coordenadasBase, coordenadas);

            if (distancia <= raioMaximo) {
                aldeiasProximas.push({ coordenadas, distancia, elemento: linha });
                console.log(`Aldeia encontrada: ${coordenadasTexto}, Distância: ${distancia.toFixed(2)}`);
            }
        } else {
            console.log(`Linha ${index}: Aldeia não é bárbara (${nomeAldeia}).`);
        }
    });

    // ===== Resultado =====
    if (aldeiasProximas.length > 0) {
        console.log(`Aldeias bárbaras a menos de ${raioMaximo} campos:`, aldeiasProximas);

        aldeiasProximas.forEach(({ elemento }) => {
            elemento.style.backgroundColor = 'lightgreen'; // Destacar aldeias na tabela
        });

        alert(`${aldeiasProximas.length} aldeias bárbaras estão dentro do raio definido (${raioMaximo} campos). Verifique no console para mais detalhes.`);
    } else {
        alert(`Nenhuma aldeia bárbara foi encontrada a menos de ${raioMaximo} campos.`);
    }
})();
