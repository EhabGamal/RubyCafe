if(!window.App.Channels){
    window.App.Channels = {}
}
if(!window.App.Channels.Products){
    window.App.Channels.Products={}
}
App.Channels.Products.subscribe = function() {
    App.cable.subscriptions.create("ProductsChannel", {
        connected: function() {
            // Called when the subscription is ready for use on the server
            console.log("connected");
            console.log( main_manager)
        },

        disconnected: function() {
            // Called when the subscription has been terminated by the server
        },

        received: function(data) {
            // Called when there's incoming data on the websocket for this channel
            console.log(data);
           if(data.action=='update'){

main_manager.replaceproductilist(data.product)

           }
          //  main_manager.
        }
    });
}
// App.products =
