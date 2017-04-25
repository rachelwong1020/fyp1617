Template.Game1960Lamtsuen.onCreated(function () {
    Session.set('Game1960LamtsuenDameStage', 0);
    Session.set('Game1960LamtsuenCompletedCount', 0);
    Session.set('Game1960LamtsuenSuccessCount', 0);
    Session.set('Game1960LamtsuenStarted', false);
    Session.set('game1960LamtsuenStartedPageOne', false);
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
var prayitemMinHozPosition = 20;
var prayitemMaxHozPosition = 70;
var prayitemCurrentHozPosition = prayitemMinHozPosition;
var prayitemMovingFactor = 1;
var throwFactor;
var key;
Template.Game1960Lamtsuen.onRendered(function () {
    startPrayitemHozMove();
    key = $(document).keypress(function (e) {
        if(e.keyCode == 32 && Session.get('Game1960LamtsuenStarted')) {
            if(Session.get('MainGameMP') >= 100) {
                switch (Session.get('Game1960LamtsuenDameStage')) {
                    case 0:
                        clearInterval(prayitem);
                        startEnergyBar();
                        Session.set('Game1960LamtsuenDameStage', Session.get('Game1960LamtsuenDameStage')+1);
                        break;
                    case 1:
                        MainGame.increaseMp(-100);
                        clearInterval(energyPointer);
                        var energyLevel;
                        console.log(energyPointerCurrentPosition);
                        if(energyPointerCurrentPosition <= 40) {
                            energyLevel = (energyPointerCurrentPosition - energyPointerMinPosition)/(40-energyPointerMinPosition);
                            throwFactor = energyLevel*6;
                        } else {
                            if(energyPointerCurrentPosition <= 57) {
                                energyLevel = (energyPointerCurrentPosition - 40)/(57-40);
                                throwFactor = energyLevel*7+6;
                            } else {
                                energyLevel = (energyPointerCurrentPosition - 57)/(energyPointerMaxPosition-57);
                                throwFactor = energyLevel*5+13;
                            }
                        }
                        prayitemInitVelocity = throwFactor;
                        startPrayitemThrow();
                        break;
                }
            }
        }
    });
});

Template.Game1960Lamtsuen.onDestroyed(function () {
    key = null;
});

Template.Game1960Lamtsuen.helpers({
    gameDone: function () {
        return Session.get('Game1960LamtsuenCompletedCount') == 5;
    },
    gameStarted: function () {
        return Session.get('Game1960LamtsuenStarted');
    },
    pageOne: function () {
        return !Session.get('game1960LamtsuenStartedPageOne');
    },
    showEnergyBar: function () {
        return Session.get('Game1960LamtsuenDameStage') != 0;
    },
    showResetBar: function () {
        return Session.get('Game1960LamtsuenDameStage') == 2;
    }
});

Template.Game1960Lamtsuen.events({
    'click #1960_lamtsuen_leave': function () {
        var completed = Session.get('MainGameCompletedCheckPoint');
        if(completed.indexOf(Session.get('MainGameCurrentGame')) < 0) {
            completed.push(Session.get('MainGameCurrentGame'));
            Session.set('MainGameCompletedCheckPoint', completed);
        }
        Session.set('MainGameCurrentGame', null);
    },
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
    },
    'click #start_1960_lamtsuen_game': function () {
        Session.set('Game1960LamtsuenStarted', true);
    },
    'click #start_1960_lamtsuen_next': function () {
        Session.set('game1960LamtsuenStartedPageOne', true);
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
            Session.set('Game1960LamtsuenCompletedCount', Session.get('Game1960LamtsuenCompletedCount')+1);
        }
        $('#prayitem').css('bottom', prayitemCurrentPosition);
        if(throwFactor >= 6 && throwFactor <= 13 && prayitemInitVelocity <= 0) {
            clearInterval(prayitem);
            Session.set('Game1960LamtsuenDameStage', Session.get('Game1960LamtsuenDameStage')+1);
            MainGame.increaseHp(100);
            Session.set('Game1960LamtsuenSuccessCount', Session.get('Game1960LamtsuenSuccessCount')+1);
            Session.set('Game1960LamtsuenCompletedCount', Session.get('Game1960LamtsuenCompletedCount')+1);
        }
        if(throwFactor >= 14 && prayitemInitVelocity <= 0) {
            clearInterval(prayitem);
            Session.set('Game1960LamtsuenDameStage', Session.get('Game1960LamtsuenDameStage')+1);
            Session.set('Game1960LamtsuenCompletedCount', Session.get('Game1960LamtsuenCompletedCount')+1);
        }
    }, 10);
}