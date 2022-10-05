 import axios from 'axios';
 import {dateTransform} from './dateTransform.service';
 import {TimeSlots} from '@/enums/labels.enum';


export  class CurrencyService extends dateTransform {
 
get_live_currencies_list(){
    return axios.get('live_currencies_list');
}

get_live_exchange(from,to){
    return axios.get(`live?currency=${from}${to}`)
}

get_timeseries_exchange(from,to,timeZone){
    let fromDate;
    let interval='minute';
    switch(timeZone.type){
        case TimeSlots.Mintus:
            fromDate=this.addMinutes(timeZone.value,new Date());
            break;
            case TimeSlots.Hours:
                fromDate=this.addMinutes(timeZone.value,new Date());
                break;
             case TimeSlots.Day:
                interval='hourly'

                fromDate=new Date(new Date().getTime() - 24*60*60*1000);
                break;
                case TimeSlots.Week:
                    interval='hourly'
                    fromDate=new Date(new Date().getTime() - (24*60*60*1000*7));
                    break;
                   
                    case TimeSlots.Month:
                        interval='hourly'

                        fromDate=new Date(new Date().getTime() - (24*60*60*1000*30));
                        break;

                        default:
                            fromDate=this.addMinutes(timeZone,new Date());
                            break;
 


        
    }
    return axios.get(`timeseries?currency=${from}${to}&start_date=${this.formatDate(fromDate)}&end_date=${this.formatDate( new Date())}&interval=${interval}&format=records`)
}
   

startLiveData(){
    let connect = function(){
        if ("WebSocket" in window) {
 
            // Let us open a web socket
            var ws = new WebSocket("wss://marketdata.tradermade.com/feedadv");
          
            ws.onopen = function() {
               
               // Web Socket is connected, send data using send()
               ws.send("{\"userKey\":\"wsKiJkQEloXcUEzncTKQ\", \"symbol\":\"GBPUSD\"}");
             };
          
            ws.onmessage = function (evt) { 
              // var received_msg = evt.data;
               console.log("Message is received...",evt.data);
              };
          
            ws.onclose = function() { 
                 setTimeout(connect,10*1000)
               // websocket is closed.
             };
          } else {
           
            // The browser doesn't support WebSocket
            alert("WebSocket NOT supported by your Browser!");
          }}; 
          connect();

    }
  

}