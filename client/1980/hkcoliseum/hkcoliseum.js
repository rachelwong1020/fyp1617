var concerts = [
    {name: 'Beyond 演唱會', coverImg: 'beyond.png', description: '香港殿堂級傳奇搖滾樂隊，亦是華人樂壇上最具代表性的樂隊之一', video: 'Beyond.mp4'},
    {name: '張國榮x梅艷芳 演唱會', coverImg: 'cheungmui.png', description: '是香港樂壇的天王巨星及舞台女王，是粵語歌輝煌盛期的標誌性人物', video: 'cheungmui.mp4'},
    {name: '林子祥 演唱會', coverImg: 'lamlam.png', description: '他有獨一無二的演繹方法和卓越的創作才能，獲評為「香港樂壇最強音」', video: 'lamlam.mp4'},
    {name: '羅文x甄妮x譚詠麟x徐小鳯 演唱會', coverImg: 'manyppl.png', description: '這些歌手都在香港樂壇的黃金年代嶄露頭角，成為樂壇中堅力量', video: 'manyppl.mp4'},
];
var video;

Template.hkcoliseum.onRendered(function () {
    if(!Session.get('game1980HkcoliseumCompletedContent')) {
        Session.set('game1980HkcoliseumCompletedContent', []);
    }
    video = videojs(
        "hkcoliseum_video",
        {"controls": true, "autoplay": true,"techOrder":["html5"],preload:"auto"},
    );
    video.ready(function () {
        var player = this;
        player.on('ended', function() {
            Session.set('Game1980HkcoliseumVideoPlayCompleted', true);
            MainGame.increaseHp(300);
            var completedArr = Session.get('game1980HkcoliseumCompletedContent');
            if(completedArr.indexOf(Session.get('game1980HkcoliseumSelectedContent').name) < 0) {
                completedArr.push(Session.get('game1980HkcoliseumSelectedContent').name);
                Session.set('game1980HkcoliseumCompletedContent', completedArr);
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
            video.src('/resources/games/Game1980hkcoliseum/video/'+Session.get('game1980HkcoliseumSelectedContent').video);
            video.play();
            Session.set('Game1980HkcoliseumVideoPlayCompleted', false);
            MainGame.increaseMp(-200);
        },
        complete: function() {
            video.pause();
        }
    });
});
Template.hkcoliseum.helpers({
    gameDone: function () {
        return Session.get('game1980HkcoliseumCompletedContent').length == concerts.length;
    },
    gameStarted: function () {
        return Session.get('game1980hkcoliseumStarted');
    },
    hasEnoughMoney: function () {
        return Session.get('MainGameMP') >= 200;
    },
    isVideoCompleted: function () {
        return Session.get('game1980HkcoliseumCompletedContent').indexOf(this.name) >= 0;
    },
    isVideoPlayCompleted: function () {
        return Session.get('Game1980HkcoliseumVideoPlayCompleted');
    },
    hkcoliseum: function () {
        return concerts;
    },
    pageOne: function () {
        return !Session.get('game1980hkcoliseumStartedPageOne');
    },
    selectedName: function () {
        return Session.get('game1980HkcoliseumSelectedContent').name;
    },
    selectedVideo: function () {
        return Session.get('game1980HkcoliseumSelectedContent').video;
    }
});

Template.hkcoliseum.events({
    'click #1980_hkcoliseum_leave': function () {
        var completed = Session.get('MainGameCompletedCheckPoint');
        if(completed.indexOf(Session.get('MainGameCurrentGame')) < 0) {
            completed.push(Session.get('MainGameCurrentGame'));
            Session.set('MainGameCompletedCheckPoint', completed);
        }
        Session.set('MainGameCurrentGame', null);
    },
    'click .hkcoliseum-play-video': function () {
        Session.set('game1980HkcoliseumSelectedContent', this);
        $('#modal1').modal('open');
        var modal = document.getElementsByClassName("modal-overlay")[0];
        $('.modal-overlay').remove();
        $('#main_game_content .container').append(modal);
    },
    'click #start_1980_hkcoliseum_game': function () {
        Session.set('game1980hkcoliseumStarted', true);
    },
    'click #start_1980_hkcoliseum_next': function () {
        Session.set('game1980hkcoliseumStartedPageOne', true);
    }
});
