/**
 * Created by Ansonmouse on 25/2/2017.
 */
Template.Game1950Heat.onRendered(function () {
    if(!Session.get('game1950HeatDone')) {
        (function(){
            var myMem = new Memory({
                wrapperID : "my-memory-game",
                cards : [
                    {
                        id : 1,
                        img: "/resources/games/Game1950Heat/img/house-01.png"
                    },
                    {
                        id : 2,
                        img: "/resources/games/Game1950Heat/img/house-02.png"
                    },
                    {
                        id : 3,
                        img: "/resources/games/Game1950Heat/img/house-03.png"
                    },
                    {
                        id : 4,
                        img: "/resources/games/Game1950Heat/img/house-04.png"
                    },
                    {
                        id : 5,
                        img: "/resources/games/Game1950Heat/img/house-05.png"
                    },
                    {
                        id : 6,
                        img: "/resources/games/Game1950Heat/img/house-06.png"
                    },
                    {
                        id : 7,
                        img: "/resources/games/Game1950Heat/img/house-07.png"
                    },
                    {
                        id : 8,
                        img: "/resources/games/Game1950Heat/img/house-08.png"
                    },
                    {
                        id : 9,
                        img: "/resources/games/Game1950Heat/img/house-09.png"
                    },
                ],
                onGameStart : function() { return false; },
                onGameEnd : function() { return false; }
            });
        })();
    }
});

Template.Game1950Heat.helpers({
    gameDone: function () {
        return Session.get('game1950HeatDone');
    }
});

Template.Game1950Heat.events({
    'click #before_1950_leave': function () {
        Session.set('MainGameCheckPoints', Meteor.settings.public.mainGame.main1950.checkPoints);
        FlowRouter.go('1950-main-game');
    }
});