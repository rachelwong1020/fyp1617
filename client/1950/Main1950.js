Template.Main1950.helpers({
    gameDone: function () {
        return Session.get('game1950Done');
    },
    gameStarted: function () {
        return Session.get('game1950Started');
    }
});
Template.Main1950.events({
    'click #start_1950_game': function () {
        Session.set('game1950Started', true);
    }
});