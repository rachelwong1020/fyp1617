var usedQuestion = [];
Template.Before1950Game.onCreated(function () {
    this.autorun(() => {
        this.subscribe('allBefore1950Questions');
    })
});
Template.Before1950Game.helpers({

});
Template.Before1950Game.events({
    'click #before_1950_game_done': function () {
        Session.set('gameBefore1950Done', true);
    },
    'click #before_1950_game_next': function () {
        var question;
        do {
            question = Before1950QuestionsCollections.find({randomFactor:{$gte: Math.random()}}, {sort:{randomFactor:1}, limit:1}).fetch();
        } while (question.length != 1 || usedQuestion.indexOf(question[0].questionNumber) >= 0);
        usedQuestion.push(question[0].questionNumber);
        console.log(question[0].questionNumber);
    }
});