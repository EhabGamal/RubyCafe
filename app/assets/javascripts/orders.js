jQuery(document).on("turbolinks:load", function () {
    if ($(".orders.index").length == 0) {
         App.Channels.Orders.subscribe()
    }
   
});

var arr;
var ordersList = [];
function idsort(a, b) {
    if (a.id < b.id)
        return -1;
    if (a.id > b.id)
        return 1;
    return 0;
}
function repl(strings, ...keys) {
    return (function (...values) {
        var dict = values[values.length - 1] || {};
        var result = [strings[0]];
        keys.forEach(function (key, i) {
            var value = Number.isInteger(key) ? values[key] : dict[key];
            result.push(value, strings[i + 1]);
        });
        return result.join('');
    });
}

var main_manager;



jQuery(document).on("turbolinks:load",function(){
jQuery(document).ready(function () {
    var order = new function () {
        this.productsids = {};
        this.user = '';

        this.addproduct = function (prodid) {

            if (!this.productsids[prodid]) {


                this.productsids[prodid] = 1;
                return true;
            }
            this.productsids[prodid]++;
            return false;



        }

        this.productids = function () {

            return Object.keys(this.productsids)


        }
        this.decrementproduct = function (prodid) {

            if (this.productsids[prodid] > 1) {
                --this.productsids[prodid]
                return true
            }

            return false
        }
        this.removeproduct = function (prodid) {
            if (this.productsids[prodid]) {
                delete this.productsids[prodid]
                return true
            }
            return false



        }
        this.productvalue = function (prodid) {




            return this.productsids[prodid]
        }
    }
    main_manager = new function (order, products, category, searchterms) {
        this.products = products || [];
        this.category = category || "";
        this.searchterms = searchterms || "";
        this.sources = {
            manager: "#slim",
            products: "#productdiv",
            value: "#valuepound",
            searchbox: "#searchbox",
            categories: "#product_category_id",
            submitbutton: "#submitbutton",
            mainform: "#mainform",
            userform: "#userform"

        }
        this.corder = order || {};
        self = this
        this.setproducts = function (prodarray) {
            this.products = prodarray.sort(idsort);
            this.buildproducts();

        }
        this.addproducttlist = function (product) {
            this.products.push(product)
            this.products = this.products.sort(idsort);
            this.buildproducts();

        }
        this.removeproductflist = function (product) {

            this.products = this.products.filter((val, ind) => val.id != product.id)

            $('#orderitem_' + product.id).remove()
            if (self.corder.productvalue(product.id))
                self.settotal(-locatelm.price * self.corder.productvalue(product.id))
            self.corder.removeproduct(product.id);
            this.buildproducts();

        }
        this.replaceproductilist = function (product) {
            var ind = this.products.findIndex((elm) => elm.id == product.id)
            console.log(ind);
            this.products[ind] = product;
            if (product.available == false) {
                locatelm = self.products.find((elem, ind) => elem.id == product.id)
                $('#orderitem_' + product.id).remove()
                if (self.corder.productvalue(product.id))
                    self.settotal(-locatelm.price * self.corder.productvalue(product.id))
                self.corder.removeproduct(product.id);




            }
            console.log(product)
            this.buildproducts();

        }
        this.filteredproducts = function () {

            var searchboxval = $(this.sources.searchbox).val()
            var selectedcategories = $(this.sources.categories).val()
            //console.log(selectedcategories)

            fil = this.products.filter((val, ind) => val.name.match(new RegExp(searchboxval, 'i')) && (selectedcategories ? selectedcategories.indexOf(String(val.category_id)) != -1 : true))

            //console.log(fil.length)
            return fil;


        }

        this.settotal = function (val) {
            res = Number($(self.sources.value).text()) + val

            $(self.sources.value).text(res.toFixed(2));

        }
        this.addproduct = function () {
            //console.log(this)
            prodid = String($(this).data('prodid')).match(/[0-9]+$/)[0]
            locatelm = self.products.find((elem, ind) => elem.id == prodid)
            //console.log(prodid);

            if (self.corder.addproduct(prodid)) {


                //console.log(locatelm);
                $(self.sources.manager).children('tbody').append(self.templates.newitemorder({ 'name': locatelm.name, 'image': locatelm.image_url, 'id': 'orderitem_' + locatelm.id, 'numid': prodid }))


            }
            else {
                //console.log("kofta", $('#noofitem_' + locatelm.id))
                $('#noofitem_' + locatelm.id).val(self.corder.productvalue(prodid))



            }
            self.settotal(locatelm.price)


        }
        this.submithandler = function (event) {
            //console.log("IN")
            function getmintemp(main) {
                return innertemp = function (key, value, isArray = false) {
                    this.name = `${main}[${key}]` + (isArray ? "[]" : "");
                    this.value = value

                }

            }
            ordertemp = getmintemp('order');

            var mainform = $(self.sources.mainform).serializeArray()
            mainform.push($(self.sources.userform).serializeArray().pop())
            // mainform.push(new ordertemp('note',''))
            mainform.push(new ordertemp('status', 'pending'))
            ids = self.corder.productids();
            //console.log(self.corder)
            //console.log(ids);
            ids.forEach((val, indx) => { mainform.push(new ordertemp('product_ids', JSON.stringify({ id: val, size: self.corder.productvalue(val) }), true)) })
            //console.log(mainform)
            $.post('/orders', mainform)


        }
        this.decrmproduct = function () {
            prodid = String($(this).data('prodid')).match(/[0-9]+$/)[0]
            locatelm = self.products.find((elem, ind) => elem.id == prodid)
            if (self.corder.decrementproduct(prodid)) {
                $('#noofitem_' + locatelm.id).val(self.corder.productvalue(prodid))
                self.settotal(-locatelm.price)
            }

        }

        this.removeproduct = function () {

            prodid = String($(this).data('prodid')).match(/[0-9]+$/)[0]
            locatelm = self.products.find((elem, ind) => elem.id == prodid)
            $('#orderitem_' + prodid).remove()
            self.settotal(-locatelm.price * self.corder.productvalue(prodid))
            self.corder.removeproduct(prodid);

        }
        this.templates = {
            producttemplate: repl`<div id=${'id'} class="column ">
            <div class=" ${'avalible'} ui fluid card" >
              <a class="prdadd ui ${'color'} corner label" data-prodid=${'id'}>
                <i class="add icon"></i>
              </a>
              <div class="image">
                <div class="ui ${'color'} big ribbon label">
                  <i class="pound icon"></i> ${'price'}
                </div>
                <img src="${'image'}">
              </div>
              <div class="content">
                <a class="header">${'name'}</a>
              </div>
            </div>
          </div>`,
            newitemorder: repl` <tr id=${'id'}>
        <td>
          <img class="ui avatar image" src="${'image'}">
          ${'name'}
        </td>
        <td class="four wide">
          <div class="ui mini form">
            <div class="field">
              <input id="noofitem_${'numid'}" type="number" min="1" value=1>
            </div>
          </div>
        </td>
        <td class="three wide">
          <div class="ui buttons">
            <div class="minusp circular ui icon button" data-prodid=${'numid'} ><i class="minus icon"></i></div>
            <div class=" addp circular ui icon button" data-prodid=${'numid'} ><i class="add icon"></i></div>
          </div>
        </td>
        <td class="two wide">
          <div class="removeord circular ui red icon button"  data-prodid=${'numid'}><i class="remove icon"></i></div>
        </td>
      </tr>
      <tr>`,
            orderHeaderTemplate: repl`
            <div class="item">
              <i class="${'icon'} large icon"></i>
              <div class="content">
                <div class="header">${'key'}</div>
              </div>
            </div>
            `

        }
        this.buildproducts = function () {
            $(this.sources.products).empty()
            var productstobe = this.filteredproducts();
            productstobe.forEach((elem, indx) => {
                $(this.sources.products).append(this.templates.producttemplate({ 'name': elem.name, 'price': elem.price, 'image': elem.image_url, 'id': 'productlist_' + elem.id, 'avalible': elem.available ? 'isavalible' : 'unavalible', color: elem.available ? 'red' : '' }))




            })





        }


        {
            //console.log(this)
            $(this.sources.products).on("click", '.isavalible .prdadd', this.addproduct)//function (hey) { //console.log(hey.target,"THIS IS ",this.target) }.bind());
            $(this.sources.manager).on("click", '.addp', this.addproduct)
            $(this.sources.manager).on("click", '.minusp', this.decrmproduct)
            $(this.sources.manager).on("click", '.removeord', this.removeproduct)
            // $(this.sources.products).on("click", '.isavalible .prdadd', this.addproduct)
            $(this.sources.searchbox).on('input', this.buildproducts.bind(this))
            $(this.sources.categories).change(this.buildproducts.bind(this))
            //console.log($(this.sources.products))
            $(this.sources.submitbutton).click(this.submithandler)

            ////console.log(this.templates.producttemplate({'name':'kkk','price':'23','image':'kkk'}))


            //console.log("IN")




        }



    }(order)


    $.ajax({
        url: "/allproducts.json",
        success: function (data) {
            //console.log(data);
            arr = data.products
            main_manager.setproducts(data.products);
        },
        error: function (error) {
            //console.log(error);
        }
    });




    $('.ui.accordion').accordion({ selector: { trigger: '.title .icon' } });
    $('#order_room_id').attr('class', 'search selection dropdown');
    $('#product_category_id').attr('class', 'search selection dropdown');
    $('#product_category_id').attr('multiple', '');
    $('#order_user_id').attr('class', 'search selection dropdown');
    $('#order_room_id').dropdown();
    $('#product_category_id').dropdown();
    $('#order_user_id').dropdown();






    orderHeaders = [
        { key: 'created_at', icon: 'wait' },
        { key: 'user.email', icon: 'user' },
        { key: 'room.name', icon: 'marker' },
        { key: 'user.ext', icon: 'volume control phone' },
        { key: 'total', icon: 'pound' },
    ];



    var temps = {

        endbtn: repl`<button class="ui positive button endorder" data-itemid=${'id'} >Done</button>`


    }

    //console.log("LLLL")
    function sucesscallback(itemt) {
        //console.log(itemt);
        // //console.log("AGAAAIAN")
        //console.log("HI");
        $(itemt).replaceWith($(temps.endbtn({ 'id': $(itemt).data('itemid') })))



    }


    function completecallback(itemt) {

        var id = $(itemt).data('itemid')
        //console.log(id);
        $('#order_' + id + '_title').remove();
        $('#order_' + id + '_content').remove();


    }





    function changeorderstate(id, state, callback, itemt) {

        //console.log("INCH", id, state)
        $.ajax({
            type: "PUT",
            url: `/orders/${id}.json`,
            data: { order: { status: state } },
            dataType: 'json',
            success: function (msg) {
                callback(itemt);
            },
            error: function (d) { console.log("LLLLLLL") },
            complete: function (d) { console.log("MESSSSSS") }
        });

    }
    function todone() {
        //console.log("INDONE")
        changeorderstate($(this).data('itemid'), 'processing', sucesscallback, this)



    }
    function tocompleted() {
        //console.log("COMPLETED")
        changeorderstate($(this).data('itemid'), 'completed', completecallback, this)
    }



    $(".mainorddiv").on("click", '.startorder', todone)
    $(".mainorddiv").on("click", '.endorder', tocompleted)

console.log("KKK",$(".orders.index").length)
if($(".orders.index").length>0){
     App.Channels.Orders.subscribe()
    console.log("slimshady");
    window.addEventListener('order_updated_state', function (e) { 

           if(e.detail.status=='canceled')
           {
 $('#order_' + e.detail.id + '_title').remove();
        $('#order_' + e.detail.id + '_content').remove();
               
           }

});
    window.addEventListener('order_create_new', function (e) { 
console.log("Jezebel")
      
 $('.mainorddiv').append(e.detail.html);
   //     $('#order_' + id + '_content').remove();
          
});

}








    Object.byString = (obj, str) => {
        str.split('.').forEach((x) => { obj = obj[x] });
        return obj;
    };

    $.ajax({
        url: "/orders.json",
        success: function (data) {
            ordersList = data;
            //console.log(ordersList);
            temp = repl`
            <div class="item">
              <i class="${'icon'} large icon"></i>
              <div class="content">
                <div class="header">${'key'}</div>
              </div>
            </div>
            `;
            orderHeaders.forEach((val) => {
                //console.log(temp({ icon: val.icon, key: Object.byString(ordersList[0], val.key) }))
            })
        },
        error: function (error) {
            //console.log(error);
        }
    });
});
})
