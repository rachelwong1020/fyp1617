var operas = [
    {name: '鳳閣恩仇未了情', coverImg: '1鳳閣恩仇未了情.png', description: '講述一名金朝將軍在護送郡主前往出嫁的路上，二人依依不捨之情。', video: '1鳳閣恩仇未了情.mp4'},
    {name: '四郎探母', coverImg: '2四郎探母.png', description: '講述北宋時期四郎因思母，得公主出策助其出關，與家人團聚。', video: '2四郎探母.mp4'},
    {name: '百戰榮歸迎彩鳳', coverImg: '3百戰榮歸迎彩鳳.png', description: '講述宋國勢弱時，彩鳳宮主出嫁時挑起的戰爭。', video: '3百戰榮歸迎彩鳳.mp4'},
    {name: '花木蘭', coverImg: '4花木蘭.png', description: '講述北魏時，花木蘭年紀輕輕卻女扮男裝，代父從軍，出征打仗。', video: '4花木蘭.mp4'},
];

Template.opera.onRendered(function () {
    $('.modal').modal({
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            videojs(
                "opera_video",
                {"controls": true, "autoplay": true,"techOrder":["html5"],preload:"auto"},
            );
        },
    });
});

Template.opera.helpers({
    gameDone: function () {
        return Session.get('game1950operaDone');
    },
    opera: function () {
        return operas;
    },
    selectedName: function () {
        return Session.get('game1950OperaSelectedContent').name;
    },
    selectedVideo: function () {
        return Session.get('game1950OperaSelectedContent').video;
    }
});

Template.opera.events({
    'click .opera-play-video': function () {
        Session.set('game1950OperaSelectedContent', this);
        $('#modal1').modal('open');
    }
});
