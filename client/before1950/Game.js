/**
 * Created by Ansonmouse on 25/2/2017.
 */
Template.Before1950Game.helpers({

});
Template.Before1950Game.events({
    'click #before_1950_game_done': function () {
        Session.set('gameBefore1950Done', true);
    }
});