<template>
  <div>
    <nav class="navbar navbar-light justify-content-between" style="position: fixed; top: 0; z-index: 10; width: 100%">
        <div>
            <i class="fa fa-chevron-left mr-3" aria-hidden="true" @click="this.$router.push('products')"></i><a class="navbar-brand text-white">NutriGreen</a>
        </div>
        <div class="pt-2">
            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
            <label for="" class="pl-3 text-white font-weight-bold">{{totalItemsInCart}} Item(s)</label>
        </div>
    </nav>
    <div class="container">
        <div class="top-page d-flex justify-content-between">
            <h4 class="page-title">Shopping Cart</h4>
            <button class="btn" data-bs-toggle="modal" data-bs-target="#checkoutModal1">Proceed to Checkout</button>
        </div>
        <div v-if="cart.length == 0" class="d-flex justify-content-center my-5" style="flex-direction: column">
            <h4 class="text-secondary mx-auto text-center">No item(s) in cart</h4>
            <button class="btn mx-auto mt-4" style="width: 250px" @click="this.$router.push('products')"> Continue Shopping</button>
        </div>
        <div style="overflow-y: scroll; height: 30rem" class="justify-content-center" v-if="cart.length > 0">
            <div class="row py-3" v-for="(item, index) in cart" :key="item.id">
                <div class="col-4">
                    <!-- <img :src="item.product_photo" class="img-fluid" alt="" style="width: 200px"> -->
                </div>
                <div class="col-6">
                    <h5 class="product-title">{{item.product_name}}</h5>
                    <h4 class="product-price">${{formatPrice(item.product_price * item.quantity)}}</h4>
                    <div class="d-flex justify-content-start align-items-center">
                        <h5 class="my-3 mr-2">Qty: </h5> <input type="number" :id="'qty'+ index" @change="updateCartQty(item, index)" :value="item.quantity" class="form-control text-center" style="width: 60px">
                    </div>
                    <div class="text-secondary mt-3">
                        <h5>SRP: ${{formatPrice(item.SRP)}}</h5>
                        <h5>${{formatPrice(item.product_price)}} per {{item.unit}}</h5>
                    </div>
                </div>
                <div class="col-2 d-flex justify-content-end">
                    <i class="fa fa-trash" style="color: darkred; font-size: 24px" @click="removeFromCart(item)"></i>
                </div>
            </div>            
        </div>

        <div v-if="cart.length > 0" class="d-flex justify-content-between my-4">
            <h4>Total</h4>
            <h4 class="total">${{formatPrice(subtotal)}}</h4>
        </div>
    </div>

    <Checkout />

  </div>
</template>

<script>
import Checkout from '@/components/CheckoutPage.vue'
import { useToast } from "vue-toastification";

export default {
    name: 'ShoppingCart',
    data() {
        return {
            cart: this.$store.state.cart,
        }
    },
    setup() {
        // Get toast interface
        const toast = useToast();
        return { toast }
    },
    computed: {
        totalItemsInCart(){
            var sum = 0;
            this.$store.state.cart.forEach(i => {
                sum += Number(i.quantity);
            });
            return sum;
        },
        subtotal(){
            var sum = 0;
            this.$store.state.cart.forEach(i => {
                sum += Number(i.product_price * i.quantity);
            });
            this.$store.commit('setTotalAmount', sum)
            return sum;      
        },
    },
    components: { Checkout },
    methods: {
        formatPrice (price) {
            price = price ? price : 0;
            return (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') // with 2 d.p
        },
        updateCart(){
            this.$store.commit('setCart', this.$store.state.cart)
        },
        removeFromCart(product){
            this.$store.state.cart.forEach((item, index) => {
                if (item.id == product.id) {
                    this.$store.state.cart.splice(index, 1) 
                    this.toast.success("Item removed from cart!");    
                    this.updateCart()          
                }
            });
        },
        updateCartQty(prod, index){
            if(document.getElementById('qty'+ index).value != '' || document.getElementById('qty'+ index).value.length > 0){
                if(document.getElementById('qty'+ index).value > prod.stockqty){
                    this.toast.warning("You cannot buy more than the quantity left in stock!");
                    document.getElementById('qty'+ index).value = this.$store.state.cart[index].quantity;
                }else{
                    this.$store.state.cart[index].quantity = document.getElementById('qty'+ index).value 
                    this.updateCart() 
                }        
            }else{
                document.getElementById('qty'+ index).value = 1
            }
        },
    }
}
</script>

<style scoped>
.navbar .fa-chevron-left {
    font-size: 20px;
    color: white;
}
.row{
    border-bottom: 1px solid rgb(218, 218, 218);
    margin: 12px 0;
}

.product-title {
    color: var(--black);
}

button {
    font-weight: 600;
    /* padding: 10px 16px; */
    background: var(--green);
    color: white;
}

.top-page{
    padding: 18px 0;
    border-bottom: 1px solid rgb(218, 218, 218);
    background: white
}

.container {
    margin-top: 70px;
}

.container .page-title{
    color: var(--green)
}

.increaseDecreaseBtn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
}

.product-price {
    margin-top: 12px;
    color: var(--green);
}

.product-price small {
    font-weight: 600
}

.total {
    color: var(--green);
}


@media only screen and (min-width:1200px) {
    /* .container{
        margin: 32px 80px;
    } */
}

@media only screen and (max-width:500px) {
    .product-price {
        font-size: 20px
    }

    div h5 {
        font-size: 18px
    }
}
</style>