var food = [
    {name: '鵪鶉蛋燒賣皇', coverImg: 'siumai.jpg'},
    {name: '蝦醬腩仔蒸飯', coverImg: 'rice.jpg'},
    {name: '香滑鮮蝦腸粉', coverImg: 'cheungfun.jpg'},
    {name: '古法千層糕', coverImg: 'go.jpg'},
    {name: '豉汁鳳爪', coverImg: 'chickleg.jpg'},
    {name: '荷葉珍珠雞', coverImg: 'pearlchick.jpg'}
];
Template.restaurant.helpers({
    gameDone: function () {
        return Session.get('game1950restaurantDone');
    },
    restaurant: function () {
        return food;
    },
    selectedName: function () {
        return Session.get('game1950RestaurantSelectedContent').name;
    },
});

Template.restaurant.events({

});

Template.restaurant.onRendered(function () {

})