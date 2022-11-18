<template>
  <!-- Checkout 1 -->
  <div class="modal fade" id="checkoutModal1" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title">Checkout</p>
                    <div style="margin-top: 12px">
                        <img
                        id="closeCheckoutModal1"
                        src="@/assets/images/close.png"
                        class="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"    
                        alt=""
                        >
                    </div>
                </div>

                <div class="modal-body">                    
                    <h6>Customer Name</h6>
                    <input type="text" placeholder="Enter Name" class="form-control">

                    <h6 class="mt-3">Customer Phone Number</h6>
                    <input type="text" placeholder="Enter Phone Number" class="form-control">

                    <h6 class="mt-3">Delivery Address</h6>
                    <select class="form-control">
                        <option value="" selected disabled>Select Delivery Address</option>
                        <option v-for="location in locations" :key="location.Locations" :value="location.Locations">{{ location.Locations }}</option>
                    </select>   

                    <button class="btn btn-block" @click="openPaymentOption">Proceed to Payment</button>           
                    
                </div>
            </div>
        </div>
    </div>

    <!-- Checkout 2 -->
    <button id="paymentModaltrigger" data-bs-toggle="modal" data-bs-target="#paymentModal"  hidden>trigger payment modaal</button>         

  <div class="modal fade" id="paymentModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title">Payment Details</p>
                    <div style="margin-top: 12px">
                        <img
                        id="closeCheckoutModal2"
                        src="@/assets/images/close.png"
                        class="close"
                        data-bs-dismiss="modal"
                        aria-label="Close"    
                        alt=""
                        >
                    </div>
                </div>

                <div class="modal-body">                    
                    <h6>Payment Method</h6>
                    <select name="" id="" class="form-control" v-model="selectedMethod" @change="getSelectedMethod()">
                        <option v-for="method in payment_methods" :key="method.Payme" :value="method.Payme">{{ method.Payme }}</option>
                    </select>

                    <div class="d-flex justify-content-between align-items-center mt-3" >
                        <h6>Total Amount</h6>
                        <h4 style="color: var(--green)">${{ formatPrice(this.$store.state.total_ammount)}}</h4>
                    </div>

                    <h6 class="mt-3">Payment Description</h6>
                    <p>
                        {{ this.paymentDesc[0] ? this.paymentDesc[0].PaymentDescriptions : '' }}
                    </p>

                    <h6 class="mt-4">Upload Proof of Payment</h6>
                    <input type="file" class="form-control">    

                    <button class="btn btn-block mt-4" data-bs-toggle="modal" data-bs-target="#paymentDetailsModal" @click="openPaymentDetails">Proceed to Payment Summary</button>           
                    
                </div>
            </div>
        </div>
    </div>

    <!-- Payment Details -->
    <button id="paymentDetailsModaltrigger" data-bs-toggle="modal" data-bs-target="#paymentDetailsModal"  hidden>trigger payment details modal</button>         

  <div class="modal fade" id="paymentDetailsModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-md">
            <div class="modal-content">
                <div class="modal-header">
                    <p class="modal-title">Payment Summary</p>
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

                <div class="modal-body">                    
                    <h6>Payment Method</h6>
                    <p>{{ this.paymentDesc[0] ? this.paymentDesc[0].Payme : '' }}</p>

                    <h6 class="mt-3">Payment Instructions</h6>
                    <p>
                        {{ this.paymentDesc[0] ? this.paymentDesc[0].PaymentInstructions : '' }}
                    </p>    

                    <button class="btn btn-block">Link to Payment</button>           
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as $ from 'jquery'
export default {
    data (){
        return {
            locations: [],
            payment_methods: [],
            paymentDesc: '',
            selectedMethod: ''
        }
    },
    mounted() {
        this.$store.dispatch('getDeliveryAddresses').then(() => {
            this.locations = this.$store.state.delivery_addresses
        })

        this.$store.dispatch('getPaymentMethods').then(() => {
            this.payment_methods = this.$store.state.payment_methods
        })
    },
    methods: {
        openPaymentOption(){
            $('#closeCheckoutModal1').click()
            $('#paymentModaltrigger').click()
        },

        openPaymentDetails(){
            $('#closeCheckoutModal2').click()
            $('#paymentDetailsModaltrigger').click()
        },

        formatPrice (price) {
            price = price ? price : 0;
            return (price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') // with 2 d.p
        },

        getSelectedMethod(){
            this.paymentDesc = this.payment_methods.filter(item => item.Payme == this.selectedMethod)
            console.log(this.paymentDesc)
        }
    }
}
</script>

<style scoped>
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
        color: var(--black)
    }

    button {
        font-weight: 600;
        margin-top: 24px;
        background: var(--green);
        color: white;
    }
    
</style>