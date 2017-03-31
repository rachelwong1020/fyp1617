var usedQuestion = [];
Template.Before1950Game.onCreated(function () {
    Session.set('Before1950GameQuestions', []);
    Session.set('Before1950GameQuestionsCorrectAmount', 0);
    this.autorun(() => {
        this.subscribe('allQuestionsByDecade', 'before50s', {
            onReady: function () {
                Session.set('Before1950GameCurrentQuestion', getNewQuestion());
            }
        });
    })
});
Template.Before1950Game.helpers({
    option: function () {
        return Session.get('Before1950GameCurrentQuestion').options;
    },
    optionColNum: function () {
        return 12/Session.get('Before1950GameCurrentQuestion').options.length;
    },
    question: function () {
        return Session.get('Before1950GameCurrentQuestion').question;
    },
    questionNumber: function () {
        return Session.get('Before1950GameQuestions').length+1;
    },
    questionAnswered: function () {
        return 'response' in Session.get('Before1950GameCurrentQuestion');
    },
    questionsCompleted: function () {
        return Session.get('Before1950GameQuestions').length == 4;
    },
    showCorrectColor: function () {
        var position;
        for(var i = 0; i < Session.get('Before1950GameCurrentQuestion').options.length; i++) {
            if(Session.get('Before1950GameCurrentQuestion').options[i] == this) {
                position = i;
                break;
            }
        }
        return 'response' in Session.get('Before1950GameCurrentQuestion') && position == Session.get('Before1950GameCurrentQuestion').answer;
    },
    showIncorrectColor: function () {
        var position;
        for(var i = 0; i < Session.get('Before1950GameCurrentQuestion').options.length; i++) {
            if(Session.get('Before1950GameCurrentQuestion').options[i] == this) {
                position = i;
                break;
            }
        }
        return 'response' in Session.get('Before1950GameCurrentQuestion') && position == Session.get('Before1950GameCurrentQuestion').response && Session.get('Before1950GameCurrentQuestion').response != Session.get('Before1950GameCurrentQuestion').answer;
    }
});
Template.Before1950Game.events({
    'click #before_1950_game_done': function () {
        var questions = Session.get('Before1950GameQuestions');
        questions.push(Session.get('Before1950GameCurrentQuestion'));
        Session.set('Before1950GameQuestions', questions);
        Session.set('gameBefore1950Done', true);
    },
    'click #before_1950_game_next': function () {
        var questions = Session.get('Before1950GameQuestions');
        questions.push(Session.get('Before1950GameCurrentQuestion'));
        Session.set('Before1950GameQuestions', questions);
        Session.set('Before1950GameCurrentQuestion', getNewQuestion());
    },
    'click .option': function () {
        var question = Session.get('Before1950GameCurrentQuestion');
        if(!('response' in question)) {
            for(var i = 0; i < question.options.length; i++) {
                if(question.options[i] == this) {
                    question.response = i;
                    Session.set('Before1950GameCurrentQuestion', question);
                    if(question.response == question.answer) {
                        Session.set('Before1950GameQuestionsCorrectAmount', Session.get('Before1950GameQuestionsCorrectAmount')+1);
                    }
                }
            }
        }
    }
});

function getNewQuestion() {
    var question;
    do {
        question = QuestionsCollections.find({randomFactor:{$gte: Math.random()}}, {sort:{randomFactor:1}, limit:1}).fetch();
    } while (question.length != 1 || usedQuestion.indexOf(question[0].questionNumber) >= 0);
    usedQuestion.push(question[0].questionNumber);
    return question[0];
}