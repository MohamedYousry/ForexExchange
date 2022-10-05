<template>

  <v-row class="text-left">
    <v-col cols="12">
      <header>
        <h1>{{title}}</h1>
        <p>{{description}}</p>

      </header>
    </v-col>

  </v-row>
</template>
 
<script>
export default {

  data: () => ({
    title: 'Forex Exchange',
    description: 'check out the current price for a currency pair ',
  })


}
</script>
 
<style scoped>
header {
  text-align: left;
}
</style>
 