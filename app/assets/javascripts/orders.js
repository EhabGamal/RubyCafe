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
        this.productsids = [];
        this.user = '';

        this.addproduct = function (prodid) {

            if(this.productsids.indexOf(prodid)==-1)
            {


        this.productsids.push(prodid)
              return true;
            }
            return false;



        }
    }
    var main_manager = new function (products, category, searchterms) {
        this.products = products || [];
        this.category = category || "";
        this.searchterms = searchterms || "";
        this.sources = { manager: "#slim", products: "#productdiv", value: "#valuepound", searchbox: "#searchbox", categories: "#product_category_id" }
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
        this.addproduct = function () {







        }
        this.templates = {
            producttemplate: repl`<div id=${'id'} class="column ${'avalible'} ">
            <div class="ui fluid card">
              <a class="prdadd ui red corner label">
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
            newitemorder: repl` <tr>
        <td>
          <img class="ui avatar image" src="${'image'}">
          ${'name'}
        </td>
        <td class="four wide">
          <div class="ui mini form">
            <div class="field">
              <input id="noofitem_${'id'}" type="number" min="1">
            </div>
          </div>
        </td>
        <td class="three wide">
          <div class="ui buttons">
            <div class="addp circular ui icon button"><i class="minus icon"></i></div>
            <div class="minusp circular ui icon button"><i class="add icon"></i></div>
          </div>
        </td>
        <td class="two wide">
          <div class="removeord circular ui red icon button"><i class="remove icon"></i></div>
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
            $(this.sources.products).on("click", '.prdadd', function () { console.log("y0") });
            $(this.sources.searchbox).on('input', this.buildproducts.bind(this))
            $(this.sources.categories).change(this.buildproducts.bind(this))
            console.log($(this.sources.products))
            //console.log(this.templates.producttemplate({'name':'kkk','price':'23','image':'kkk'}))


            console.log("IN")




        }



    }()
    var order = new function manager(products, category, searchterms) {

        prodlist = products || {}




    }

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

