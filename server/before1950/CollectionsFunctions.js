/**
 * Created by Ansonmouse on 8/3/2017.
 */
var Before1950QuestionsCollections = new Mongo.Collection('before1950Questions');

Meteor.publish('allBefore1950Questions', function () {
    return Before1950QuestionsCollections.find();
});

Meteor.methods({
    before1950AnswerQuestion: function (profile) {
        /**
         * TODO
         * Reinforce security check on options and type
         */
        switch (profile.type) {
            case 'mc':
                Before1950QuestionsCollections.update(
                    {_id: profile.questionId},
                    {$inc:{["response."+profile.response]: 1}}
                );
                break;
            case 'tf':
                if(profile.response == true) {
                    Before1950QuestionsCollections.update(
                        {_id: profile.questionId},
                        {$inc:{"response.true": 1}}
                    );
                }
                if(profile.response == false) {
                    Before1950QuestionsCollections.update(
                        {_id: profile.questionId},
                        {$inc:{"response.false": 1}}
                    );
                }
                break;
            case 'open':
                Before1950QuestionsCollections.update(
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
            var raw = Before1950QuestionsCollections.update(
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