var jade = [
    {price: 200, coverImg: 'jade1.png'},
    {price: 100, coverImg: 'jade2.png'},
    {price: 100, coverImg: 'jade3.png'},
    {price: 200, coverImg: 'jade4.png'},
    {price: 100, coverImg: 'jade5.png'},
    {price: 300, coverImg: 'jade6.png'}
];
Template.jademarket.onRendered(function () {
    Session.set('Game1980jademarketOrder', []);
    Session.set('game1980jademarketDone', false);
});
Template.jademarket.helpers({
    hasOrderedJade: function () {
        var jades = Session.get('Game1980jademarketOrder');
        for(var i = 0; i < jades.length; i++) {
            if(jades[i].name == this.name) {
                return true;
            }
        }
        return false;
    },
    gameDone: function () {
        return Session.get('game1980jademarketDone');
    },
    jade: function () {
        return jade;
    },
    hasEnoughMoney: function () {
        var total = 0;
        var jades = Session.get('Game1980jademarketOrder');
        for(var i = 0; i < jades.length; i++) {
            total += jades[i].price * jades[i].orderAmount;
        }
        return total <= Session.get('MainGameMP');
    },
    hasPickedJade: function () {
        return Session.get('Game1980jademarketOrder').length > 0;
    },
    /*invoiceNum: function () {
        return parseInt(getRandomArbitrary(1000000, 9999999));
    },
    invoiceTime: function () {
        return currentTime.format('YYYY - MM - DD HH:mm:ss');
    },*/
    orderedAmount: function () {
        var total = 0;
        var jades = Session.get('Game1980jademarketOrder');
        for(var i = 0; i < jades.length; i++) {
            total += jades[i].price * jades[i].orderAmount;
        }
        return total.toFixed(2);
    },
    orderedJade: function () {
        return Session.get('Game1980jademarketOrder');
    },
    /*tableNum: function () {
        return parseInt(getRandomArbitrary(10, 30));
    },*/
    totalPrice: function () {
        var total = 0;
        var jades = Session.get('Game1980jademarketOrder');
        for(var i = 0; i < jades.length; i++) {
            total += jades[i].price * jades[i].orderAmount;
        }
        return total;
    }
});

Template.jademarket.events({
    'click #check_out': function () {
        var total = 0;
        var jades = Session.get('Game1980jademarketOrder');
        for(var i = 0; i < jades.length; i++) {
            total += jades[i].price * jades[i].orderAmount;
        }
        MainGame.increaseMp(total*-1);
        MainGame.increaseHp(total);
        Session.set('game1980jademarketDone', true);
    },
    'click #jade_add': function () {
        var jades = Session.get('Game1980jademarketOrder');
        for(var i = 0; i < jades.length; i++) {
            if(jades[i].name == this.name) {
                jades[i].orderAmount += 1;
                Session.set('Game1980jademarketOrder', jades);
                return;
            }
        }
        var newJade = this;
        newJade.orderAmount = 1;
        jades.push(newJade);
        Session.set('Game1980jademarketOrder', jades);
    },
    'click #jade_remove': function () {
        var jades = Session.get('Game1980jademarketOrder');
        for(var i = 0; i < jades.length; i++) {
            if(jades[i].name == this.name) {
                if(jades[i].orderAmount == 1) {
                    var newArr = [];
                    for(var j = 0; j < jades.length; j++) {
                        if(jades[j].name != this.name) {
                            newArr.push(jades[j]);
                        }
                    }
                    Session.set('Game1980jademarketOrder', newArr);
                    return;
                } else {
                    jades[i].orderAmount -= 1;
                    Session.set('Game1980jademarketOrder', jades);
                    return;
                }
            }
        }
    },
    'click #game_1980_jademarket_leave': function () {
        var completed = Session.get('MainGameCompletedCheckPoint');
        if(completed.indexOf(Session.get('MainGameCurrentGame')) < 0) {
            completed.push(Session.get('MainGameCurrentGame'));
            Session.set('MainGameCompletedCheckPoint', completed);
        }
        Session.set('MainGameCurrentGame', null);
    },
    'click #leave_without_checkout': function () {
        Session.set('MainGameCurrentGame', null);
    }
});

/*function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}*/