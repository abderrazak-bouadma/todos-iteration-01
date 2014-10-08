//
// Mini Mongo Collections Mapping
Lists = new Mongo.Collection("lists");
Todos = new Mongo.Collection("todos");

//
// Subscription to published collections
Meteor.subscribe("lists");
Meteor.subscribe("todos", Session.get("list_id"));

//
// Sessions
// ID of currently selected list
Session.setDefault('list_id', null);


//
// TODOS TEMPLATE
Template.todos.helpers({
    todos : function () {
        return Todos.find();
    }
});




//
// LISTS TEMPLATE
Template.lists.helpers({
    lists : function() {
        return Lists.find();
    }
});

Template.lists.selected = function () {
    return Session.equals("list_id", this._id) ? 'selected' : '';
};

Template.lists.events({
    'mousedown .list' : function (evt) {
        Router.setList(this._id);
    },
    'click .list' : function (evt) {
        evt.preventDefault();
    }
});


//
// TAGS TEMPLATE
Template.tag_filter.helpers({

    // mock data
    tags : function(){
        var list = [
            {
                tag_text : "very important"
            },
            {
                tag_text : "critical"
            },
            {
                tag_text : "blocking"
            }
        ];
        return list;
    }
});

// Backbone Router
var TodosRouter = Backbone.Router.extend({
    routes : {
        ":list_id" : "main"
    },
    main : function (list_id) {
        var oldListId = Session.get("list_id");
        if (oldListId !== list_id) {
            Session.set("list_id", list_id);
            Session.set("tag_filter", null);
        }
    },
    setList : function (list_id) {
        this.navigate(list_id,true);
    }
});

Router = new TodosRouter;

Meteor.startup(function () {
    Backbone.history.start({pushState: true});
});
