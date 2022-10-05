 
 

export  class dateTransform {
 
 
 addMinutes(numOfMinutes, date ) {
    date.setMinutes(date.getMinutes() - numOfMinutes);
  
    return date;
  }
  padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
   formatDate(date) {
    return (
      [
        date.getFullYear(),
        this.padTo2Digits(date.getMonth() + 1),
        this.padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        this.padTo2Digits(date.getHours())-2,
        this.padTo2Digits(date.getMinutes()),
       ].join(':')
    );
  }
}