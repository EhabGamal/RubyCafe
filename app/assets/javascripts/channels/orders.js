if(!window.App.Channels){
    window.App.Channels = {}
}
if(!window.App.Channels.Orders){
    window.App.Channels.Orders={}
}
App.Channels.Orders.subscribe = function() {
    App.cable.subscriptions.create("OrdersChannel", {
        connected: function () {
            // Called when the subscription is ready for use on the server
            
            console.log("connected to orders channel")
        },

        disconnected: function () {
            // Called when the subscription has been terminated by the server
        },

        received: function (data) {
            // Called when there's incoming data on the websocket for this channel
            console.log("data from orders channel")
             if(data.action=='update'){
                 event=new CustomEvent('order_updated_state',{'detail':data.order});
                 window.dispatchEvent(event);

           
        }
        }
    });
}
