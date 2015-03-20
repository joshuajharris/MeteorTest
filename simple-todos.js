Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Template.body.helpers({
    tasks: function() {
      return Tasks.find({}); // return contents of tasks collection
    }
  });
  // add an event listener to .new-task, listening for submit
  Template.body.events({
    "submit .new-task": function (event) {
      var text = event.target.text.value;
      // insert into mongodb collection
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      event.target.text.value = "";  // clear text field

      return false; // tell browser to not perform default form submit action
    }
  });

}
