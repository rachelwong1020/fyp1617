Template.MainGameLayout.onRendered(function () {
    Session.set('MainGameCompletedCheckPoint', []);
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
    checkPointComplete: function () {
        return Session.get('MainGameCompletedCheckPoint').indexOf(this.gameTemplate) >= 0;
    },
    gameMain: function () {
        return Session.get('MainGameCurrentGame');
    },
    hpPoint: function () {
        return Session.get('MainGameHP');
    },
    isAllMiniGameComplete: function () {
        return Session.get('MainGameCompletedCheckPoint').length == Session.get('MainGameCheckPoints').length;
    },
    kpPoint: function () {
        return Session.get('MainGameKP');
    },
    mpPoint: function () {
        return Session.get('MainGameMP');
    },
    timeLineImage: function () {
        switch (Session.get('currentMain')) {
            case '1950':
                return 'main_game_layout_timeline_1950.svg';
            case '1960':
                return 'main_game_layout_timeline_1960.svg';
            case '1970':
                return 'main_game_layout_timeline_1970.svg';
            case '1980':
                return 'main_game_layout_timeline_1980.svg';
        }
    }
});
Template.MainGameLayout.events({
    'click .game-description': function () {
        Session.set('MainGameCurrentGame', this.gameTemplate);
    },
    'click #game_background': function () {
        Session.set('MainGameCurrentGame', 'gamebg');
    },
    'click #game_badge': function () {
        Session.set('MainGameCurrentGame', 'badge1950');
    }
});