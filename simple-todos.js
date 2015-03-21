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
  //Add event listeners to task template
  Template.task.events({
    "click .toggle-checked": function() {
      Tasks.update(this._id, {$set: {checked: ! this.checked}}); // when checkbox is clicked, toggle checked in mongoDB collection row 
    },
    "click .delete": function() {
      Tasks.remove(this._id); // remove element from mongoDB collection
    }
  });

}
