'use strict'

let title;
let screens;
let screenPrice;
let adaptive;
let rollback  = 20;
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

const isNumber = function(num){
  // универсальная функция для проверки на число
  return !isNaN(parseFloat(num)) && isFinite(num)
}

const asking = function () {
  title =  prompt("Как называется ваш проект?", "калькулятор верстки");
  screens  = prompt("Какие типы экранов нужно разработать? ", "пример:'Простые, Сложные, Интерактивные'");


  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?");
  }
  while(!isNumber(screenPrice))

  // while(isNaN(screenPrice) || screenPrice.trim() === "" || screenPrice === null){
  //   screenPrice = prompt("Сколько будет стоить данная работа?");
  // }

  adaptive = confirm("Нужен ли адаптив на сайте?");
  }

const getAllServicePrices = function (){
  let sum = 0
  let enteredNumber = 0

  for (let i =0; i < 2; i++){

    if ( i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен ?")
    } else if ( i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен ?")
    }
    if(isNumber(enteredNumber = +prompt("Сколько это будет стоить?"))){
      sum = sum + enteredNumber
    }

  }
  return sum
}

const showTypeOf = function(variable){
  console.log(variable, typeof variable);
}

function getFullPrice(){
  return screenPrice + allServicePrices
}

function getServicePercentPrices(){
  return fullPrice - Math.round(fullPrice * (rollback/100));
}

const getTitle =  function (){
  title = title.trim().toLowerCase();
  return title[0].toUpperCase() + title.slice(1);
}


const getRollbackMessage = function(price){
  if (price >= 30000){
    return "Даём скидку в 10%"
  } else if (price>=15000 && price < 30000) {
    return "Даём скидку в 5%"
  } else if (price>=0 && price < 15000) {
    return "Скидка не предусмотрена"
  } else {
    return "что-то пошло не так"
  }
}

asking()
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice  = getServicePercentPrices();
title = getTitle()

showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)

console.log("allServicePrices" , allServicePrices);

console.log(getRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);

console.log("стоимость верски экрана " + screenPrice + " рублей и Стоимость разработки сайта " + fullPrice + " юаней");