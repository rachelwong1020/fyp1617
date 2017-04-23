var product = [
    {name: '傳呼機', description: '能接收和傳送簡易文字信息功能的個人無線電通訊工具。', price: 200, coverImg: 'callgay.png'},
    {name: '檸檬王', description: '味道香甜，具清熱解毒、袪痰止咳等功效。', price: 100, coverImg: 'lemonlam.png'},
    {name: '嗱喳麵', description: '香港特色廉價麵食，', price: 100, coverImg: 'noodles.png'},
    {name: '飛機欖', description: '因小販會拋上樓上售賣如放紙飛機一樣而命名。', price: 100, coverImg: 'planelam.png'}
];
/*var currentTime;
Template.outdoormarket.onCreated(function () {
    currentTime = moment();
});*/
Template.outdoormarket.onRendered(function () {
    Session.set('Game1970outdoormarketOrder', []);
    Session.set('game1970outdoormarketDone', false);
});
Template.outdoormarket.helpers({
    hasOrderedProduct: function () {
        var products = Session.get('Game1970outdoormarketOrder');
        for(var i = 0; i < products.length; i++) {
            if(products[i].name == this.name) {
                return true;
            }
        }
        return false;
    },
    gameDone: function () {
        return Session.get('game1970outdoormarketDone');
    },
    product: function () {
        return product;
    },
    hasEnoughMoney: function () {
        var total = 0;
        var products = Session.get('Game1970outdoormarketOrder');
        for(var i = 0; i < products.length; i++) {
            total += products[i].price * products[i].orderAmount;
        }
        return total <= Session.get('MainGameMP');
    },
    hasPickedProduct: function () {
        return Session.get('Game1970outdoormarketOrder').length > 0;
    },
    invoiceNum: function () {
        return parseInt(getRandomArbitrary(1000000, 9999999));
    },
    /*invoiceTime: function () {
        return currentTime.format('YYYY - MM - DD HH:mm:ss');
    },*/
    orderedAmount: function () {
        var total = 0;
        var products = Session.get('Game1970outdoormarketOrder');
        for(var i = 0; i < products.length; i++) {
            total += products[i].price * products[i].orderAmount;
        }
        return total.toFixed(2);
    },
    orderedProduct: function () {
        return Session.get('Game1970outdoormarketOrder');
    },
    tableNum: function () {
        return parseInt(getRandomArbitrary(10, 30));
    },
    totalPrice: function () {
        var total = 0;
        var products = Session.get('Game1970outdoormarketOrder');
        for(var i = 0; i < products.length; i++) {
            total += products[i].price * products[i].orderAmount;
        }
        return total;
    }
});

Template.outdoormarket.events({
    'click #check_out': function () {
        var total = 0;
        var products = Session.get('Game1970outdoormarketOrder');
        for(var i = 0; i < products.length; i++) {
            total += products[i].price * products[i].orderAmount;
        }
        MainGame.increaseMp(total*-1);
        MainGame.increaseHp(total);
        Session.set('game1970outdoormarketDone', true);
    },
    'click #product_add': function () {
        var products = Session.get('Game1970outdoormarketOrder');
        for(var i = 0; i < products.length; i++) {
            if(products[i].name == this.name) {
                products[i].orderAmount += 1;
                Session.set('Game1970outdoormarketOrder', products);
                return;
            }
        }
        var newProduct = this;
        newProduct.orderAmount = 1;
        products.push(newProduct);
        Session.set('Game1970outdoormarketOrder', products);
    },
    'click #product_remove': function () {
        var products = Session.get('Game1970outdoormarketOrder');
        for(var i = 0; i < products.length; i++) {
            if(products[i].name == this.name) {
                if(products[i].orderAmount == 1) {
                    var newArr = [];
                    for(var j = 0; j < products.length; j++) {
                        if(products[j].name != this.name) {
                            newArr.push(products[j]);
                        }
                    }
                    Session.set('Game1970outdoormarketOrder', newArr);
                    return;
                } else {
                    products[i].orderAmount -= 1;
                    Session.set('Game1970outdoormarketOrder', products);
                    return;
                }
            }
        }
    },
    'click #game_1970_outdoormarket_leave': function () {
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

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}