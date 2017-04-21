Template.Game1960SchoolQuestions.onCreated(function () {
    Session.set('Game1960SchoolQuestionStarted', false);
    Session.set('QuestionCurrentDecade', '60s');
    Session.set('QuestionsGameDone', false);
});

Template.Game1960SchoolQuestions.helpers({
    gameDone: function () {
        return Session.get('QuestionsGameDone');
    },
    gameStarted: function () {
        return Session.get('Game1960SchoolQuestionStarted');
    },
    score: function () {
        return Session.get('QuestionsCorrectAmount')*100;
    }
});

Template.Game1960SchoolQuestions.events({
    'click #school_question_game_leave': function () {
        var completed = Session.get('MainGameCompletedCheckPoint');
        if(completed.indexOf(Session.get('MainGameCurrentGame')) < 0) {
            completed.push(Session.get('MainGameCurrentGame'));
            Session.set('MainGameCompletedCheckPoint', completed);
        }
        Session.set('MainGameCurrentGame', null);
    },
    'click #start_school_question_game': function () {
        Session.set('Game1960SchoolQuestionStarted', true);
    }
});