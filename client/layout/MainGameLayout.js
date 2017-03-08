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