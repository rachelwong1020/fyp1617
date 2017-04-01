var QuestionsCollections = new Mongo.Collection('questions');

Meteor.publish('allQuestions', function () {
    return QuestionsCollections.find();
});

Meteor.publish('allQuestionsByDecade', function (decade) {
    return QuestionsCollections.find({decade: decade});
});

Meteor.methods({
    before1950AnswerQuestion: function (profile) {
        /**
         * TODO
         * Reinforce security check on options and type
         */
        switch (profile.type) {
            case 'mc':
                QuestionsCollections.update(
                    {_id: profile.questionId},
                    {$inc:{["response."+profile.response]: 1}}
                );
                break;
            case 'tf':
                if(profile.response == true) {
                    QuestionsCollections.update(
                        {_id: profile.questionId},
                        {$inc:{"response.true": 1}}
                    );
                }
                if(profile.response == false) {
                    QuestionsCollections.update(
                        {_id: profile.questionId},
                        {$inc:{"response.false": 1}}
                    );
                }
                break;
            case 'open':
                QuestionsCollections.update(
                    {_id: profile.questionId},
                    {$push:{response: profile.response}}
                );
                break;
        }
        Meteor.users.update(
            {_id: Meteor.userId()},
            {$push: {response: {
                questionId: profile.questionId,
                response: profile.response,
                startAnswerAt: profile.startAnswerAt,
                endAnswerAt: profile.endAnswerAt
            }}}
        );
    },
    before1950UploadQuestions: function (profile) {
        var successCount = 0;
        for(var i = 0; i < profile.length; i++) {
            var raw = QuestionsCollections.update(
                {questionNumber: profile[i].questionNumber},
                {$set: {
                    decade: profile[i].decade,
                    type: profile[i].type,
                    question: profile[i].question,
                    options: profile[i].options,
                    answer: profile[i].answer,
                    randomFactor: Math.random(),
                    lastUpdate: new Date()
                }},{upsert: true}
            );
            if(raw > 0) {
                successCount++
            }
        }
        return successCount;
    }
});