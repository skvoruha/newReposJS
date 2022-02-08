'use strict'

// создадим объект
const appData = {
 title: '',
 screens:'',
 screenPrice: 0,
 adaptive: true,
 rollback: 10,
 allServicePrices: 0,
 fullPrice: 0,
 servicePercentPrice: 0,
 service1: '',
 service2: '',
 start: function(){
  appData.asking()

  appData.title = appData.getTitle()

  appData.allServicePrices = appData.getAllServicePrices();
  appData.fullPrice = appData.getFullPrice();
  appData.servicePercentPrice  = appData.getServicePercentPrices();

  appData.logger()
 },
  logger: function(){
    for(let key in appData){
      let type = typeof(appData[key])

      console.log(key, (type === 'function' ? '' : appData[key]), '(' + type + ')');
    }
  },
 asking: function () {
    appData.title =  prompt("Как называется ваш проект?", "калькулятор верстки");
    appData.screens  = prompt("Какие типы экранов нужно разработать? ", "пример:'Простые, Сложные, Интерактивные'");


    do {
      appData.screenPrice = +prompt("Сколько будет стоить данная работа?");
    }
    while(!appData.isNumber(appData.screenPrice))

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  isNumber: function(num){
  // универсальная функция для проверки на число
  return !isNaN(parseFloat(num)) && isFinite(num)
  },
  getAllServicePrices: function (){
  let sum = 0


    for (let i =0; i < 2; i++){
      let price = 0

      if ( i === 0) {
        appData.service1 = prompt("Какой дополнительный тип услуги нужен ?")
      } else if ( i === 1) {
        appData.service2 = prompt("Какой дополнительный тип услуги нужен ?")
      }

      do {
        price = +prompt("Сколько это будет стоить?")
      } while (!appData.isNumber(price))
      sum += price

    }
    return sum
  },
  getFullPrice: function (){
    return appData.screenPrice + appData.allServicePrices
  },
  getServicePercentPrices: function (){
    return appData.fullPrice - Math.round(appData.fullPrice * (appData.rollback/100));
  },
  getTitle: function (){
    appData.title = appData.title.trim().toLowerCase();
    return appData.title[0].toUpperCase() + appData.title.slice(1);
  },
  getRollbackMessage: function(price){
    if (price >= 30000){
      return "Даём скидку в 10%"
    } else if (price>=15000 && price < 30000) {
      return "Даём скидку в 5%"
    } else if (price>=0 && price < 15000) {
      return "Скидка не предусмотрена"
    } else {
      return "что-то пошло не так"
    }
  },
  showTypeOf: function(variable){
    console.log(variable, typeof variable);
  }
}

appData.start()

// ВЫЗОВ ФУНКЦИИ showTypeOf удали по видео из урока
// showTypeOf(title)
// showTypeOf(screenPrice)
// showTypeOf(adaptive)

// console.log("allServicePrices" , allServicePrices);

// console.log(getRollbackMessage(fullPrice));
// console.log(typeof title);
// console.log(typeof screenPrice);
// console.log(typeof adaptive);

// console.log(screens.length);
// console.log(servicePercentPrice);

// console.log("стоимость верски экрана " + screenPrice + " рублей и Стоимость разработки сайта " + fullPrice + " юаней");
