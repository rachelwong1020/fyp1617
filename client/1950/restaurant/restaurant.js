var food = [
    {name: '鵪鶉蛋燒賣皇', description: '原粒鵪鶉蛋呈溏心狀態，一咬蛋汁四溢，教人一試難忘！', price: 200, coverImg: 'siumai.jpg'},
    {name: '蝦醬腩仔蒸飯', description: '這飯用上肥腩隔住的五花腩， 蒸出來特別爽滑！', price: 300, coverImg: 'rice.jpg'},
    {name: '香滑鮮蝦腸粉', description: '腸粉晶瑩剔透，粉皮能整張夾起不斷裂！', price: 100, coverImg: 'cheungfun.jpg'},
    {name: '古法千層糕', description: '香香甜甜絕對是小朋友至愛啊！', price: 100, coverImg: 'go.jpg'},
    {name: '豉汁鳳爪', description: '豉汁鳳爪是必要吃的點心之一，雖然功夫較多但味道很好！', price: 200, coverImg: 'chickleg.jpg'},
    {name: '荷葉珍珠雞', description: '軟軟的糯米飯包裹著豐富的餡料，蒸過後荷葉清香完全融入材料中！', price: 100, coverImg: 'pearlchick.jpg'}
];
var currentTime;
Template.restaurant.onCreated(function () {
    currentTime = moment();
});
Template.restaurant.onRendered(function () {
    Session.set('Game1950restaurantOrder', []);
    Session.set('game1950restaurantDone', false);
});
Template.restaurant.helpers({
    hasOrderedFood: function () {
        var foods = Session.get('Game1950restaurantOrder');
        for(var i = 0; i < foods.length; i++) {
            if(foods[i].name == this.name) {
                return true;
            }
        }
        return false;
    },
    gameDone: function () {
        return Session.get('game1950restaurantDone');
    },
    food: function () {
        return food;
    },
    hasEnoughMoney: function () {
        var total = 0;
        var foods = Session.get('Game1950restaurantOrder');
        for(var i = 0; i < foods.length; i++) {
            total += foods[i].price * foods[i].orderAmount;
        }
        return total <= Session.get('MainGameMP');
    },
    hasPickedFood: function () {
        return Session.get('Game1950restaurantOrder').length > 0;
    },
    invoiceNum: function () {
        return parseInt(getRandomArbitrary(1000000, 9999999));
    },
    invoiceTime: function () {
        return currentTime.format('YYYY - MM - DD HH:mm:ss');
    },
    orderedAmount: function () {
        var total = 0;
        var foods = Session.get('Game1950restaurantOrder');
        for(var i = 0; i < foods.length; i++) {
            total += foods[i].price * foods[i].orderAmount;
        }
        return total.toFixed(2);
    },
    orderedFood: function () {
        return Session.get('Game1950restaurantOrder');
    },
    tableNum: function () {
        return parseInt(getRandomArbitrary(10, 30));
    },
    totalPrice: function () {
        var total = 0;
        var foods = Session.get('Game1950restaurantOrder');
        for(var i = 0; i < foods.length; i++) {
            total += foods[i].price * foods[i].orderAmount;
        }
        return total;
    }
});

Template.restaurant.events({
    'click #check_out': function () {
        var total = 0;
        var foods = Session.get('Game1950restaurantOrder');
        for(var i = 0; i < foods.length; i++) {
            total += foods[i].price * foods[i].orderAmount;
        }
        MainGame.increaseMp(total*-1);
        MainGame.increaseHp(total);
        Session.set('game1950restaurantDone', true);
    },
    'click #food_add': function () {
        var foods = Session.get('Game1950restaurantOrder');
        for(var i = 0; i < foods.length; i++) {
            if(foods[i].name == this.name) {
                foods[i].orderAmount += 1;
                Session.set('Game1950restaurantOrder', foods);
                return;
            }
        }
        var newFood = this;
        newFood.orderAmount = 1;
        foods.push(newFood);
        Session.set('Game1950restaurantOrder', foods);
    },
    'click #food_remove': function () {
        var foods = Session.get('Game1950restaurantOrder');
        for(var i = 0; i < foods.length; i++) {
            if(foods[i].name == this.name) {
                if(foods[i].orderAmount == 1) {
                    var newArr = [];
                    for(var j = 0; j < foods.length; j++) {
                        if(foods[j].name != this.name) {
                            newArr.push(foods[j]);
                        }
                    }
                    Session.set('Game1950restaurantOrder', newArr);
                    return;
                } else {
                    foods[i].orderAmount -= 1;
                    Session.set('Game1950restaurantOrder', foods);
                    return;
                }
            }
        }
    },
    'click #game_1950_restaurant_leave': function () {
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