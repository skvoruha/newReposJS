'use strict'

// урок 9
//1 получение заголовка методом getElementsByTagName -> элемент
const title = document.getElementsByTagName('h1')[0]
//2 Для получение кнопок сначала получим все элементы с классом handler_btn
const btnCalculate = document.getElementsByClassName('handler_btn')
//2  btnCalculate обращаемся к элементам с id start  reset
const btnStart = btnCalculate.start
const btnReset = btnCalculate.reset
//3  общаемся через querySelector по классу .screen-btn к кнопке плюс
let btnPlus = document.querySelector('.screen-btn')
//4 Получаем все элементы с классом .other-items.percent
const percent = document.querySelectorAll('.other-items.percent')
//4 Получаем все элементы с классом .other-items.number
const number = document.querySelectorAll('.other-items.number')
//5 обращаемя к родителю  .rollback > input с типом range
const rollbackInput = document.querySelector('.rollback input[type="range"]')
//6 обращаемя к родителю  .rollback а далеее к span с классом  span.range-value
const spanRangeValue = document.querySelector('.rollback span.range-value')
//7 Получаем все input с классом total-input'
const totalInput = document.getElementsByClassName('total-input')
//8 Получаем все эдементы с класом  screen
const screenBlock = document.querySelectorAll('.screen')


// Вывод заголовка 1
console.log(title);
// Вывод в консоль кнопок расчитать и сброс
console.log(btnStart);
console.log(btnReset);
console.log(percent);
console.log(number);
console.log(rollbackInput);
console.log(spanRangeValue);
// Вывод в консоль total-input
for (const iterator of totalInput) {
  console.log(iterator);
}
console.log(screenBlock);


// создадим объект
const appData = {
 title: '',
 screens:[],
 screenPrice: 0,
 adaptive: true,
 rollback: 10,
 allServicePrices: 0,
 fullPrice: 0,
 servicePercentPrice: 0,
 services: {},
 start: function(){
  appData.asking()
  appData.addPrices()
  appData.getFullPrice();
  appData.getServicePercentPrices();
  appData.getTitle()

  appData.logger()
 },
  logger: function(){
    for(let key in appData){
      let type = typeof(appData[key])

      console.log(key, (type === 'function' ? '' : appData[key]), '(' + type + ')');
    }
  },
  // данный метод будет задавать вопросы
 asking: function () {

    do {
        appData.title = prompt("Как называется ваш проект?", "калькулятор верстки");
      }
    while(appData.isNumber(appData.title))
    // appData.screens  = prompt("Какие типы экранов нужно разработать? ", "пример:'Простые, Сложные, Интерактивные'");

    for (let i =0; i < 2; i++){
      let name = ""
      let price = 0

      do {
        name = prompt("Какие типы экранов нужно разработать? ", "пример:'Простые, Сложные, Интерактивные'");
      }
      while(appData.isNumber(name))
      // пока name число оно выполняется


      do {
        price = +prompt("Сколько будет стоить данная работа?");
      }
      while(!appData.isNumber(price))

      appData.screens.push({id: i, name: name,price: price})
      //  в современном стандарте можно записать и так
      // screens.push({id: i, name, price})

    }

    for (let i =0; i < 2; i++){

      let name = ""
      let price = 0

      do {
        name = prompt("Какой дополнительный тип услуги нужен ?")+ " " + i
      }
      while(appData.isNumber(name))

      do {
        price = +prompt("Сколько это будет стоить?")
      } while (!appData.isNumber(price))

      appData.services[name] = +price

    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  // данный мтод будет высчитывать стоимость нашиъ услуг экранов
  addPrices: function(){
    // for (let screen of appData.screens){
    //   appData.screenPrice += screen.price
    // }
    appData.screenPrice = appData.screens.reduce(function(sum, item){
      return (sum + item.price)
    },0)

    for (let key in appData.services) {
      // в allServicePrices попадёт ссума всех наших значений из объекта services
      appData.allServicePrices += appData.services[key]
    }
  },
  isNumber: function(num){
  // универсальная функция для проверки на число
  return !isNaN(parseFloat(num)) && isFinite(num)
  // parseFloat(n)  Получаем из строки число с плавающей точкой или NaN в случае неудачи
  // isNaN(n)  Собственно проверяет значение на NaN, а мы проверяем с отрицанием
  // isFinite(n)  Проверяем является ли переданное значение конечным числом
  },
  getFullPrice: function (){
    appData.fullPrice = appData.screenPrice + appData.allServicePrices
  },
  getServicePercentPrices: function (){
    appData.servicePercentPrice = appData.fullPrice - Math.round(appData.fullPrice * (appData.rollback/100));
  },
  getTitle: function (){
    appData.title = appData.title.trim()[0].toUpperCase() + appData.title.trim(1).toLocaleLowerCase();
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
    console.log(appData.screens);
  }
}

appData.start()

