/**
 * Created by Ansonmouse on 22/4/2017.
 */
Template.Game1960Lamtsuen.onCreated(function () {
    Session.set('Game1960LamtsuenDameStage', 0);
});
var energyPointer;
var energyPointerMinPosition = 25;
var energyPointerMaxPosition = 71;
var energyPointerCurrentPosition = energyPointerMinPosition;
var energyPointerMovingFactor = 1;
var prayitem;
var prayitemInitVelocity;
var prayitemInitBottom = 100;
var prayitemCurrentPosition = prayitemInitBottom;
var prayitemMinHozPosition = 15;
var prayitemMaxHozPosition = 70;
var prayitemCurrentHozPosition = prayitemMinHozPosition;
var prayitemMovingFactor = 1;
var throwFactor;
Template.Game1960Lamtsuen.onRendered(function () {
    startPrayitemHozMove();
    $(document).keypress(function (e) {
        if(e.keyCode == 32) {
            switch (Session.get('Game1960LamtsuenDameStage')) {
                case 0:
                    clearInterval(prayitem);
                    startEnergyBar();
                    Session.set('Game1960LamtsuenDameStage', Session.get('Game1960LamtsuenDameStage')+1);
                    break;
                case 1:
                    clearInterval(energyPointer);
                    var energyLevel;
                    if(energyPointerCurrentPosition <= 39.75) {
                        energyLevel = (energyPointerCurrentPosition - energyPointerMinPosition)/(39.75-energyPointerMinPosition);
                        throwFactor = energyLevel*9;
                    } else {
                        if(energyPointerCurrentPosition <= 56.3) {
                            energyLevel = (energyPointerCurrentPosition - 39.75)/(56.3-39.75);
                            throwFactor = energyLevel*6+9;
                        } else {
                            energyLevel = (energyPointerCurrentPosition - 56.3)/(energyPointerMaxPosition-56.3);
                            throwFactor = energyLevel*5+15;
                        }
                    }
                    prayitemInitVelocity = throwFactor;
                    startPrayitemThrow();
                    break;
            }
        }
    });
});

Template.Game1960Lamtsuen.helpers({
    showEnergyBar: function () {
        return Session.get('Game1960LamtsuenDameStage') != 0;
    },
    showResetBar: function () {
        return Session.get('Game1960LamtsuenDameStage') == 2;
    }
});

Template.Game1960Lamtsuen.events({
    'click #restart_game': function () {
        energyPointerCurrentPosition = energyPointerMinPosition;
        energyPointerMovingFactor = 1;
        $('#energy_pointer').css('left', energyPointerCurrentPosition+'%');
        prayitemCurrentHozPosition = prayitemMinHozPosition;
        prayitemMovingFactor = 1;
        prayitemCurrentPosition = prayitemInitBottom;
        $('#prayitem').css('left', prayitemCurrentHozPosition+'%').css('bottom', prayitemInitBottom);
        startPrayitemHozMove();
        Session.set('Game1960LamtsuenDameStage', 0);
    }
});

function startEnergyBar() {
    energyPointer = setInterval(function () {
        energyPointerCurrentPosition = energyPointerCurrentPosition + energyPointerMovingFactor;
        $('#energy_pointer').css('left', energyPointerCurrentPosition+'%');
        if(energyPointerCurrentPosition == energyPointerMinPosition) {
            energyPointerMovingFactor = 1;
        }
        if(energyPointerCurrentPosition == energyPointerMaxPosition) {
            energyPointerMovingFactor = -1;
        }
    }, 20);
}

function startPrayitemHozMove() {
    prayitem = setInterval(function () {
        prayitemCurrentHozPosition = prayitemCurrentHozPosition + prayitemMovingFactor;
        $('#prayitem').css('left', prayitemCurrentHozPosition+'%');
        if(prayitemCurrentHozPosition == prayitemMinHozPosition) {
            prayitemMovingFactor = 1;
        }
        if(prayitemCurrentHozPosition == prayitemMaxHozPosition) {
            prayitemMovingFactor = -1;
        }
    }, 15);
}

function startPrayitemThrow() {
    prayitem = setInterval(function () {
        prayitemCurrentPosition += prayitemInitVelocity;
        prayitemInitVelocity -= 0.2;
        if(prayitemCurrentPosition <= prayitemInitBottom) {
            prayitemCurrentPosition = prayitemInitBottom;
            clearInterval(prayitem);
            Session.set('Game1960LamtsuenDameStage', Session.get('Game1960LamtsuenDameStage')+1);
        }
        $('#prayitem').css('bottom', prayitemCurrentPosition);
        if(throwFactor >= 9 && throwFactor <= 15 && prayitemInitVelocity <= 0) {
            clearInterval(prayitem);
            Session.set('Game1960LamtsuenDameStage', Session.get('Game1960LamtsuenDameStage')+1);
        }
        if(throwFactor >= 16 && prayitemInitVelocity <= 0) {
            clearInterval(prayitem);
            Session.set('Game1960LamtsuenDameStage', Session.get('Game1960LamtsuenDameStage')+1);
        }
    }, 10);
}