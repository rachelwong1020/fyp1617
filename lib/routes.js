FlowRouter.triggers.enter([function () {
    if(Meteor.userId()) {
        var currentRoute = FlowRouter.current().route;
        var currentPage = currentRoute.options.name;
        Session.set('currentPage', currentPage);
        Session.set('currentMain', currentRoute.options.currentMain);
    } else {
        FlowRouter.go('home');
    }
}]);


FlowRouter.route('/', {
    name: 'home',
    currentMain: 'home',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'Home'});
    }
});
var eraBefore1950 = FlowRouter.group({
    prefix: '/before-1950',
    name: 'before-1950'
});
eraBefore1950.route('/', {
    name: 'before-1950-main',
    currentMain: 'before-1950',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'MainBefore1950'});
    }
});
eraBefore1950.route('/admin', {
    name: 'before-1950-admin',
    currentMain: 'before-1950',
    action() {
        BlazeLayout.render('SimpleLayout', {main: 'Before1950Admin'});
    }
});
var era1950 = FlowRouter.group({
    prefix: '/1950',
    name: '1950'
});
era1950.route('/', {
    name: '1950-main',
    currentMain: '1950',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'Main1950'});
    }
});
era1950.route('/main', {
    name: '1950-main-game',
    currentMain: '1950',
    action() {
        if(Session.get('game1950HeatDone')) {
            Session.set('MainGameCheckPoints', Meteor.settings.public.mainGame.main1950.checkPoints);
            //Session.set('MainGameCurrentGame', null);
            BlazeLayout.render('MainGameLayout', {main: 'Main1950'});
        } else {
            FlowRouter.go('1950-main');
        }
    }
});

var era1960 = FlowRouter.group({
    prefix: '/1960',
    name: '1960'
});
era1960.route('/', {
    name: '1960-main',
    currentMain: '1960',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'Main1960'});
    }
});
era1960.route('/main', {
    name: '1960-main-game',
    currentMain: '1960',
    action() {
        //if(Session.get('game1950HeatDone')) {
            Session.set('MainGameCheckPoints', Meteor.settings.public.mainGame.main1960.checkPoints);
            BlazeLayout.render('MainGameLayout', {main: 'Main1960'});
        /*} else {
            FlowRouter.go('1960-main');
        }
    */}
});

var era1970 = FlowRouter.group({
    prefix: '/1970',
    name: '1970'
});
era1970.route('/', {
    name: '1970-main',
    currentMain: '1970',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'Main1970'});
    }
});
era1970.route('/main', {
    name: '1970-main-game',
    currentMain: '1970',
    action() {
        //if(Session.get('game1950HeatDone')) {
        Session.set('MainGameCheckPoints', Meteor.settings.public.mainGame.main1970.checkPoints);
        BlazeLayout.render('MainGameLayout', {main: 'Main1970'});
        /*} else {
         FlowRouter.go('1960-main');
         }
         */}
});

var era1980 = FlowRouter.group({
    prefix: '/1980',
    name: '1980'
});
era1980.route('/', {
    name: '1980-main',
    currentMain: '1980',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'Main1980'});
    }
});
era1980.route('/main', {
    name: '1980-main-game',
    currentMain: '1980',
    action() {
        //if(Session.get('game1950HeatDone')) {
        Session.set('MainGameCheckPoints', Meteor.settings.public.mainGame.main1980.checkPoints);
        BlazeLayout.render('MainGameLayout', {main: 'Main1980'});
        /*} else {
         FlowRouter.go('1960-main');
         }
         */}
});

FlowRouter.route('/gamebg', {
    name: 'gamebg',
    currentMain: 'gamebg',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'gamebg'});
    }
});

FlowRouter.route('/badge1950', {
    name: 'badge1950',
    currentMain: 'badge1950',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'badge1950'});
    }
});

FlowRouter.route('/badge1960', {
    name: 'badge1960',
    currentMain: 'badge1960',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'badge1960'});
    }
});

FlowRouter.route('/badge1970', {
    name: 'badge1970',
    currentMain: 'badge1970',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'badge1970'});
    }
});

FlowRouter.route('/badge1980', {
    name: 'badge1980',
    currentMain: 'badge1980',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'badge1980'});
    }
});

FlowRouter.route('/ranking', {
    name: 'ranking',
    currentMain: 'ranking',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'ranking'});
    }
});

FlowRouter.route('/hawker', {
    name: 'hawker',
    currentMain: 'hawker',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'hawker'});
    }
});

FlowRouter.route('/opera', {
    name: 'opera',
    currentMain: 'opera',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'opera'});
    }
});

FlowRouter.route('/restaurant', {
    name: 'restaurant',
    currentMain: 'restaurant',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'restaurant'});
    }
});

FlowRouter.route('/lamtsuen', {
    name: 'lamtsuen',
    currentMain: 'lamtsuen',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'Game1960Lamtsuen'});
    }
});

FlowRouter.route('/kowloon', {
    name: 'kowloon',
    currentMain: 'kowloon',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'kowloon'});
    }
});

FlowRouter.route('/cinema', {
    name: 'cinema',
    currentMain: 'cinema',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'cinema'});
    }
});

FlowRouter.route('/outdoormarket', {
    name: 'outdoormarket',
    currentMain: 'outdoormarket',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'outdoormarket'});
    }
});

FlowRouter.route('/hkcoliseum', {
    name: 'hkcoliseum',
    currentMain: 'hkcoliseum',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'hkcoliseum'});
    }
});

FlowRouter.route('/jademarket', {
    name: 'jademarket',
    currentMain: 'jademarket',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'jademarket'});
    }
});

FlowRouter.route('/testing', {
    name: 'testing',
    currentMain: 'testing',
    action() {
        BlazeLayout.render('HomeLayout', {main: 'testing'});
    }
})