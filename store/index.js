import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";
import axios from 'axios';
const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTBmZjEtY2UwMC0wMDAwMDAwMDAwMDAvamVic2VuZ3JvdXAuc2hhcmVwb2ludC5jb21AOTc4M2FlMTgtZWFiMy00MWYyLWFiYmQtYThiM2M3ZGYyZmUzIiwiaXNzIjoiMDAwMDAwMDEtMDAwMC0wMDAwLWMwMDAtMDAwMDAwMDAwMDAwQDk3ODNhZTE4LWVhYjMtNDFmMi1hYmJkLWE4YjNjN2RmMmZlMyIsImlhdCI6MTY2ODc2MDcwMSwibmJmIjoxNjY4NzYwNzAxLCJleHAiOjE2Njg4NDc0MDEsImlkZW50aXR5cHJvdmlkZXIiOiIwMDAwMDAwMS0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDBAOTc4M2FlMTgtZWFiMy00MWYyLWFiYmQtYThiM2M3ZGYyZmUzIiwibmFtZWlkIjoiOGE1OTRhYjMtYjAzNC00ZDRkLTg2NjctNzcyMzk0NzhiMjU1QDk3ODNhZTE4LWVhYjMtNDFmMi1hYmJkLWE4YjNjN2RmMmZlMyIsIm9pZCI6IjE3YmFjMjNiLWU4ZDMtNGQ1Yi05ZDA1LTgyY2EyMjdlMjRhOSIsInN1YiI6IjE3YmFjMjNiLWU4ZDMtNGQ1Yi05ZDA1LTgyY2EyMjdlMjRhOSIsInRydXN0ZWRmb3JkZWxlZ2F0aW9uIjoiZmFsc2UifQ.PQ-PeIAKi0VfP9O1UhRueYl-RC9cdPAy3KP8v7gpKbGp9xs7RQBJt9vWwVPCPY6ru_LhINS0yn-qdV5-dvuxHlLUY4hjSYnz9u5mpSwwYHRyaVTE3NaU0mb7svSD_IlJYg6SdHfdX4OYNhl3gE2l2Vb3YmD-Ratm_pKNVoBM2MRdKE-MpWgJa7yeZYJV8cNr-RTc_R0JcCFruArA99cFcUesrcfBIZpNm5shq0ti1SZ_nWSc-pZiHPdm-XLT5ur7BDBtNecGh3FQcPg1MsoMjaNC5gvDTNaDw4UzaHwvyucuthGJbDkQdVv_iKRqebygCo3F9aRQ3qk33HWC2unUeg'

const store = createStore({
  state() {
    return {
      products: [],
      cart: [],
      total_ammount: '',
      delivery_addresses: [],
      payment_methods: [],

      accessToken: ''
    };
  },
  getters: {
    tasks: (state) => state.tasks,
  },
  plugins: [
    createPersistedState()
  ],
  mutations :{
    updateCart(state, data){
      state.cart.push(data)
    },
    setCart(state, data){
      state.cart = data
    },
    setProducts(state, data){
      state.products = data
    },
    setTotalAmount(state, data){
      state.total_ammount = data
    },
    setDeliveryAddresses(state, data){
      state.delivery_addresses = data
    },
    setPaymentMethods(state, data){
      state.payment_methods = data
    },
  },
  actions: {
    async getAccessToken() {
      let data = {
        grant_type: 'client_credentials',
        client_id: '8a594ab3-b034-4d4d-8667-77239478b255@9783ae18-eab3-41f2-abbd-a8b3c7df2fe3',
        client_secret: 'KXB3tEi6by1wqO90i2q7x1TlxNUkCcSeLtnjbsM2zyY=',
        resource: '00000003-0000-0ff1-ce00-000000000000/jebsengroup.sharepoint.com@9783ae18-eab3-41f2-abbd-a8b3c7df2fe3'
      }

      try {
          const response = await axios.post("https://accounts.accesscontrol.windows.net/9783ae18-eab3-41f2-abbd-a8b3c7df2fe3/tokens/OAuth/2", data, {
              headers: {
                  // 'Content-Type': 'application/json;odata=verbose',
                  // 'Accept': 'application/json;odata=verbose'
                  'Access-Control-Allow-Origin': '*'
              }
          });
          if (response) {              
            console.log('response: ', response)
          }
      } catch (error) {
          console.log(error)
      }
    },

    async getProductList(context) {
      try {
          const response = await axios.get("https://jebsengroup.sharepoint.com/sites/Group-eForms/_api/web/lists/GetByTitle('Products List')/items?$select=Title,ItemName,SRP,StaffPrice,Unit,ItemDescription1,ItemDescription2,ItemDescription3,ItemImages", {
              headers: {
                  'Authorization': 'Bearer ' + accessToken
              }
          });
          if (response.status == 200) {
              // console.log('response: ', response.data.value)
              context.commit('setProducts', response.data.value)
          }

      } catch (error) {
          console.log(error)
      }
    },

    async getDeliveryAddresses(context) {
      try {
          const response = await axios.get("https://jebsengroup.sharepoint.com/sites/Group-eForms/_api/web/lists/GetByTitle('Delivery Address')/items?$select=Locations", {
              headers: {
                  'Authorization': 'Bearer ' + accessToken
              }
          });
          if (response.status == 200) {
              context.commit('setDeliveryAddresses', response.data.value)
              // console.log(response.data.value)
          }

      } catch (error) {
          console.log(error)
      }
    },

    async getPaymentMethods(context) {
      try {
          const response = await axios.get("https://jebsengroup.sharepoint.com/sites/Group-eForms/_api/web/lists/GetByTitle('Payment Methods')/items?$select=Payme,PaymentDescriptions,PaymentInstructions", {
              headers: {
                  'Authorization': 'Bearer ' + accessToken
              }
          });
          if (response.status == 200) {
              context.commit('setPaymentMethods', response.data.value)
              console.log(response.data.value)

          }

      } catch (error) {
          console.log(error)
      }
    },
  }
});

export default store;