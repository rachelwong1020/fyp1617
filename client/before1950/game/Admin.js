Template.Before1950Admin.onCreated(function () {
    this.autorun(() => {
        this.subscribe('allQuestions');
    })
});
Template.Before1950Admin.helpers({
    isQuestionType: function (value) {
        return this.type == value;
    },
    mcOptions: function () {
        return this.options;
    },
    mcResponseCount: function () {
        return Math.random()*100+'%';
    },
    questions: function () {
        return QuestionsCollections.find({}, {sort: {questionNumber: 1}});
    }
});
Template.Before1950Admin.events({
    'click #upload_questions': function () {
        var file = document.getElementById('file').files[0];
        var FR = new FileReader();
        FR.onload = (data) => {
            var obj = JSON.parse(data.target.result);
            Meteor.call('before1950UploadQuestions', obj, function (err, results) {
                console.log('Uploaded '+results+' questions');
            });
        };
        FR.readAsText(file);
    }
});