<!DOCTYPE html>
<html>
<head>
  <title>STEPS Game</title>
  <!-- Library - Must include in each document -->
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link type="text/css" rel="stylesheet" href="../lib/css/materialize.min.css"  media="screen,projection"/>
  <link rel="stylesheet" type="text/css" href="../lib/animate.css">
  <link rel="stylesheet" type="text/css" href="../lib/global_style.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <link rel="stylesheet" type="text/css" href="style.css">

  <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js"></script>
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.9/jquery-ui.min.js"></script>
  <script type="text/javascript">

var correctCards = 0;
$( init );

function init() {

  // Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  // Reset the game
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  // Create the pile of shuffled cards
  var numbers = [ 1, 2, 3 ];
  /*fuck you var imgArray = new Array();
  imgArray[0] = new Image();
  imgArray[0].src = '小販管理中環利源東街前.png';
  imgArray[1] = new Image();
  imgArray[1].src = '小販管理深水埗北河街前.png';
  imgArray[2] = new Image();
  imgArray[2].src = '小販管理深水埗汝州街前.png';*/
  
  numbers.sort( function() { return Math.random() - .5 } );

  for ( var i=0; i<3; i++ ) {
    $('<div>' + numbers[i] + '</div>').data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      containment: '#content',
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  // Create the card slots
  var words = [ 'one', 'two', 'three' ];
  for ( var i=1; i<=3; i++ ) {
    $('<div>' + words[i-1] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
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
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );mhhn 
  }

}
0
</script>
</head>
<body>

<div id="content">

  <div id="cardPile"> </div>
  <div id="cardSlots"> </div>

  <div id="successMessage">
    <h2>You did it!</h2>
  </div>

</div>
</body>
</html>