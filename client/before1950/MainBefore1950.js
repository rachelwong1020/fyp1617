Template.MainBefore1950.helpers({
    correctAnswerAmount: function () {
        return Session.get('Before1950GameQuestionsCorrectAmount');
    },
    gameDone: function () {
        return Session.get('gameBefore1950Done');
    },
    gameStarted: function () {
        return Session.get('gameBefore1950Started');
    },
    isPassGame: function () {
        return Session.get('Before1950GameQuestionsCorrectAmount') >= 4;
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