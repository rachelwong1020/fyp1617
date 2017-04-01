Template.MainBefore1950.helpers({
    correctAnswerAmount: function () {
        return Session.get('QuestionsCorrectAmount');
    },
    gameDone: function () {
        return Session.get('QuestionsGameDone');
    },
    gameStarted: function () {
        return Session.get('gameBefore1950Started');
    },
    isPassGame: function () {
        return Session.get('QuestionsCorrectAmount') >= 4;
    }
});
Template.MainBefore1950.events({
    'click #start_before_1950_game': function () {
        Session.set('gameBefore1950Started', true);
    },
    'click #before_1950_leave': function () {
        FlowRouter.go('1950-main');
    }
});