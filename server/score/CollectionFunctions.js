var ScoreCollection = new Mongo.Collection('score');
Meteor.publish('topScores', function () {
});
Score = {
    insertScoreRecord: function (userId, batches, knowledgePoint, moneyPoint, happyPoint) {
        ScoreCollection.insert({
            batches: batches,
            knowledgePoint: knowledgePoint,
            moneyPoint: moneyPoint,
            happyPoint: happyPoint,
            createBy: userId,
            createAt: new Date()
        });
    }
};