document.addEventListener('DOMContentLoaded',function(){
    const estadoSelect = document.getElementById('estado');
    const municipioSelect = document.getElementById('municipio');
    const estadoSelecionado = document.getElementById('estado-selecionado');
    const municipioSelecionato = document.getElementById('municipio-selecionado');
    const mapaSvg = document.getElementById('mapa');


    //Load estados
    fetch('/api/estados')
        .then(response => response.json())
        .then(estados => {
            estados.forEach(estado => {
                const option = document.createElement('option');
                option.value = estado.uf;
                option.textContent = estado.nome;
                estadoSelect.appendChild(option);
            });
        });
    //Select Estado

    estadoSelect.addEventListener('change',function(){
        const uf = this.value;

        if(!uf){
            municipioSelect.disabled = true;
            municipioSelect.innerHTML = '<option value="">-Escolha um municipio -</option>';
            estadoSelecionado.textContent = '--';
            return;
        }
        estadoSelecionado.textContent = this.options[this.selectedIndex].text;
        municipioSelecionato.textContent = '--';

        //Load municipios
        fetch(`/api/municipios/${uf}`)
            .then(response => response.json())
            .then(municipios => {
                municipioSelect.innerHTML = '<option value="">-Escolha um municipio -<option>';
                municipios.forEach(municipio => {
                    const option = document.createElement('option');
                    option.value = municipio.nome;
                    option.textContent = municipio.nome;
                    municipioSelect.appendChild(option);
                });
                municipioSelect.disabled = false;
            });
    });

    //Municipio Selecionado
    municipioSelect.addEventListener('change', function(){
        const municipio = this.value;
        const estado = estadoSelect.value;

        if(!municipio || !estado){
            municipioSelecionato.textContent = '--';
            mapaSvg.innerHTML = '';
            return;
        }
        municipioSelecionato.textContent = this.options[this.selectedIndex].text;

        //Carrega SVG Municipio
        fetch(`/api/svg/${estado}/${municipio}`)
            .then(response =>response.json())
            .then(data => {
                mapaSvg.innerHTML = '';
                mapaSvg.setAttribute('viewBox', data.viewbox);

                //Add estado
                const estadoPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');

                estadoPath.setAttribute('d', data.svg_estado);
                estadoPath.setAttribute('fill', '#f0f0f0');
                estadoPath.setAttribute('stroke', '#666');
                estadoPath.setAttribute('stroke-width', '0.5');
                mapaSvg.appendChild(estadoPath);

                //Add municipio
                const municipioPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                municipioPath.setAttribute('d', data.svg_municipio);
                municipioPath.setAttribute('fill', '#4CAF50');
                municipioPath.setAttribute('stroke', '#2E7D32');
                municipioPath.setAttribute('stroke-width', '0.5');
                mapaSvg.appendChild(municipioPath);

            });
    });
});