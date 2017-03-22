Template.MainGameLayout.onRendered(function () {
    $('.collapsible').collapsible();
});
Template.MainGameLayout.helpers({
    checkPoint: function () {
        return Session.get('MainGameCheckPoints');
    },
    location: function () {
        
    },
    gameMain: function () {
        return Session.get('MainGameCurrentGame');
    },
    modalCotent: function () {
        return Session.get('MainGameModalContent');
    },
    modalTitle: function () {
        return Session.get('MainGameModalTitle');
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