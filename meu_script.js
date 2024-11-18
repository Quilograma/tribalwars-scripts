javascript:(function() {
    // ===== CONFIGURAÇÕES =====
    const raioMaximo = 15; // Distância máxima em campos

    // Função para calcular a distância entre duas coordenadas
    function calcularDistancia(coord1, coord2) {
        const [x1, y1] = coord1;
        const [x2, y2] = coord2;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    // Obter coordenadas da aldeia atual (topo do jogo)
    const coordenadasBaseTexto = document.querySelector('#menu_row2 b').textContent.match(/\d+\|\d+/);
    if (!coordenadasBaseTexto) {
        alert('Não foi possível obter as coordenadas da aldeia atual.');
        return;
    }
    const coordenadasBase = coordenadasBaseTexto[0].split('|').map(Number);

    console.log(`Coordenadas da aldeia atual: ${coordenadasBase}`);

    // Obter aldeias no Assistente de Saque
    const linhas = document.querySelectorAll('#plunder_list tr'); // Tabela de aldeias
    if (!linhas || linhas.length === 0) {
        alert('Não foram encontradas aldeias no Assistente de Saque.');
        return;
    }

    const aldeiasProximas = []; // Lista de aldeias dentro do raio

    linhas.forEach((linha) => {
        const celulaCoordenadas = linha.querySelector('td span[data-coord]');
        if (!celulaCoordenadas) return;

        const coordenadasTexto = celulaCoordenadas.getAttribute('data-coord');
        const coordenadas = coordenadasTexto.split('|').map(Number);

        const distancia = calcularDistancia(coordenadasBase, coordenadas);
        if (distancia <= raioMaximo) {
            aldeiasProximas.push({ coordenadas, distancia, elemento: linha });
        }
    });

    // Exibir aldeias próximas
    if (aldeiasProximas.length > 0) {
        console.log(`Aldeias a menos de ${raioMaximo} campos:`, aldeiasProximas);

        aldeiasProximas.forEach(({ elemento }) => {
            elemento.style.backgroundColor = 'lightgreen'; // Destacar no Assistente de Saque
        });

        alert(`${aldeiasProximas.length} aldeias estão dentro do raio definido (${raioMaximo} campos). Verifique no console para mais detalhes.`);
    } else {
        alert(`Nenhuma aldeia foi encontrada a menos de ${raioMaximo} campos.`);
    }
})();
