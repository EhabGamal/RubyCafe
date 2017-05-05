var arr;

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


        this.decrementproduct = function (prodid) {

            if (this.productsids[prodid] > 1) {
                --this.productsids[prodid]
                return true
            }

            return false
        }
        this.removeproduct = function (prodid) {

            delete this.productsids[prodid]



        }
        this.productvalue = function (prodid) {




            return this.productsids[prodid]
        }
    }
    var main_manager = new function (order, products, category, searchterms) {
        this.products = products || [];
        this.category = category || "";
        this.searchterms = searchterms || "";
        this.sources = { manager: "#slim", products: "#productdiv", value: "#valuepound", searchbox: "#searchbox", categories: "#product_category_id" }
        this.corder = order || {};
        self = this
        this.setproducts = function (prodarray) {
            this.products = prodarray.sort(idsort);
            this.buildproducts();

        }
        this.filteredproducts = function () {

            var searchboxval = $(this.sources.searchbox).val()
            var selectedcategories = $(this.sources.categories).val()
            console.log(selectedcategories)

            fil = this.products.filter((val, ind) => val.name.match(new RegExp(searchboxval, 'i')) && (selectedcategories ? selectedcategories.indexOf(String(val.category_id)) != -1 : true))

            console.log(fil.length)
            return fil;


        }

        this.settotal = function (val) {
            res = Number($(self.sources.value).text()) + val

            $(self.sources.value).text(res.toFixed(2));

        }
        this.addproduct = function () {
            console.log(this)
            prodid = String($(this).data('prodid')).match(/[0-9]+$/)[0]
            locatelm = self.products.find((elem, ind) => elem.id == prodid)
            console.log(prodid);

            if (self.corder.addproduct(prodid)) {


                console.log(locatelm);
                $(self.sources.manager).children('tbody').append(self.templates.newitemorder({ 'name': locatelm.name, 'image': locatelm.image_url, 'id': 'orderitem_' + locatelm.id, 'numid': prodid }))


            }
            else {
                console.log("kofta", $('#noofitem_' + locatelm.id))
                $('#noofitem_' + locatelm.id).val(self.corder.productvalue(prodid))



            }
            self.settotal(locatelm.price)


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
              <a class="prdadd ui red corner label" data-prodid=${'id'}>
                <i class="add icon"></i>
              </a>
              <div class="image">
                <div class="ui red big ribbon label">
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
      <tr>`

        }
        this.buildproducts = function () {
            $(this.sources.products).empty()
            var productstobe = this.filteredproducts();
            productstobe.forEach((elem, indx) => {
                $(this.sources.products).append(this.templates.producttemplate({ 'name': elem.name, 'price': elem.price, 'image': elem.image_url, 'id': 'productlist_' + elem.id, 'avalible': elem.available ? 'isavalible' : '' }))




            })





        }


        {
            console.log(this)
            $(this.sources.products).on("click", '.isavalible .prdadd', this.addproduct)//function (hey) { console.log(hey.target,"THIS IS ",this.target) }.bind());
            $(this.sources.manager).on("click", '.addp', this.addproduct)
            $(this.sources.manager).on("click", '.minusp', this.decrmproduct)
            $(this.sources.manager).on("click", '.removeord', this.removeproduct)
            // $(this.sources.products).on("click", '.isavalible .prdadd', this.addproduct)
            $(this.sources.searchbox).on('input', this.buildproducts.bind(this))
            $(this.sources.categories).change(this.buildproducts.bind(this))
            console.log($(this.sources.products))
            //console.log(this.templates.producttemplate({'name':'kkk','price':'23','image':'kkk'}))


            console.log("IN")




        }



    }(order)


    $.ajax({
        url: "/products.json",
        success: function (data) {
            console.log(data);
            arr = data.products
            main_manager.setproducts(data.products);
        },
        error: function (error) {
            console.log(error);
        }
    });




    $('.ui.accordion').accordion();
    $('#order_room_id').attr('class', 'search selection dropdown');
    $('#product_category_id').attr('class', 'search selection dropdown');
    $('#product_category_id').attr('multiple', '');
    $('#order_user_id').attr('class', 'search selection dropdown');
    $('#order_room_id').dropdown();
    $('#product_category_id').dropdown();
    $('#order_user_id').dropdown();






});

