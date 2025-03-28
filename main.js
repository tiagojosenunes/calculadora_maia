const form = document.getElementById('form-add');
const imgAprovado = '<img src="./images/aprovado.png" alt="emoji feliz"/>';
const imgReprovado = '<img src="./images/reprovado.png" alt="emoji triste"/>';
const materias = {}; // Objeto para armazenar as notas por matéria
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';

const inputNotaMinima = document.getElementById('nota-minima');

function getNotaMinima() {
    return parseFloat(inputNotaMinima.value) || 0;
}

let linhas = '';

form.addEventListener('submit', function (e) {
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMedias();
});

function adicionaLinha() {
    const inputNomeMateria = document.getElementById('nome-atividade');
    const inputNotaAtividade = document.getElementById('nota-atividade');

    const nomeMateria = inputNomeMateria.value.trim();
    const notaAtividade = parseFloat(inputNotaAtividade.value);

    if (nomeMateria === "" || isNaN(notaAtividade) || notaAtividade < 0 || notaAtividade > 10) {
        alert("Por favor, insira um nome válido e uma nota entre 0 e 10.");
        return;
    }

    // Se a matéria ainda não existe, cria um array para ela
    if (!materias[nomeMateria]) {
        materias[nomeMateria] = [];
    }

    // Adiciona a nota na matéria correspondente
    materias[nomeMateria].push(notaAtividade);

    let linha = `<tr>
        <td>${nomeMateria}</td>
        <td>${notaAtividade}</td>
        <td>${notaAtividade >= getNotaMinima() ? imgAprovado : imgReprovado}</td>
    </tr>`;

    linhas += linha;

    inputNomeMateria.value = '';
    inputNotaAtividade.value = '';
    inputNomeMateria.focus();
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMedias() {
    const mediaFinalElemento = document.getElementById('media-final-valor');
    const resultadoFinalElemento = document.getElementById('media-final-resultado');

    let resultadoHTML = '<strong>Médias por Matéria:</strong><br>';
    let mediaFinalGeral = 0;
    let totalMaterias = 0;

    for (const materia in materias) {
        const mediaMateria = calculaMediaMateria(materia);
        resultadoHTML += `${materia}: <strong>${mediaMateria}</strong> ${mediaMateria >= getNotaMinima() ? spanAprovado : spanReprovado} <br>`;
        mediaFinalGeral += mediaMateria;
        totalMaterias++;
    }

    if (totalMaterias > 0) {
        mediaFinalGeral = (mediaFinalGeral / totalMaterias).toFixed(2);
    } else {
        mediaFinalGeral = "0.00";
    }

    mediaFinalElemento.innerHTML = mediaFinalGeral;
    resultadoFinalElemento.innerHTML = resultadoHTML;
}

function calculaMediaMateria(materia) {
    if (!materias[materia] || materias[materia].length === 0) return 0;

    const somaNotas = materias[materia].reduce((total, nota) => total + nota, 0);
    return (somaNotas / materias[materia].length).toFixed(2);
}
