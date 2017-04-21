Template.Main1960.helpers({
    /*gameDone: function () {
        return Session.get('game1960Done');
    },
    gameStarted: function () {
        return Session.get('game1960Started');
    }*/
});
Template.Main1960.events({
    'click #start_1960_game': function () {
        FlowRouter.go('1960-main-game');
    }
});