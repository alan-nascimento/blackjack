
let blackJack = new Blackjack();

$('#resultado-popup').hide();

function iniciar() {
    
    blackJack.iniciarJogo();
    mostrarMao(blackJack.jogador.mao);
    $('#iniciar').hide();
    $('#reiniciar').removeClass('display-none');
    $('#puxar-carta').prop('disabled', false);
    $('#aguardar').prop('disabled', false);
    $('#resultado-popup').hide();
    $('.pontos-jogador').text(blackJack.jogador.pontos);
    $('#contador-deck').text(blackJack.deck.deck.length);
}

function mostrarCarta(carta) {
    return `<img class="carta_${carta.naipe}_${carta.valor}"/>`;
}

function mostrarMao(mao) {
    
    $('#jogador').empty();
    
    for(let i = 0; i < mao.length; i++) {

        $('#jogador').append(mostrarCarta(blackJack.jogador.mao[i]));
    }
}

function mostrarMaoJogador(mao) {

    $('#jogador').empty();
    
    for(let i = 0; i < mao.length; i++) {
        $('#jogador').append(mostrarCarta(blackJack.jogador.mao[i]));
    }
}

function mostrarMaoMaquina(mao) {

    $('#maquina').empty();

    for(let i = 0; i < mao.length; i++) {
        $('#maquina').append(mostrarCarta(blackJack.maquina.mao[i]));
    }
}

function exibirResultado() {

    if (blackJack.jogador.pontos == 21) {
        mostrarMaoMaquina(blackJack.maquina.mao);
        $('#resultado-popup').show();
        $('#resultado').html(`<h2 id="resultado">Parabéns!<br>Você Ganhou!</h2>`);
        $('.pontos-maquina').text(blackJack.maquina.pontos);
    }

    if (blackJack.jogador.pontos > 21) {
        mostrarMaoMaquina(blackJack.maquina.mao);
        $('#resultado-popup').show();
        $('#resultado').html(`<h2 id="resultado">Infelizmente,<br>você perdeu!</h2>`);
        $('.pontos-maquina').text(blackJack.maquina.pontos);
    }

    if (blackJack.maquina.pontos > blackJack.jogador.pontos && blackJack.maquina.pontos <= 21) {
        mostrarMaoMaquina(blackJack.maquina.mao);
        $('#resultado-popup').show();
        $('#resultado').html(`<h2 id="resultado">Infelizmente,<br>você perdeu!</h2>`);
        $('.pontos-maquina').text(blackJack.maquina.pontos);
    }

    if (blackJack.maquina.pontos == 21) {
        mostrarMaoMaquina(blackJack.maquina.mao);
        $('#resultado-popup').show();
        $('#resultado').html(`<h2 id="resultado">Infelizmente,<br>você perdeu!</h2>`);
        $('.pontos-maquina').text(blackJack.maquina.pontos);
    }

    if (blackJack.maquina.pontos > 21) {
        $('#resultado-popup').show();
        $('#resultado').html(`<h2 id="resultado">Parabéns!<br>Você Ganhou!</h2>`);
        $('.pontos-maquina').text(blackJack.maquina.pontos);
    }
}

$('#iniciar').click(() => iniciar());

$('#reiniciar').click(() => {

    $('#jogador').empty();
    $('#maquina').empty();
    $('#maquina').append(`<img class="carta_sombra"/><img class="carta_sombra"/>`);
    $('.pontos-maquina').text("");
    blackJack = new Blackjack();
    iniciar();
});

$('#puxar-carta').click(() => {

    blackJack.jogador.pegaCarta(blackJack.deck);
    mostrarMaoJogador(blackJack.jogador.mao);
    $('.pontos-jogador').text(blackJack.jogador.pontos);
    $('#contador-deck').text(blackJack.deck.deck.length);
    if(blackJack.jogador.pontos > 21) {
        exibirResultado();
    }
});

$('#aguardar').click(() => {
   
    blackJack.finalizarJogo();
    exibirResultado();
    mostrarMaoMaquina(blackJack.maquina.mao);
    $('#puxar-carta').prop('disabled', true);
    $('#aguardar').prop('disabled', true);
    $('.pontos-maquina').text(blackJack.maquina.pontos);
    $('#contador-deck').text(blackJack.deck.deck.length);
    $('#resultado-popup').show();
});

$('#ver-jogo').click(() => $('#resultado-popup').hide());

$('#jogar-novamente').click(() => {

    $('#jogador').empty();
    $('#maquina').empty();
    $('#maquina').append(`<img class="carta_sombra"/><img class="carta_sombra"/>`);
    $('.pontos-maquina').text("");
    blackJack = new Blackjack();
    iniciar();
});

