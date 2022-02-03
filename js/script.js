'use strict'

const title =  prompt("Как называется ваш проект?");
const screens  = prompt("Какие типы экранов нужно разработать? (пример:'Простые, Сложные, Интерактивные')");
const screenPrice = +prompt("Сколько будет стоить данная работа?");
const rollback  = 20;
const adaptive = confirm("Нужен ли адаптив на сайте?");
const service1 = prompt("Какой дополнительный тип услуги нужен ?")
const servicePrice1 = +prompt("Сколько это будет стоить?")
const service2 = prompt("Какой дополнительный тип услуги нужен ?")
const servicePrice2 = +prompt("Сколько это будет стоить?")
const fullPrice = screenPrice + servicePrice1 + servicePrice2;
const servicePercentPrice = fullPrice - Math.round(fullPrice * (rollback/100));

console.log(title);
console.log("Тип экрана: " + screens);
console.log("Адаптив: " + Boolean(adaptive));
console.log("Дополнительная услуга 1: " + service1);
console.log("Дополнительная услуга 2: " + service2);

switch (true){
  case fullPrice > 30000:
    console.log("Даем скидку в 10%");
    console.log("Итоговая стоимость: " + (fullPrice - (fullPrice * (5/100))));
    break;
  case fullPrice >= 15000 && fullPrice < 30000:
    console.log("Даем скидку в 5%");
    console.log("Итоговая стоимость: " + (fullPrice - (fullPrice * (10/100))));
    break;
  case fullPrice => 0 && fullPrice < 15000:
    console.log("Скидка не предусмотрена");
    console.log("Итоговая стоимость: " + fullPrice);
    break;
  case fullPrice < 0 :
    console.log("Что то пошло не так");
    break;
  default:
    console.log("Что то явно не так поскольку default");
}
