/**
 * Created by Ansonmouse on 25/2/2017.
 */
Handlebars.registerHelper('isLogin', function () {
    if(Meteor.userId()) {
        return true;
    }
    return false;
});
