/**
 * Created by Ansonmouse on 25/2/2017.
 */
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
            BlazeLayout.render('MainGameLayout', {main: 'Main1950'});
        } else {
            FlowRouter.go('1950-main');
        }
    }
});