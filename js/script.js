const title = "Glo Academy";
const screens  = "Простые, Сложные, Интерактивные";
const screenPrice = 454545;
const rollback  = 99;
const fullPrice = 100000;
const adaptive = true;

console.log(typeof title);
console.log(typeof screens);
console.log(typeof screenPrice);

console.log(screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " долларов");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(screens.toLocaleLowerCase().split(", "));
console.log(fullPrice * (rollback/100));