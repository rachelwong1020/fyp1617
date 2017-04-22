Template.Main1980.helpers({
    /*gameDone: function () {
        return Session.get('game1960Done');
    },
    gameStarted: function () {
        return Session.get('game1960Started');
    }*/
});
Template.Main1980.events({
    'click #start_1980_game': function () {
        FlowRouter.go('1980-main-game');
    }
});