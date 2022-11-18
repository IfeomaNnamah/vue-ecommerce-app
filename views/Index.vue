<template>
  <div class="d-flex justify-content-center">
      <h1 class="mx-auto text-center">NuriGreen Staff Sales</h1>
      <button class="btn mx-auto" @click="this.$router.push('products')">Place Order</button>
  </div>
</template>

<script>
export default {
    name: 'IndexPage',
    data () {
        return {
            
        }
    },
    mounted () {      
      this.$store.dispatch('getAccessToken')
      this.$store.dispatch('getProductList')
    },
    methods: {

    }
}
</script>

<style scoped>

  button {
    color: white;
    width: 40%;
    padding: 16px;
    text-align: center;
    margin-top: 40px;
    background-color: var(--green);
    font-weight: 500;
    font-size: 18px
  }

  h1 {
    font-size: 54px;
    color: var(--green)
  }
 
  @media only screen and (max-width:500px) {
    h1 {
      font-size: 48px;
    }
  }

  div {
    height: 100vh;
    flex-direction: column;
  }
</style>