'use strict'

const books = [
    "enders game",
    "game of thrones",
    "throne of glass",
    "hyperion",
    "the rise of endymion",
    "the fall of hyperion",
    "the lord of the rings",
    "the hobbit",
    "the cost of empire",
    "american history",
    "the bible",
    "the dictionary",
    "the thesaurus",
    "hell boy",
    "the walking dead",
    "jurassic park",
    "dune",
    "the illustrated man",
    "r is for rocket",
    "death is a lonely business",
    "1984",
    "farenheight 451",
    "the guiness book of world records"
];

const list_element = document.getElementById("list");
const pagination_element = document.getElementById("pagination");

let currentPage = 1;
let rows = 6;

function displayList(items, wrapper, rowsPerPage, page)
{
    wrapper.innerHTML = "";  
    page--;

    let start_pos = rowsPerPage * page;
    let end = start_pos + rowsPerPage;
    let booksShown = books.slice(start_pos, end);
    // console.log(booksShown);

    for (let i = 0; i < booksShown.length; i++)
    {
        let book_element = document.createElement('div');
        book_element.classList.add('item');
        book_element.innerHTML = booksShown[i];

        wrapper.appendChild(book_element);
    }
}


function setUpPagination(items, wrapper,rowsPerPage)
{
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length/rowsPerPage);
    let leftButton = paginationArrow("<",page_count,books);
    wrapper.appendChild(leftButton);
    for (let i = 1; i < page_count + 1; i++)
    {
        let button = paginationButton(i, items);
        wrapper.appendChild(button);
    }
    let rightButton = paginationArrow(">", page_count,books);
    wrapper.appendChild(rightButton);
}

function paginationButton(page, bookList)
{
    let button = document.createElement('button');
    button.innerText = page;
    if (currentPage == page)
    {
        button.classList.add('active');
    }

    button.addEventListener('click', function(){
        currentPage = page;
        displayList(bookList,list_element,rows,currentPage);

        let currentButton = document.querySelector('.pagenumbers button.active');
        currentButton.classList.remove('active');
        button.classList.add('active');
    });
    
    return button;
}

function paginationArrow(innerText, page_count, bookList)
{
    let button = document.createElement('button');
    button.innerText = innerText;

    button.addEventListener('click', function(){
        if (innerText == "<")
        {
            if (currentPage > 1)
            {
                currentPage--;
                displayList(bookList,list_element,rows,currentPage);
            }
        }
        else
        {
            if (currentPage < page_count)
            {
                currentPage++;
                displayList(bookList,list_element,rows,currentPage);
            }
        }
    });
    return button;
}

displayList(books,list_element,rows,currentPage);
setUpPagination(books,pagination_element,rows);