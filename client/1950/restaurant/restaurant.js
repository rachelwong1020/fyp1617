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
    selectedName: function () {
        return Session.get('game1950RestaurantSelectedContent').name;
    },
    tableNum: function () {
        return parseInt(getRandomArbitrary(10, 30));
    },
    totalPrice: function () {
    }
});

Template.restaurant.events({
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
    }
});

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}