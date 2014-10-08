// Lists --> {name : String}
Lists = new Mongo.Collection("lists");
Meteor.publish('lists', function () {
    return Lists.find();
});


// Todos --> {
//              text : String,
//              done : Boolean,
//              tags : [String, String, ...],
//              list_id : String,
//              timestamp : Number
//              }
Todos = new Mongo.Collection("todos");
Meteor.publish("todos", function (list_id) {
        check(list_id, String);
        return Todos.find({list_id : list_id});
});

