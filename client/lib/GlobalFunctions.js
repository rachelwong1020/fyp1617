/**
 * Created by Ansonmouse on 31/3/2017.
 */
MainGame = {
    increaseHp: function (increaseScore) {
        Session.set('MainGameHP', Session.get('MainGameHP')+increaseScore);
    },
    increaseKp: function (increaseScore) {
        Session.set('MainGameKP', Session.get('MainGameKP')+increaseScore);
    },
    increaseMp: function (increaseScore) {
        Session.set('MainGameMP', Session.get('MainGameMP')+increaseScore);
    }
};