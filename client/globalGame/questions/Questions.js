var usedQuestion = [];
var questionAmount;
Template.Questions.onCreated(function () {
    Session.set('QuestionsAnsweredQuestions', []);
    Session.set('QuestionsCorrectAmount', 0);
    if(Session.get('QuestionCurrentDecade') == 'before50s') {
        questionAmount = 5;
    } else {
        questionAmount = 3;
    }
    this.autorun(() => {
        this.subscribe('allQuestionsByDecade', Session.get('QuestionCurrentDecade'), {
            onReady: function () {
                Session.set('QuestionsCurrentQuestion', getNewQuestion());
            }
        });
    });
});
Template.Questions.helpers({
    isMc: function () {
        return Session.get('QuestionsCurrentQuestion').type == 'mc';
    },
    isOpen: function () {
        return Session.get('QuestionsCurrentQuestion').type == 'open';
    },
    isTrueFalse: function () {
        return Session.get('QuestionsCurrentQuestion').type == 'tf';
    },
    option: function () {
        return Session.get('QuestionsCurrentQuestion').options;
    },
    optionColNum: function () {
        return 12/Session.get('QuestionsCurrentQuestion').options.length;
    },
    question: function () {
        return Session.get('QuestionsCurrentQuestion').question;
    },
    questionNumber: function () {
        return Session.get('QuestionsAnsweredQuestions').length+1;
    },
    questionAnswered: function () {
        return 'response' in Session.get('QuestionsCurrentQuestion');
    },
    questionsCompleted: function () {
        return Session.get('QuestionsAnsweredQuestions').length == questionAmount-1;
    },
    showMcCorrectColor: function () {
        var position;
        for(var i = 0; i < Session.get('QuestionsCurrentQuestion').options.length; i++) {
            if(Session.get('QuestionsCurrentQuestion').options[i] == this) {
                position = i;
                break;
            }
        }
        return 'response' in Session.get('QuestionsCurrentQuestion') && position == Session.get('QuestionsCurrentQuestion').answer;
    },
    showMcIncorrectColor: function () {
        var position;
        for(var i = 0; i < Session.get('QuestionsCurrentQuestion').options.length; i++) {
            if(Session.get('QuestionsCurrentQuestion').options[i] == this) {
                position = i;
                break;
            }
        }
        return 'response' in Session.get('QuestionsCurrentQuestion') && position == Session.get('QuestionsCurrentQuestion').response && Session.get('QuestionsCurrentQuestion').response != Session.get('QuestionsCurrentQuestion').answer;
    },
    showTfTrueCorrectColor: function () {
        return 'response' in Session.get('QuestionsCurrentQuestion') && Session.get('QuestionsCurrentQuestion').answer == true;
    },
    showTfTrueIncorrectColor: function () {
        return 'response' in Session.get('QuestionsCurrentQuestion') && Session.get('QuestionsCurrentQuestion').answer == false && Session.get('QuestionsCurrentQuestion').response != Session.get('QuestionsCurrentQuestion').answer;
    },
    showTfFalseCorrectColor: function () {
        return 'response' in Session.get('QuestionsCurrentQuestion') && Session.get('QuestionsCurrentQuestion').answer == false;
    },
    showTfFalseIncorrectColor: function () {
        return 'response' in Session.get('QuestionsCurrentQuestion') && Session.get('QuestionsCurrentQuestion').answer == true && Session.get('QuestionsCurrentQuestion').response != Session.get('QuestionsCurrentQuestion').answer;
    }
});
Template.Questions.events({
    'click #question_game_done': function () {
        var questions = Session.get('QuestionsAnsweredQuestions');
        questions.push(Session.get('QuestionsCurrentQuestion'));
        Session.set('QuestionsAnsweredQuestions', questions);
        Session.set('QuestionsGameDone', true);
    },
    'click #question_game_next': function () {
        var questions = Session.get('QuestionsAnsweredQuestions');
        questions.push(Session.get('QuestionsCurrentQuestion'));
        Session.set('QuestionsAnsweredQuestions', questions);
        Session.set('QuestionsCurrentQuestion', getNewQuestion());
    },
    'click .option': function () {
        var question = Session.get('QuestionsCurrentQuestion');
        if(!('response' in question)) {
            for(var i = 0; i < question.options.length; i++) {
                if(question.options[i] == this) {
                    question.response = i;
                    Session.set('QuestionsCurrentQuestion', question);
                    if(question.response == question.answer) {
                        Session.set('QuestionsCorrectAmount', Session.get('QuestionsCorrectAmount')+1);
                        if(Session.get('QuestionCurrentDecade') != 'before50s') {
                            MainGame.increaseKp(100);
                        }
                    }
                }
            }
        }
    },
    'click .optionFalse': function () {
        var question = Session.get('QuestionsCurrentQuestion');
        if(!('response' in question)) {
            question.response = false;
            Session.set('QuestionsCurrentQuestion', question);
            if(question.response == question.answer) {
                Session.set('QuestionsCorrectAmount', Session.get('QuestionsCorrectAmount')+1);
                if(Session.get('QuestionCurrentDecade') != 'before50s') {
                    MainGame.increaseKp(100);
                }
            }
        }
    },
    'click .optionTrue': function () {
        var question = Session.get('QuestionsCurrentQuestion');
        if(!('response' in question)) {
            question.response = true;
            Session.set('QuestionsCurrentQuestion', question);
            if(question.response == question.answer) {
                Session.set('QuestionsCorrectAmount', Session.get('QuestionsCorrectAmount')+1);
                if(Session.get('QuestionCurrentDecade') != 'before50s') {
                    MainGame.increaseKp(100);
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