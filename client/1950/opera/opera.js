var operas = [
    {name: '鳳閣恩仇未了情', coverImg: '1鳳閣恩仇未了情.png', description: '講述一名金朝將軍在護送郡主前往出嫁的路上，二人依依不捨之情。', video: '1鳳閣恩仇未了情.mp4'},
    {name: '四郎探母', coverImg: '2四郎探母.png', description: '講述北宋時期四郎因思母，得公主出策助其出關，與家人團聚。', video: '2四郎探母.mp4'},
    {name: '百戰榮歸迎彩鳳', coverImg: '3百戰榮歸迎彩鳳.png', description: '講述宋國勢弱時，彩鳳宮主出嫁時挑起的戰爭。', video: '3百戰榮歸迎彩鳳.mp4'},
    {name: '花木蘭', coverImg: '4花木蘭.png', description: '講述北魏時，花木蘭年紀輕輕卻女扮男裝，代父從軍，出征打仗。', video: '4花木蘭.mp4'},
];
var video;

Template.opera.onRendered(function () {
    Session.set('game1950OperaCompletedContent', []);
    video = videojs(
        "opera_video",
        {"controls": true, "autoplay": true,"techOrder":["html5"],preload:"auto"},
    );
    video.ready(function () {
        var player = this;
        player.on('ended', function() {
            MainGame.increaseHp(300);
            var completedArr = Session.get('game1950OperaCompletedContent');
            if(completedArr.indexOf(Session.get('game1950OperaSelectedContent').name) < 0) {
                completedArr.push(Session.get('game1950OperaSelectedContent').name);
                Session.set('game1950OperaCompletedContent', completedArr);
                Session.set('Game1950OperaVideoPlayCompleted', true);
            }
            var completed = Session.get('MainGameCompletedCheckPoint');
            if(completed.indexOf(Session.get('MainGameCurrentGame')) < 0) {
                completed.push(Session.get('MainGameCurrentGame'));
                Session.set('MainGameCompletedCheckPoint', completed);
            }
        });
    });
    $('.modal').modal({
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            video.src('/resources/games/Game1950opera/video/'+Session.get('game1950OperaSelectedContent').video);
            video.play();
            Session.set('Game1950OperaVideoPlayCompleted', false);
            MainGame.increaseMp(-200);
        },
        complete: function() {
            video.pause();
        }
    });
});

Template.opera.helpers({
    gameDone: function () {
        return Session.get('game1950OperaCompletedContent').length == operas.length;
    },
    gameStarted: function () {
        return Session.get('game1950operaStarted');
    },
    hasEnoughMoney: function () {
        return Session.get('MainGameMP') >= 200;
    },
    isVideoCompleted: function () {
        return Session.get('game1950OperaCompletedContent').indexOf(this.name) >= 0;
    },
    isVideoPlayCompleted: function () {
        return Session.get('Game1950OperaVideoPlayCompleted');
    },
    opera: function () {
        return operas;
    },
    pageOne: function () {
        return !Session.get('game1950operaStartedPageOne');
    },
    selectedName: function () {
        return Session.get('game1950OperaSelectedContent').name;
    },
    selectedVideo: function () {
        return Session.get('game1950OperaSelectedContent').video;
    }
});

Template.opera.events({
    'click #1950_opera_leave': function () {
        var completed = Session.get('MainGameCompletedCheckPoint');
        if(completed.indexOf(Session.get('MainGameCurrentGame')) < 0) {
            completed.push(Session.get('MainGameCurrentGame'));
            Session.set('MainGameCompletedCheckPoint', completed);
        }
        Session.set('MainGameCurrentGame', null);
    },
    'click .opera-play-video': function () {
        Session.set('game1950OperaSelectedContent', this);
        $('#modal1').modal('open');
        var modal = document.getElementsByClassName("modal-overlay")[0];
        $('.modal-overlay').remove();
        $('#main_game_content .container').append(modal);
    },
    'click #start_1950_opera_game': function () {
        Session.set('game1950operaStarted', true);
    },
    'click #start_1950_opera_next': function () {
        Session.set('game1950operaStartedPageOne', true);
    }
});
