Template.MainGameLayout.onRendered(function () {
    $('.collapsible').collapsible();
    if(!Session.get('MainGameKP')) {
        Session.set('MainGameKP', 100);
    }
    if(!Session.get('MainGameMP')) {
        Session.set('MainGameMP', 100);
    }
    if(!Session.get('MainGameHP')) {
        Session.set('MainGameHP', 100);
    }
});
Template.MainGameLayout.helpers({
    checkPoint: function () {
        return Session.get('MainGameCheckPoints');
    },
    hpPoint: function () {
        return Session.get('MainGameHP');
    },
    kpPoint: function () {
        return Session.get('MainGameKP');
    },
    mpPoint: function () {
        return Session.get('MainGameMP');
    }
});
Template.MainGameLayout.events({
    'click .game-description': function () {
        Session.set('MainGameCurrentGame', this.gameTemplate);
},
    'click #game_background': function () {
        Session.set('MainGameCurrentGame', 'gamebg');
    }
});