<template>
  <v-app>
 <ForexExchange />
</v-app>
</template>

<script>
 import ForexExchange from './pages/forex-exchange.vue';

export default {
  name: 'App',

  components: {
     ForexExchange
},

  data: () => ({
    //
  }),
};
</script>
