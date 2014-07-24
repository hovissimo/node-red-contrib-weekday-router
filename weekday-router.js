module.exports = function(RED) {
    "use strict";

    // The main node definition - most things happen in here
    function WeekdayRouterNode(n) {
        // Create a RED node
        RED.nodes.createNode(this,n);

        // Store local copies of the node configuration (as defined in the .html)
        this.topic = n.topic;

        // Do whatever you need to do in here - declare callbacks etc
        this.on('input', function(msg) {
            //msg.date is expected to be a Date object --hovis
            var weekday;
            try {
                weekday = msg.date.getDay();
            } catch (e) {
                weekday = (new Date()).getDay();
            }

            // put the message on the correct output
            var messages = [null, null, null, null, null, null, null];
            messages[weekday] = msg;

            // and send it along
            this.send(messages);
        });
        // send out the message to the rest of the workspace.

        this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: this.client.disconnect();
        });
    }

    // Register the node by name. This must be called before overriding any of the Node functions.
    RED.nodes.registerType("weekday router",WeekdayRouterNode);
}
