<template>
 

 
        <v-row class="d-flex align-center">
            <v-col cols="12" sm="4">
                <v-row no-gutters>
                    <v-select :items="items" v-on:change="selectDataFrom($event,0)" outlined
                        :placeholder="'Select From'"></v-select>
                </v-row>
                <v-row no-gutters>
                    <v-select :items="items" outlined v-on:change="selectDataFrom($event,1)" :placeholder="'Select To'">
                    </v-select>
                </v-row>

            </v-col>

            <v-col cols="12" sm="8">
                <v-card class="mt-4 mx-auto">
                    <v-row no-gutters class="px-5 pt-5">
                        <div v-if="selectedExchange[0]" class="currency-flag "
                            :class="'currency-flag-'+selectedExchange[0].toLowerCase()"></div>
                        <div v-if="selectedExchange[1]" class="currency-flag mx-3"
                            :class="'currency-flag-'+selectedExchange[1].toLowerCase()"></div>

                    </v-row>
                    <v-row no-gutters class="px-5  pt-5  d-flex justify-space-between">
                        <div class="font-weight-bold">
                            <span v-for="(item, index) in  selectedExchange" v-bind:key="index">
                                {{item }}
                                <span v-if="index < selectedExchange.length - 1"> / </span> </span>

                        </div>


                        <div v-if="exchangeValue" class="font-weight-normal">
                            <div class="text-right">
                                <span v-html="currencySymbol(selectedExchange[1])??selectedExchange[1]"
                                    class="mr-2"></span>{{exchangeValue}}
                            </div>
                            <div class="diff ">
                                {{(exchangePrices.startprice-exchangePrices.endprice) | maxlength}}
                                ({{(exchangePrices.startprice/exchangePrices.endprice)/100 | maxlength}}%)

                            </div>
                        </div>
                    </v-row>
                    <v-sparkline :value="value" line-width="2" padding="16" :color="'#76c102'" auto-draw
                        :auto-draw-duration="2000">

                    </v-sparkline>

                    <v-row class="px-5 mt-5 d-flex  justify-center " >
                        <v-btn class="mb-2 mr-1"   v-on:click="tabbing(item)" depressed :disabled="selectedExchange.length<2" v-for="(item, index) in  labels" v-bind:key="index">
                            {{item.text}}
                        </v-btn>
                    </v-row>

                </v-card>
            </v-col>


        </v-row>


 </template>
  
<script>
 import {TimeSlots} from '@/enums/labels.enum';
import { CurrencyService } from '@/services/currencies.service.js';

const currencyService = new CurrencyService();
let ws;
export default {
    name: "ForexExchange",
    data() {

        return {
            items: [],
            listkeys: [],
            selectedExchange: [],
            exchangeValue: null,
            exchangePrices: {
                startprice: 1,
                endprice: 1,
            },
            labels: [
                {
                    text: '15M',
                    type:TimeSlots.Mintus,
                    value:15

                },
                {
                    text: '1H',
                    type:TimeSlots.Mintus,
                    value:60

                },
                
                {
                    text: '1D',
                    type:TimeSlots.Day,
                    value:1

                },
                 
                {
                    text: '1W',
                    type:TimeSlots.Week,
                    value:1

                },
                {
                    text: '1M',
                    type:TimeSlots.Month,
                    value:1

                }
             ],
            value: [
                0, 0, 0
            ],

            gradient: ['#04cb8f'],
            fill: '#000'
        };

    },

    mounted() {

        currencyService.get_live_currencies_list().then(res => {
            this.listkeys = Object.keys(res.data.available_currencies);

            this.items = Object.values(res.data.available_currencies);



        });

 
        
         

    },
    methods: {
        selectDataFrom(event, i) {
            this.$set(this.selectedExchange, i, this.listkeys[this.items.findIndex(i => i == event)]);
            if (this.selectedExchange.length >= 2)
                this.getExchange();
        },
        async getExchange(timezone=15) {
            let data = await Promise.all([currencyService.get_live_exchange(...this.selectedExchange), currencyService.get_timeseries_exchange(...this.selectedExchange, timezone)]);
             this.exchangeValue = data[0].data.quotes[0].ask;
            if(data[1].data.quotes.length>1){
            this.value = data[1].data.quotes.map(res => res.close);
             this.exchangePrices.startprice = data[1].data.quotes[0].open;
            this.exchangePrices.endprice = data[1].data.quotes[data[1].data.quotes.length - 1].close;

            }
         
             else{
                this.value=this.value.length>0?[0,...this.value,...this.value]:[0,0,0,0];
             }
         
           
       this.getLiveData();
        },
        tabbing(item){
       this.getExchange(item);
 

        },
        getLiveData(){
        if(ws) ws.close();
        
         if ("WebSocket" in window) {
 
            // Let us open a web socket
            let that=this;
             ws = new WebSocket("wss://marketdata.tradermade.com/feedadv");
          
            ws.onopen = function() {
                ws.send("{\"userKey\":\"wsKiJkQEloXcUEzncTKQ\", \"symbol\":\""+that.selectedExchange[0]+that.selectedExchange[1]+"\"}");
              };
          
            ws.onmessage = function (evt) { 
 
                if(evt.data&&evt.data?.ask){
                that.exchangeValue=evt.data?.ask;
               }
              
          
           
            }
            ws.onclose = function() { 
              };
        }
           
    
        
    }},
     filters: {
        maxlength: function (value) {
            if (!value) return 0
            value = value.toString()
            return value.substr(0, 8)
        }
    }

}

</script>
  

<style  lang="scss">
svg {
    width: 100%;
    path {
    fill: #f2f9ea;

}
}

 

.diff {
    color: #0cca8e;
}

@import "/node_modules/currency-flags/dist/currency-flags.min.css"
</style>