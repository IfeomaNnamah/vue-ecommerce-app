<template>
  <div>
    <nav class="navbar navbar-light justify-content-between" style="position: fixed; top: 0; z-index: 10; width: 100%">
        <div>
            <i class="fa fa-chevron-left mr-3" aria-hidden="true" @click="this.$router.push('index')"></i><a class="navbar-brand text-white">NutriGreen</a>
        </div>
        <form class="form-inline">
            <input class="form-control mr-sm-2" type="search" placeholder="Search Products" aria-label="Search" v-model="search_value" @keyup="searchProducts">
        </form>
        <div class="pt-2" style="cursor: pointer" @click="this.$router.push('cart')">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <label for="" class="pl-3 text-white font-weight-bold">{{totalItemsInCart}} Item(s)</label>
        </div>
    </nav>

    <div class="row">
        
        <div class="product-card d-flex" v-for="(product, index) in filteredProduct" :key="product.Title">
            <div style="box-shadow: rgba(110, 110, 110, 0.2) 0px 24px 30px -10px;">
                <img :src="'https://jebsengroup.sharepoint.com'+ JSON.parse(product.ItemImages).serverRelativeUrl" class="img-fluid" alt="" data-bs-toggle="modal" data-bs-target="#productDetail" @click="getProductDetails(product.Title)">
                <!-- <div style="width: 100%; height: 150px; background: whitesmoke" @click="getProductDetails(product.Title)" data-bs-toggle="modal" data-bs-target="#productDetail"></div> -->
                <h5 class="product-title">{{truncate(product.ItemName, 24)}}</h5>
                <h4 class="product-price">SRP: <span>${{formatPrice(product.SRP)}}</span></h4>
                <h4 class="product-price">Staff Price: <span>${{formatPrice(product.StaffPrice)}}</span></h4>

                <div v-if="($store.state.cart.filter(cart => cart.title == product.Title)).length > 0" class="increaseDecreaseBtn mt-4">
                    <button class="btn" @click="decreaseQty(product, index)"><i class="fa fa-minus" aria-hidden="true"></i></button>
                    <label :id="'qty'+ index">1</label>
                    <button class="btn" @click="increaseQty(product, index)"><i class="fa fa-plus" aria-hidden="true"></i></button>
                </div>
                <button v-else class="btn btn-block mt-4" @click="addToCart(product)">Add to Cart</button>

            </div>
            
        </div>        
    </div>

    <!-- product details -->
    <div class="modal fade" id="productDetail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title"></p>
                    <div style="margin-top: 12px">
                        <img
                        id="closeModal"
                        src="@/assets/images/close.png"
                        class="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"    
                        alt=""
                        >
                    </div>
                </div>

                <div v-if="this.selectedProduct[0]" class="modal-body">
                    <!-- <img :src="this.selectedProduct[0].product_photo" class="img-fluid d-flex mx-auto" alt="" data-bs-toggle="modal" data-bs-target="#productDetail"> -->
                    <div style="width: 100%; height: 200px; background: whitesmoke" class="mb-2"></div>
                    
                    <h6>Item Code</h6>
                    <p>{{this.selectedProduct[0].Title}}</p>
                    
                    <h6>Item Name</h6>
                    <p>{{this.selectedProduct[0].ItemName}}</p>

                    <h6>Item Description 1</h6>
                    <p>{{this.selectedProduct[0].ItemDescription1}}</p>

                    <h6>Item Description 2</h6>
                    <p>{{this.selectedProduct[0].ItemDescription2}}</p>

                    <h6>SRP</h6>
                    <p>${{formatPrice(this.selectedProduct[0].SRP)}}</p>

                    <h6>Staff Price</h6>
                    <p>${{formatPrice(this.selectedProduct[0].StaffPrice)}}</p>

                    <h6>Unit</h6>
                    <p>{{this.selectedProduct[0].unit}} {{this.selectedProduct[0].Unit}}</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import * as $ from 'jquery'
export default {
    name: 'SearchProducts',
    data() {
        return {
            products: [],
            filteredProduct: [],
            selectedProduct: [],
            search_value: ''
        }
    },
    setup() {
        // Get toast interface
        const toast = useToast();
        return { toast }
    },
    mounted() { 
        this.getCartQuantity()

        //get product list
        this.$store.dispatch('getProductList').then(() => {
            this.products = this.$store.state.products.map((products) => ({ ...products, stockqty: 10 }))
            this.filteredProduct = this.$store.state.products.map((products) => ({ ...products, stockqty: 10 }))
        })  
    },
    computed: {
        totalItemsInCart(){
            var sum = 0;
            this.$store.state.cart.forEach(i => {
                sum += Number(i.quantity);
            });
            return sum;
        },
    },
    methods: {
        truncate(str, maxlength){
            if(str.length > 0){
                return (str.length > maxlength) ? str.slice(0, maxlength - 1) + '…' : str;
            }           
        },
        searchProducts(){
            if(this.search_value !== ''){
                this.filteredProduct = this.products.filter(product => product.product_name.toLowerCase().includes(this.search_value))
            }else{
                this.filteredProduct = this.products
            }
        },
        addToCart(product){
            if(product.stockqty > 0){
                let cart_data = {
                    title: product.Title,
                    product_photo: product.ItemImages,
                    product_name: product.ItemName,
                    item_code: product.Title,
                    product_price: product.StaffPrice,
                    unit: product.Unit,
                    stockqty: 10,
                    SRP: product.SRP,
                    quantity: 1
                }
                this.$store.commit('updateCart', cart_data)
                this.toast.success("Item added to cart!");
            }else{
                this.toast.error("Out of stock!");
            } 
            
        },
        updateCart(){
            this.$store.commit('setCart', this.$store.state.cart)
        },
        getCartQuantity(){
            this.products.forEach((product, index) => {        
                this.$store.state.cart.forEach(i => {            
                    if (i.title == product.Title) {
                        $('#qty'+ index).text(i.quantity)
                    }   
                });
            });
        },
        removeFromCart(product){
            this.$store.state.cart.forEach((item, index) => {
                if (item.title == product.Title) {
                    this.$store.state.cart.splice(index, 1) 
                    this.updateCart()          
                    this.toast.info("Item quantity updated in cart!");
                }
            });
        },
        increaseQty(prod, index){
            this.$store.state.cart.forEach(i => {            
                if (i.title == prod.Title) {
                    if(prod.stockqty > i.quantity){
                        $('#qty'+ index).text(++(i.quantity))
                        this.updateCart()
                    }else{
                        this.toast.warning("You cannot buy more than the quantity left in stock!");
                    } 
                }   
            });
        },
        decreaseQty(prod, index){
            this.$store.state.cart.forEach(i => {            
                if (i.title == prod.Title) {
                    if (i.quantity == 1){
                        this.removeFromCart(prod)                        
                    }else{
                        $('#qty'+ index).text(--(i.quantity))
                        
                        this.updateCart()
                    }
                }   
            });
        },
        formatPrice (price) {
            price = price ? price : 0;
            return (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') // with 2 d.p
            // return (price).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        },
        getProductDetails(Title) {
            this.selectedProduct = this.products.filter(product => product.Title == Title)
        }
    }
}
</script>

<style scoped>   
    .navbar .fa-chevron-left {
    font-size: 20px;
    color: white;
}
    .row .product-card {
        /* background: whitesmoke; */
        height: inherit;
        padding: 16px;
        /* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */
    }

    .product-card img {
        /* box-shadow: rgba(110, 110, 110, 0.2) 0px 24px 30px -10px; */
        cursor: pointer
    }

    .product-card .product-title {
        margin-top: 24px;
        color: var(--black);
        text-align: center;
        height: 40px
    }

    .product-card .product-price {
        margin-top: 12px;
        /* color: var(--green); */
        font-size: 20px;
        text-align: center;
    } 

    .product-card .product-price span {
        color: var(--green);
    }

    .product-card button {
        font-weight: 600;
        padding: 10px 16px;
        background: var(--green);
        color: white;
        border-radius: 0;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .product-card .increaseDecreaseBtn {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 22px;
    }

    .modal .modal-content {
        border-radius: 12px;
    }
    .modal .modal-title {
        font-size: 24px;
        color: var(--green)
    }

    .modal .modal-header {
        padding: 24px 32px 12px 32px;
        border: none;
    }

    .modal .modal-body {
        padding: 8px 32px 32px 32px;
    }

    .modal .modal-body h6 {
        color: var(--green)
    }
    .row {
        margin: 0 40px;
        position: absolute; 
        top: 80px;
        
    }

    .navbar .form-inline input:focus {
        background: transparent;
        border: 1px solid greenyellow;
        color: white
    }

    @media only screen and (max-width:799px) {
        .row {
            margin: 0 16px;
            top: 120px
        }

        .row .product-card {
            padding: 8px;
            width: 50%
        }

        .product-card .product-price {
            font-size: 18px;
        }

        .product-card .product-price span {
            color: var(--green);
        }

        .product-card .product-title {
            font-size: 18px;
        }
    }

    @media only screen and (min-width:800px) {
        .row .product-card {
            width: 32%
        }
    }

    @media only screen and (min-width:1150px) {
        .row .product-card {
            width: 25%
        }
    }

    @media only screen and (min-width:1500px) {
        .row .product-card {
            width: 20%
        }
    }

</style>