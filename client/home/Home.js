Template.Home.helpers({

});
Template.Home.events({
    'click #start_game': function () {
        FlowRouter.go('before-1950-main');
    }
});