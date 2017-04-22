Template.Main1970.helpers({
    /*gameDone: function () {
        return Session.get('game1960Done');
    },
    gameStarted: function () {
        return Session.get('game1960Started');
    }*/
});
Template.Main1970.events({
    'click #start_1970_game': function () {
        FlowRouter.go('1970-main-game');
    }
});