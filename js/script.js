'use strict'
const body = document.querySelector('body')
const adv = body.querySelector('.adv')
// в переменную books зписываем все элементы с классои book
const books = document.querySelectorAll('.book')
//1 Восстановил порядок книг.
// книгу 1(books[1]) ставлю перед книгой 2 (books[0])
books[0].before(books[1])
// книгу 3(books[4]) ставлю перед книгой 4 (books[2])
books[3].before(books[4])
// книгу 3(books[4]) ставлю перед книгой 4 (books[3])
books[3].after(books[2])
books[3].after(books[5])
// 1 ое конец задания

// 2 Замена фона у body
body.style.backgroundImage = "url(./image/computer_book.jpg)"
//3 исправление Пропопипы на Прототипы
books[4].querySelector('h2 > a').textContent = "Книга 3. this и Прототипы Объектов";
// 4 Убираем рекламу с классом adv в body
adv.style.display = "none"
// 5
const itemsTwoBook = books[0].querySelectorAll('ul > li')
const itemsFiveBook = books[5].querySelectorAll('ul > li')
const itemsSixBook =  books[2].querySelector('ul')
// Глава 2 после 1 главый
itemsTwoBook[3].after(itemsTwoBook[6])
//  глава 3 перед 4 ой
itemsTwoBook[4].before(itemsTwoBook[8])
// Приложение С после приложенрия B
itemsTwoBook[9].after(itemsTwoBook[2])

// Книга 5 Распрееление элементов
// Глава 1 после предисловия
itemsFiveBook[1].after(itemsFiveBook[9])
// глава 2 после 1 главый
itemsFiveBook[9].after(itemsFiveBook[3])
// глава 3 после 2 ой
itemsFiveBook[3].after(itemsFiveBook[4])
// приложение а После 6 ой главый
itemsFiveBook[7].after(itemsFiveBook[5])

// создаём элмент li
const newElemSixBookEight = document.createElement('li')
newElemSixBookEight.textContent = "Глава 8: За пределами ES6"
// добавляем вконец элемент
itemsSixBook.append(newElemSixBookEight)
// меняем места с приложением А главу 8 ую
itemsSixBook.querySelectorAll('li')[8].after(itemsSixBook.querySelectorAll('li')[10])
console.log(itemsSixBook);
