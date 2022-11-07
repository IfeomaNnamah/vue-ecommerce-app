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
                    <input type="text" placeholder="Enter Delivery Address" class="form-control">    

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
                    <select name="" id="" class="form-control">
                        <option value="flutterwave">Flutterwave</option>
                        <option selected value="payme">Payme</option>
                    </select>

                    <h6 class="mt-3">Payment Description</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
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
                    <p>Payme</p>

                    <h6 class="mt-3">Payment Instructions</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
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
    methods: {
        openPaymentOption(){
            $('#closeCheckoutModal1').click()
            $('#paymentModaltrigger').click()
        },

        openPaymentDetails(){
            $('#closeCheckoutModal2').click()
            $('#paymentDetailsModaltrigger').click()
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