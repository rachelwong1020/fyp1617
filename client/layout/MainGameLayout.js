/**
 * Created by Ansonmouse on 25/2/2017.
 */
Template.MainGameLayout.onRendered(function () {
    $('.collapsible').collapsible();
});
Template.MainGameLayout.helpers({
    checkPoint: function () {
        return Session.get('MainGameCheckPoints');
    },
    location: function () {
        
    }
});