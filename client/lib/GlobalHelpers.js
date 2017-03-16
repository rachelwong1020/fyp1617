Handlebars.registerHelper('isLogin', function () {
    if(Meteor.userId()) {
        return true;
    }
    return false;
});
