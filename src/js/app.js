
let blackJack = new Blackjack();

$(function() {

    $('#iniciar').hide();
    blackJack.iniciarJogo();

    $('#jogador').append();
    $('#pontos-jogador').text();

    function mostrarCarta(naipe, valor) {

        let exibirCarta = `<img class="carta_${naipe}_${valor}">`
        return exibirCarta;
    }

    $('#aguardar').click(blackJack.finalizarJogo());
    
});
