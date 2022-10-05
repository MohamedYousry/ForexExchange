<template>
    <v-container fluid>



        <HeaderComponent />
        <GraphComponent />



    </v-container>
</template>
  
<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import GraphComponent from '@/components/graphComponent.vue';
 
export default {
    name: "ForexExchange",
   
    components: { HeaderComponent, GraphComponent },
     
}
</script>
  
 