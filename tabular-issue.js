if (Meteor.isClient) {
    // counter starts at 0
    Session.setDefault("counter", 0);

    Template.hello.helpers({
        counter: function () {
            return Session.get("counter");
        }
    });

    Template.hello.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set("counter", Session.get("counter") + 1);
        }
    });
}

Text = new Meteor.Collection("text");
TabularTables = {};

Meteor.isClient && Template.registerHelper("TabularTables", TabularTables);


TabularTables.Text = new Tabular.Table({
    name: "Text",
    collection: Text,
    order: [[0, "desc"]],
    columns: [
        {
            title: "Number",
            data: "number"
        },
        {
            title: "Another Number",
            data: "another_number"
        }
    ]
});


if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

        text_docs = Text.find;
        if (text_docs.length < 1) {
            for (i = 1; i <= 1000; i++) {

                new_doc = {};
                new_doc.number = i;
                new_doc.another_number = i * i;



                Text.insert(new_doc)
            }
        }
    });
}
