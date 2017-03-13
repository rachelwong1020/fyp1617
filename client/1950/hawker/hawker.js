/**
 * Created by Rachel on 8/3/2017.
 */
var imageRelationship = [
    {upperNumber: 1, lowerString: 'one', beforeImg: 'central_LiYuenStEast_before.png', afterImg: 'central_LiYuenStEast_after.png'},
    {upperNumber: 2, lowerString: 'two', beforeImg: 'ssp_PeiHoSt_before.png', afterImg: 'ssp_PeiHoSt_after.png'},
    {upperNumber: 3, lowerString: 'three', beforeImg: 'ssp_YuChauSt_before.png', afterImg: 'ssp_YuChauSt_after.png'},
];

var correctCards = 0;
Template.hawker.onRendered(function () {
    init();
});

Template.hawker.helpers({
    gameDone: function () {
        return Session.get('game1950HawkerDone');
    }
});

function init() {
    // Reset the game
    correctCards = 0;
    $('#cardPile').html( '' );
    $('#cardSlots').html( '' );

    // Create the pile of shuffled cards
    var numbers = [1, 2, 3];
    numbers.sort( function() { return Math.random() - .5 } );

    for (var i = 0; i < 3; i++) {
        $('<div></div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
            containment: '#hawker_content',
            stack: '#cardPile div',
            cursor: 'move',
            revert: true
        } ).addClass('hoverable').css('background-image', 'url(/resources/games/Game1950hawker/img/'+imageRelationship[numbers[i]-1].beforeImg+')');
    }

    // Create the card slots
    var words = [ 'one', 'two', 'three'];
    for ( var i=1; i<=3; i++ ) {
        $('<div></div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
            accept: '#cardPile div',
            hoverClass: 'hovered',
            drop: handleCardDrop
        } ).css('background-image', 'url(/resources/games/Game1950hawker/img/'+imageRelationship[i-1].afterImg+')');
    }

}

function handleCardDrop( event, ui ) {
    var slotNumber = $(this).data( 'number' );
    var cardNumber = ui.draggable.data( 'number' );

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

    if ( slotNumber == cardNumber ) {
        ui.draggable.addClass( 'correct' );
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        correctCards++;
    }

    // If all the cards have been placed correctly then display a message
    // and reset the cards for another go

    if ( correctCards == 3 ) {
        Session.set('game1950HawkerDone', true);
    }

}