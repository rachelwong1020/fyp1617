/**
 * Created by Ansonmouse on 1/4/2017.
 */
Meteor.methods({
    scoreNewScoreByUser: function (profile) {
        if(!Meteor.userId()) {
            throw new Meteor.Error(403, 'Access Denied');
        }
        if('batches' in profile && 'knowledgePoint' in profile && 'moneyPoint' in profile && 'happyPoint' in profile) {
            check(profile.knowledgePoint, Match.Integer);
            check(profile.moneyPoint, Match.Integer);
            check(profile.happyPoint, Match.Integer);
            Score.insertScoreRecord(Meteor.userId(), profile.batches, profile.knowledgePoint, profile.moneyPoint, profile.happyPoint);
        } else {
            throw new Meteor.Error(400, 'Bad Request');
        }
    }
});