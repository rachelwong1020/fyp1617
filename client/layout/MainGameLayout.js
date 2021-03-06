Template.MainGameLayout.onRendered(function () {
    Session.set('MainGameCompletedCheckPoint', []);
    Session.set('MainGameCurrentGame', null);
    $('.collapsible').collapsible();
    if(!Session.get('MainGameKP')) {
        Session.set('MainGameKP', 100);
    }
    if(!Session.get('MainGameMP') && Session.get('MainGameMP') != 0) {
        Session.set('MainGameMP', 1000);
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
    hasAtLeastOneCOmplete: function () {
        return Session.get('MainGameCompletedCheckPoint').length > 0;
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
        switch (Session.get('currentMain')) {
            case '1950':
                Session.set('MainGameCurrentGame', 'badge1950');
                break;
            case '1960':
                Session.set('MainGameCurrentGame', 'badge1960');
                break;
            case '1970':
                Session.set('MainGameCurrentGame', 'badge1970');
                break;
            case '1980':
                Session.set('MainGameCurrentGame', 'badge1980');
                break;
        }
    },
    'click #main_game_leave': function () {
        Session.set('MainGameCompletedCheckPoint', []);
        switch (Session.get('currentMain')) {
            case '1950':
                FlowRouter.go('1960-main');
                break;
            case '1960':
                FlowRouter.go('1970-main');
                break;
            case '1970':
                FlowRouter.go('1980-main');
                break;
            case '1980':
                FlowRouter.go('ranking');
                break;
        }
    }
});