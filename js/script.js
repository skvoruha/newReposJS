'use strict'

let title =  prompt("Как называется ваш проект?");
let screens  = prompt("Какие типы экранов нужно разработать? (пример:'Простые, Сложные, Интерактивные')");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let rollback  = 20;
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен ?")
let servicePrice1 = +prompt("Сколько это будет стоить?")
let service2 = prompt("Какой дополнительный тип услуги нужен ?")
let servicePrice2 = +prompt("Сколько это будет стоить?")
let allServicePrices;
let fullPrice;
let servicePercentPrice;

const showTypeOf = function(variable){
  console.log(variable, typeof variable);
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

const getAllServicePrices = function (){
 return servicePrice1 + servicePrice2;
}

function getFullPrice(){
  return screenPrice + allServicePrices
}

const getTitle =  function (){
  title = title.trim().toLowerCase();
  return title[0].toUpperCase() + title.slice(1);
}

function getServicePercentPrices(){
  return fullPrice - Math.round(fullPrice * (rollback/100));
}

allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice  = getServicePercentPrices();

showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf(adaptive)
getTitle()

console.log(getRollbackMessage(fullPrice));
console.log(screens);
console.log("стоимость верски экрана " + servicePercentPrice + " рублей/ долларов/ гривен/юань");