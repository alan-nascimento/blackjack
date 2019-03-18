
let blackJack = new Blackjack();

$(function() {
    
    blackJack.iniciarJogo();

    $('#pronto').click(blackJack.finalizarJogo());
    
});