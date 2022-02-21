'use strict'

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
const OtherItemsPercent = document.querySelectorAll('.other-items.percent')
//4 Получаем все элементы с классом .other-items.number
const OtherItemsNumber = document.querySelectorAll('.other-items.number')
//5 обращаемя к родителю  .rollback > input с типом range
const rollbackInput = document.querySelector('.rollback input[type="range"]')
//6 обращаемя к родителю  .rollback а далеее к span с классом  span.range-value
const spanRangeValue = document.querySelector('.rollback span.range-value')
//7 Получаем все input с классом total-input'
// const totalInput = document.getElementsByClassName('total-input')
const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]
//8 Получаем все эдементы с класом  screen
let screens = document.querySelectorAll('.screen')


// Вывод заголовка 1
// console.log(title);
// // Вывод в консоль кнопок расчитать и сброс
// console.log(btnStart);
// console.log(btnReset);
// console.log(percent);
// console.log(number);
// console.log(rollbackInput);
// console.log(spanRangeValue);
// // Вывод в консоль total-input
// for (const iterator of totalInput) {
//   console.log(iterator);
// }
// console.log(screenBlock);
// КОНЕЦ ВЫВОДОВ В КОНСОЛЬ

// создадим объект
const appData = {
  title: '',
  screens: [],
  screensAll: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    appData.addTitle()

    btnStart.addEventListener('click', appData.checklAddScreen)

    btnPlus.addEventListener('click',appData.addScreenBlock)
    // input type range добавляем просулшивание события
    rollbackInput.addEventListener('input',appData.inputRange)
    rollbackInput.addEventListener('change',appData.inputRange)

  },

  checklAddScreen: function() {
    // 1-12
    if(appData.addScreens() == true)  alert("Не выбран ни один тип экрана в выпадающем списке и не введено их количество");

    else  appData.start();
  },
  addTitle:function(){
    // сдеали навазние вкалдки под название главного заголоовка
    document.title = title.textContent
  },

  start: function () {

    appData.addScreens()

    // appData.screens.forEach(element => {
    //   console.log(element.price);
    // });

    appData.addServices()

    appData.addPrices()
    // appData.getServicePercentPrices();

    // appData.logger()
    appData.showResult()

  },
  addScreens: function(){

    appData.screens.length = 0
    screens = document.querySelectorAll('.screen')

    screens.forEach(function(screen, index){

      const select = screen.querySelector('select')
      const input = screen.querySelector('input')


      // Получаем из select все options и выбираем  [select.selectedIndex] тот элемент п оинедкус котрый на нужен
      const selectname = select.options[select.selectedIndex].textContent
        appData.screens.push({
        id: index,
        name: selectname,
        price: +select.value * +input.value,
         // 4-12
        count: +input.value
        })
      })
      //1-12 в обекте screeens ищем item -> price и если он равен 0 то
      if(appData.screens.find(item => item.price === 0)) return true
      else return false

  },
  addServices: function(){
    OtherItemsPercent.forEach(function(item){
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      // в чекбоксе есть проверка checked стоит галовка
      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value
      }

    })
    OtherItemsNumber.forEach(function(item){
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      // в чекбоксе есть проверка checked стоит галовка
      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value
      }

    })
  },
  showResult: function(){
    // стоимость вёрстки
    total.value = appData.screenPrice
    // Сумарное количесство экранов
    totalCount.value = appData.screensAll
    // суммарная стоимость дополнительных услуг
    totalCountOther.value = appData.servicePricesPercent +  appData.servicePricesNumber
    // итоговая стоимость
    fullTotalCount.value = appData.fullPrice
    // Стоимость с учетом отката
    totalCountRollback.value = appData.servicePercentPrice

    // 4-12
  },
  addScreenBlock: function(){
    // добавим переменнюу screens для того чтобы получать актуальную длину объекта
    screens = document.querySelectorAll('.screen')
    // клонируем блок с расчёт по типу экарана
    const cloneScreen = screens[0].cloneNode(true)

    // Обрщаемся к дочернему элеммеену ищеи инпут и ставим начение пустое
    cloneScreen.childNodes[3].childNodes[1].value = ''

    // обращаемся к самому последнему элменту массива screens
    screens[screens.length - 1].after(cloneScreen)
  },
  logger: function () {
    for (let key in appData) {
      let type = typeof (appData[key])

      console.log(key, (type === 'function' ? '' : appData[key]), '(' + type + ')');
    }
  },

  // данный мтод будет высчитывать стоимость нашиъ услуг экранов
  addPrices: function () {
    appData.screenPrice = appData.screens.reduce(function (sum, item) {
      return (sum + item.price)
    }, 0)

    for (let key in appData.servicesNumber) {
      // в allServicePrices попадёт ссума всех наших значений из объекта services
      appData.servicePricesNumber += appData.servicesNumber[key]
    }

    for (let key in appData.servicesPercent) {
      // в allServicePrices попадёт ссума всех наших значений из объекта services
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesNumber + appData.servicePricesPercent
    // 3-12 В servicePercentPrice  запишем цену с учётом отката посреднику
    appData.servicePercentPrice = appData.fullPrice + Math.round(appData.fullPrice * (appData.rollback / 100));


    // 4-12
    appData.screensAll = appData.screens.reduce(function(sum, elem) {
      return sum + elem.count;
    }, 0);
    // 4-12

  },
  showTypeOf: function (variable) {
    console.log(variable, typeof variable);
    console.log(appData.screens);
  },
  // 2-12
  inputRange: function(event){
    spanRangeValue.textContent = event.target.value + "%"
  }
}

appData.init()