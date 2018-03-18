var
    contadorRespostas =0,
    contarRespostasCertas=0,
    perguntaAtual
    ;
//Perguntas 
perguntas = [
    {
        pergunta: "Quem sediou a primeira copa do mundo em 1930?",
        alternativas: ["Brasil", "Argentina", "França", "Uruguai"],
        correto: "Uruguai",
        jaRespondida: false
    },
    {
        pergunta: "Quem ganhou a Copa do Mundo de 1970?",
        alternativas: ["Holanda", "México", "Brasil", "Argentina"],
        correto: "Brasil",
        jaRespondida: false
    },

       {
        pergunta: "Quem é o maior artilheiro em Copa do Mundo?",
        alternativas: ["Ronaldo", "Pelé", "Klose", "Cristiano Ronaldo"],
        correto: "Klose",
        jaRespondida: false
    },
	
	{
        pergunta: "Quantas copa do mundo o Brasil ja sediou? ",
        alternativas: ["1", "2", "3", "4"],
        correto: "2",
        jaRespondida: false
    },
	
	{
        pergunta: "Qual foi a maior goleada que o Brasil já sofreu em uma Copa do Mundo?",
        alternativas: ["4x1", "7x1", "5x0", "6x1"],
        correto: "7x1",
        jaRespondida: false
    },
	
	{
        pergunta: "Quem é o atual campeão da Copa do Mundo?",
        alternativas: ["Brasil", "Japão", "Espanha", "Alemanha"],
        correto: "Alemanha",
        jaRespondida: false
    },
	
	{
        pergunta: "Qual seleção marcou o gol mais rápido em uma Copa do Mundo?",
        alternativas: ["Turquia", "França", "Suécia", "Coreia do Sul"],
        correto: "Turquia",
        jaRespondida: false
    },
	
	{
        pergunta: "Qual jogador ganhou mais vezes a Copa do Mundo?",
        alternativas: ["Messi", "Pelé", "Klose", "Maradona"],
        correto: "Pelé",
        jaRespondida: false
    },
	
	{
        pergunta: "Qual o nome do mascote da Copa do Mundo de 2018?",
        alternativas: ["Zabivaka", "Fuléco", "Zakumi", "Striker"],
        correto: "Zabivaka",
        jaRespondida: false
    },
	
	{
        pergunta: "Quem ficou conhecido ao marcar um gol de mão na Copa do Mundo de 1986?",
        alternativas: ["Pelé", "Romario", "Maradona", "Garrincha"],
        correto: "Maradona",
        jaRespondida: false
    },

];

//Função para selecionar resposta
function selecionarResposta(resposta) {
    var btn = document.getElementById("btnProxima");
    if (btn.hidden === true) {
        var pergunta = document.getElementsByClassName("respostaSelecionada");
        if (pergunta.length > 0) {
            pergunta[0].className = "respostas";
        }
        resposta.className = "respostaSelecionada";
        btn = document.getElementById("btnResponder");
        btn.hidden = false;
    }
}

//Gerar aleatóriamente um nova pergunta
function gerarProximaPergunta() {
    var ok = false;
    var sorteio;
    limparAsDivs();
    while (ok === false) {
        sorteio = Math.floor(Math.random() * perguntas.length);
        if (perguntas[sorteio].jaRespondida === false) {
            perguntas[sorteio].jaRespondida = true;
            ok = true;
            return perguntas[sorteio];
        }
    }
}

//Gerar aleatóriamente as alternativas
function gerarAlternativas(pergunta) {
    var alternativas = pergunta.alternativas.length -1;
    var sorteioAlternativa;
    var todasDivs;
    var textoDiv = "";
    var ok = false;
    var tentativasSorteio = 0; 
    todasDivs = document.getElementsByClassName("respostas");
    for (cadaItem = 0; cadaItem < todasDivs.length; cadaItem++) {
        textoDiv = "";
        tentativasSorteio = 0;
        while (todasDivs[cadaItem].innerText === "") {
            if (tentativasSorteio === 10) {
                sorteioAlternativa = 0;
            } else if (tentativasSorteio > 10)
            {
                sorteioAlternativa++;
            } else {
                sorteioAlternativa = Math.floor(Math.random() * alternativas);
            }
            
            for (item = 0; item < todasDivs.length; item ++) {
                textoDiv = todasDivs[item].innerText;
                if (textoDiv === pergunta.alternativas[sorteioAlternativa]) {
                    todasDivs[cadaItem].innerText = "";
                    break;
                } else if (textoDiv === "") {
                    todasDivs[cadaItem].innerText = pergunta.alternativas[sorteioAlternativa];
                    break;
                }
            }
            tentativasSorteio++;
        }
    };
}
//Gerar a proxima pergunta
function proximaPergunta() {
    if (contadorRespostas === perguntas.length) {
        var resultado = document.getElementById("resultado");
        resultado.innerText = "Seu total foi de " + contarRespostasCertas + "/10!";
        var divPrincipal = document.getElementById("principal");
        divPrincipal.hidden = true;
        divPrincipal = document.getElementById("resultado");
        divPrincipal.hidden = false;
    }
    else {

        var botao = document.getElementById("btnIniciar");
        botao.hidden = true;
        botao = document.getElementById("btnProxima");
        botao.hidden = true;
		document.body.background = "img\\fundo2.jpg";


        var proxima = gerarProximaPergunta();
        pergunta = document.getElementById("pergunta");
        pergunta.innerText = proxima.pergunta;
        gerarAlternativas(proxima);
        perguntaAtual = proxima;
    }
}
function responder() {
    var resposta = document.getElementsByClassName("respostaSelecionada");
    if (resposta.length > 0) {
        contadorRespostas++;
        var botao = document.getElementById("btnResponder");
        botao.hidden = true;
        botao = document.getElementById("btnProxima");
        botao.hidden = false;
        if (resposta[0].innerText === perguntaAtual.correto) {
            resposta[0].className = "respostaCorreta";
            contarRespostasCertas++;
        } else {
            resposta[0].className = "respostaErrada";
            preencherRespostaCorreta();
        }
    }
}
function preencherRespostaCorreta() {
    var naoRespondidas = document.getElementsByClassName("respostas");
    for (item in naoRespondidas) {
        if (naoRespondidas[item].innerText === perguntaAtual.correto) {
            naoRespondidas[item].className = "respostaCorreta";
        }
    }
}
function limparAsDivs() {
    var divs = document.getElementsByClassName("respostas");
    var divPrincipal = document.getElementById("principal");
    divPrincipal.hidden = false;
    divPrincipal = document.getElementById("resultado");
    divPrincipal.hidden = true;

    for (item in divs) {
        divs[item].innerText = "";

    }
    divs = document.getElementsByClassName("respostaCorreta");
    if (divs.length > 0) {
        divs[0].innerText = "";
        divs[0].className = "respostas";
    }
    divs = document.getElementsByClassName("respostaErrada");
    if (divs.length > 0) {
        divs[0].innerText = "";
        divs[0].className = "respostas";
    }

}
