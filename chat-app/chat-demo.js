Messages = new Mongo.Collection("msgs");

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish("messages", function () {
    return Messages.find({}, {sort: {createdAt: -1}, limit: 5});
  });
}

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("messages");

  Template.body.helpers({
    recentMessages: function () {
      return Messages.find({}, {sort: {createdAt: 1}});
    }
  });

  Template.body.events({
    "submit .new-message": function (event) {
      var text = event.target.text.value;

      Messages.insert({
        text: text,
        createdAt: new Date(),
        username: Meteor.user().username
      });

      event.target.text.value = "";
      return false;
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}
