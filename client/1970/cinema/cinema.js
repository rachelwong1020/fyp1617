var movies = [
    {name: '半斤八兩', coverImg: '半斤八兩.jpg', description: '1976年 - 主演：許冠文、許冠傑、許冠英', video: '半斤八兩1976.mp4'},
    {name: '精武門', coverImg: '精武門.jpg', description: '1972年 - 主演：李小龍、苗可秀', video: '精武門1972.mp4'},
    {name: '鬼馬雙星', coverImg: '鬼馬雙星.jpg', description: '1974年 - 主演：許冠文、許冠傑', video: '鬼馬雙星1974.mp4'},
    {name: '龍爭虎鬥', coverImg: '龍爭虎鬥.jpg', description: '1973年 - 主演：李小龍、尊薩遜、鍾玲玲', video: '龍爭虎鬥1973.mp4'},
];
var video;

Template.cinema.onRendered(function () {
    if(!Session.get('game1970CinemaCompletedContent')) {
        Session.set('game1970CinemaCompletedContent', []);
    }
    video = videojs(
        "cinema_video",
        {"controls": true, "autoplay": true,"techOrder":["html5"],preload:"auto"},
    );
    video.ready(function () {
        var player = this;
        player.on('ended', function() {
            Session.set('Game1970CinemaVideoPlayCompleted', true);
            MainGame.increaseHp(300);
            var completedArr = Session.get('game1970CinemaCompletedContent');
            if(completedArr.indexOf(Session.get('game1970CinemaSelectedContent').name) < 0) {
                completedArr.push(Session.get('game1970CinemaSelectedContent').name);
                Session.set('game1970CinemaCompletedContent', completedArr);
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
            video.src('/resources/games/Game1970cinema/video/'+Session.get('game1970CinemaSelectedContent').video);
            video.play();
            Session.set('Game1970CinemaVideoPlayCompleted', false);
            MainGame.increaseMp(-200);
        },
        complete: function() {
            video.pause();
        }
    });
});
Template.cinema.helpers({
    gameDone: function () {
        return Session.get('game1970CinemaCompletedContent').length == movies.length;
    },
    gameStarted: function () {
        return Session.get('game1970CinemaStarted');
    },
    hasEnoughMoney: function () {
        return Session.get('MainGameMP') >= 200;
    },
    isVideoCompleted: function () {
        return Session.get('game1970CinemaCompletedContent').indexOf(this.name) >= 0;
    },
    isVideoPlayCompleted: function () {
        return Session.get('Game1970CinemaVideoPlayCompleted');
    },
    cinema: function () {
        return movies;
    },
    pageOne: function () {
        return !Session.get('game197CinemaStartedPageOne');
    },
    selectedName: function () {
        return Session.get('game1970CinemaSelectedContent').name;
    },
    selectedVideo: function () {
        return Session.get('game1970CinemaSelectedContent').video;
    }
});

Template.cinema.events({
    'click #1970_cinema_leave': function () {
        var completed = Session.get('MainGameCompletedCheckPoint');
        if(completed.indexOf(Session.get('MainGameCurrentGame')) < 0) {
            completed.push(Session.get('MainGameCurrentGame'));
            Session.set('MainGameCompletedCheckPoint', completed);
        }
        Session.set('MainGameCurrentGame', null);
    },
    'click .cinema-play-video': function () {
        Session.set('game1970CinemaSelectedContent', this);
        $('#modal1').modal('open');
        var modal = document.getElementsByClassName("modal-overlay")[0];
        $('.modal-overlay').remove();
        $('#main_game_content .container').append(modal);
    },
    'click #start_1970_cinema_game': function () {
        Session.set('game1970cinemaStarted', true);
    },
    'click #start_1970_cinema_next': function () {
        Session.set('game1970cinemaStartedPageOne', true);
    }
});
