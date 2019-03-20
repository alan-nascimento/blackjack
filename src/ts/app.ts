
let blackJack = new Blackjack(new Deck, new Jogador, new Maquina);

let $: any;

$('#resultado-popup').hide();

function iniciar() {
    
    blackJack.iniciarJogo();
    mostrarMao(blackJack.Jogador.Mao);
    $('#iniciar').hide();
    $('#reiniciar').removeClass('display-none');
    $('#puxar-carta').prop('disabled', false);
    $('#aguardar').prop('disabled', false);
    $('#resultado-popup').hide();
    $('.pontos-jogador').text(blackJack.Jogador.Pontos);
    $('#contador-deck').text(blackJack.Deck.Deck.length);
}

function mostrarCarta(carta: Carta) {
    return `<img class="carta_${carta.Naipe}_${carta.Valor}"/>`;
}

function mostrarMao(mao: Carta[]) {
    
    $('#jogador').empty();
    
    for(let i = 0; i < mao.length; i++) {

        $('#jogador').append(mostrarCarta(blackJack.Jogador.Mao[i]));
    }
}

function mostrarMaoJogador(mao: Carta[]) {

    $('#jogador').empty();
    
    for(let i = 0; i < mao.length; i++) {
        $('#jogador').append(mostrarCarta(blackJack.Jogador.Mao[i]));
    }
}

function mostrarMaoMaquina(mao: Carta[]) {

    $('#maquina').empty();

    for(let i = 0; i < mao.length; i++) {
        $('#maquina').append(mostrarCarta(blackJack.Maquina.Mao[i]));
    }
}

function resultado(resultado: string) {

    mostrarMaoMaquina(blackJack.Maquina.Mao);
    $('#resultado-popup').show();
    $('#resultado').html('<h2 id="resultado">' + resultado + '</h2>');
    $('.pontos-maquina').text(blackJack.Maquina.Pontos);
}

function exibirResultado() {

    if (blackJack.Maquina.Pontos > 21
        || (blackJack.Jogador.Pontos <= 21 && blackJack.Jogador.Pontos >= blackJack.Maquina.Pontos )) {

        resultado('Parabéns!<br>Você Ganhou!');
    
    } else {

        resultado('Infelizmente,<br>você perdeu!');
    }
}

$('#iniciar').click(iniciar);

$('#reiniciar').click(() => {

    $('#jogador').empty();
    $('#maquina').empty();
    $('#maquina').append(`<img class="carta_sombra"/><img class="carta_sombra"/>`);
    $('.pontos-maquina').text("");
    blackJack = new Blackjack(new Deck, new Jogador, new Maquina);
    iniciar();
});

$('#puxar-carta').click(() => {

    blackJack.Jogador.pegaCarta(blackJack.Deck);
    mostrarMaoJogador(blackJack.Jogador.Mao);
    $('.pontos-jogador').text(blackJack.Jogador.Pontos);
    $('#contador-deck').text(blackJack.Deck.Deck.length);
    if(blackJack.Jogador.Pontos > 21) {
        exibirResultado();
    }
});

$('#aguardar').click(() => {
   
    blackJack.finalizarJogo();
    exibirResultado();
    mostrarMaoMaquina(blackJack.Maquina.Mao);
    $('#puxar-carta').prop('disabled', true);
    $('#aguardar').prop('disabled', true);
    $('.pontos-maquina').text(blackJack.Maquina.Pontos);
    $('#contador-deck').text(blackJack.Deck.Deck.length);
    $('#resultado-popup').show();
});

$('#ver-jogo').click(() => {

    $('#puxar-carta').prop('disabled', true);
    $('#aguardar').prop('disabled', true);
    $('#resultado-popup').hide();
});

$('#jogar-novamente').click(() => {

    $('#jogador').empty();
    $('#maquina').empty();
    $('#maquina').append(`<img class="carta_sombra"/><img class="carta_sombra"/>`);
    $('.pontos-maquina').text("");
    blackJack = new Blackjack(new Deck, new Jogador, new Maquina);
    iniciar();
});

