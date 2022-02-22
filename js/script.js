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
    this.addTitle()

    btnStart.addEventListener('click', this.checklAddScreen.bind(this))
    btnReset.addEventListener('click', this.resetBtnClick.bind(this))

    btnPlus.addEventListener('click',this.addScreenBlock.bind(this))
    // input type range добавляем просулшивание события
    rollbackInput.addEventListener('input',this.inputRange.bind(this))
    rollbackInput.addEventListener('change',this.inputRange.bind(this))

  },

  checklAddScreen: function() {
    // 1-12
    if(this.addScreens() == true) alert("Не выбран ни один тип экрана в выпадающем списке и не введено их количество");

    else this.start();
    // else (() => appData.start)
  },
  addTitle:function(){
    // сдеали навазние вкалдки под название главного заголоовка
    document.title = title.textContent
  },

  start: function () {

    // this.addScreens()
    this.addServices()
    this.addPrices()
    this.showResult()
    this.resetBtnClick()


  },
  // данный метод собирает значение из select и input чтобы ссделать вычиследния
  addScreens: function(){
    this.screens.length = 0
    screens = document.querySelectorAll('.screen')
    console.log(screens);

    screens.forEach((screen, index) => {

      const select = screen.querySelector('select')
      const input = screen.querySelector('input')


      // Получаем из select все options и выбираем  [select.selectedIndex] тот элемент п оинедкус котрый на нужен
      const selectname = select.options[select.selectedIndex].textContent
        this.screens.push({
        id: index,
        name: selectname,
        price: +select.value * +input.value,
         // 4-12
        count: +input.value
        })
      })
      //1-12 в обекте screeens ищем item -> price и если он равен 0 то
      if(this.screens.find(item => item.price === 0)) return true
      else return false
  },
  addServices: function(){
    OtherItemsPercent.forEach((item) =>{
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      // в чекбоксе есть проверка checked стоит галовка
      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value
      }

    })
    OtherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')
      // в чекбоксе есть проверка checked стоит галовка
      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value
      }

    })
  },
  showResult: function(){
    // стоимость вёрстки
    total.value = this.screenPrice
    // Сумарное количесство экранов
    totalCount.value = this.screensAll
    // суммарная стоимость дополнительных услуг
    totalCountOther.value = this.servicePricesPercent +  this.servicePricesNumber
    // итоговая стоимость
    fullTotalCount.value = this.fullPrice
    // Стоимость с учетом отката
    totalCountRollback.value = this.servicePercentPrice

    // 4-12
  },
  addScreenBlock: function(){
    // добавим переменнюу screens для того чтобы получать актуальную длину объекта
    screens = document.querySelectorAll('.screen')
    // клонируем блок с расчёт по типу экарана
    const cloneScreen = screens[0].cloneNode(true)
    // console.log(screens[screens.length - 1]);

    // Обрщаемся к дочернему элеммеену ищеи инпут и ставим начение пустое
    cloneScreen.childNodes[3].childNodes[1].value = ''

    // обращаемся к самому последнему элменту массива screens
    screens[screens.length - 1].after(cloneScreen)
  },
  logger: function () {
    for (let key in this) {
      let type = typeof (this[key])

      console.log(key, (type === 'function' ? '' : this[key]), '(' + type + ')');
    }
  },

  // данный мтод будет высчитывать стоимость нашиъ услуг экранов
  addPrices: function () {
    this.screenPrice = this.screens.reduce((sum, item)=> {
      return (sum + item.price)
    }, 0)

    for (let key in this.servicesNumber) {
      // в allServicePrices попадёт ссума всех наших значений из объекта services
      this.servicePricesNumber += this.servicesNumber[key]
    }

    for (let key in this.servicesPercent) {
      // в allServicePrices попадёт ссума всех наших значений из объекта services
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
    }

    this.fullPrice = this.screenPrice + this.servicePricesNumber + this.servicePricesPercent
    // 3-12 В servicePercentPrice  запишем цену с учётом отката посреднику
    this.servicePercentPrice = this.fullPrice + Math.round(this.fullPrice * (this.rollback / 100));


    // 4-12
    this.screensAll = this.screens.reduce((sum, elem) => {
      return sum + elem.count;
    }, 0);
    // 4-12

  },
  showTypeOf: function (variable) {
    console.log(variable, typeof variable);
    console.log(this.screens);
  },
  // 2-12
  inputRange: function(event){
    spanRangeValue.textContent = event.target.value + "%"
  // hard-1-12
    this.rollback = event.target.value
    this.servicePercentPrice = this.fullPrice + Math.round(this.fullPrice * (this.rollback / 100));
    totalCountRollback.value = this.servicePercentPrice
  },
  // 14-3
  resetBtnClick: function(){
    const inputRange = document.querySelector('input[type = "range"]')

    // если btnReset.style.display == block при нажатии унопуи , то обнуляем чекбоксы
    if (btnReset.style.display == 'block') {
      OtherItemsPercent.forEach((item) =>{
        const check = item.querySelector('input[type=checkbox]')
        // в чекбоксе есть проверка checked стоит галовка
        // если стоит галочка то убрать
        if (check.checked) {
          check.checked = !check.checked
        }
      })
      OtherItemsNumber.forEach((item) => {
        const check = item.querySelector('input[type=checkbox]')
        // в чекбоксе есть проверка checked стоит галочка
        if (check.checked) {
          check.checked = !check.checked
        }
      })
      // Обнуление параметров вычислений
      document.querySelectorAll('input.total-input').forEach(element => {
        element.value = 0
      });

      // очищаем массив с веденными данными
      let elems = document.querySelectorAll(".screen");
      for (let i = elems.length - 1; i > 0; i--) {
          elems[i].remove();
      }
      elems[0].querySelector('input').value = ''
      elems[0].querySelector('select').selectedIndex  = 0

      // ниже скобка это конец проверки btnReset.style.display == block

      // присваиваем значение 0 инпуту
      inputRange.value = 0
      document.querySelector('span.range-value').textContent = 0 + "%"
      // присваиваем значение ноль полной цене чтобы не работал Range
      this.fullPrice = 0
    }

    // получаем все инпута с типо текст потом перечисляем их через массив и присваиваем противоположное свойсвто
    let inputCountScreen = document.querySelectorAll('input[placeholder="Количество экранов"]')
    inputCountScreen.forEach(element => {
      element.disabled = !element.disabled
    });
    // получаем селект и присваиваем пртивоположное
    document.querySelectorAll('select').forEach(element=>{
      element.disabled = !element.disabled
    })
    // получаем селект и присваиваем пртивоположное
    document.querySelectorAll('input[type="checkbox"]').forEach(element=>{
      element.disabled = !element.disabled
    })

    // Кнопке плюс блокируем disabled
    btnPlus.disabled = !btnPlus.disabled

    // input с типо range
    inputRange.disabled = !inputRange.disabled


    // присваиваем кнопке расчитать свойства кнопки сброс
    // создаем переменнюу temp для того чтобы передать значние display
    let temp
    temp = btnStart.style.display
    btnStart.style.display = btnReset.style.display
    btnReset.style.display = temp

  }
}

appData.init()