const editIcon = 'assets/pencil.svg';
const deleteIcon = 'assets/delete.svg';

// Book object

function Book(title, author, page, status) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.status = status;
    this.card = undefined;
}


Book.prototype.createCard = function createCard() {
    const card = document.createElement('div');
    const title = document.createElement('h2');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const status = document.createElement('p');
    const statusIndicator = document.createElement('span');
    const buttons = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    const editBtnIcon = document.createElement('img');
    const deleteBtnIcon = document.createElement('img');
    
    // Set text content
    title.textContent = this.title;
    author.textContent = this.author;
    pages.textContent = `Pages: ${this.page}`;
    status.textContent = 'Status: ';
    statusIndicator.textContent = this.status;
    
    if (this.status === 'unread') {
        statusIndicator.setAttribute('id', 'unread');
    } else if (this.status === 'reading') {
        statusIndicator.setAttribute('id', 'reading');
    } else if (this.status === 'read') {
        statusIndicator.setAttribute('id', 'read');
    } else {
        statusIndicator.style.color = '#09090b';
    }
    
    // set button
    buttons.classList.add('buttons');
    
    editBtn.setAttribute('type', 'button');
    deleteBtn.setAttribute('type', 'button');
    editBtn.setAttribute('id', 'edit');
    deleteBtn.setAttribute('id', 'delete');
    
    editBtnIcon.setAttribute('src', editIcon);
    deleteBtnIcon.setAttribute('src', deleteIcon);

    editBtn.appendChild(editBtnIcon);
    deleteBtn.appendChild(deleteBtnIcon);
    
    buttons.appendChild(editBtn);
    buttons.appendChild(deleteBtn);
    
    card.classList.add('card');
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    status.appendChild(statusIndicator);
    card.appendChild(buttons);
    
    this.card = card;
    return card;
};

let library = [];
let bookToBeEdited = {};
const grid = document.querySelector('.collection');
const addBtn = document.querySelector('#add-book');
const addBookBtn = document.querySelector('#add-book-in-popup');
const saveEditBtn = document.querySelector('#edit-book-in-popup');
const deleteBookBtn = document.querySelector('#delete-yes');
const closePopupBtns = document.querySelectorAll('.close-popup');

// popups
let activePopup = {};
const addPopup = document.querySelector('#add-book-popup');
const editPopup = document.querySelector('#edit-book-popup'); 
const deletePopup = document.querySelector('#delete-book-popup');

// Event listeners
addBtn.addEventListener('click', () => {
    displayPopup('add');
});

grid.addEventListener('click', gridEventListener);

addBookBtn.addEventListener('click', addBook);

saveEditBtn.addEventListener('click', () => {
    editBook(bookToBeEdited);
});

deleteBookBtn.addEventListener('click', removeBook);

closePopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        closePopup();
    });
});

// functions

function updateLibraryGrid() {
    resetLibraryGrid();
    library.forEach(book => {
        grid.appendChild(book.card);
    });
}

function resetLibraryGrid() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.remove();
    });
}

function addBook() {
    addBookToLibrary(getNewBookInfo());
    closePopup();
}

function addBookToLibrary(book) {
    book.createCard();
    library.push(book);
    updateLibraryGrid();
}

function getNewBookInfo() {
    const form = addPopup.querySelector('form');
    const title = form.querySelector('#book-title').value;
    const author = form.querySelector('#book-author').value;
    const pages = form.querySelector('#book-pages').value;
    const status = form.querySelector(`[name="status"]:checked`).value;
    return new Book(title, author, pages, status);
}

function removeBookFromLibrary(bookTbd) {
    library = library.filter(book => book !== bookTbd);
    updateLibraryGrid();
}

function removeBook() {
    const prompt = deletePopup.querySelector('p');
    const bookTitle = prompt.textContent.slice(prompt.textContent.indexOf("'")+1, -2)
    const book = library.find(book => book.title === bookTitle);
    removeBookFromLibrary(book);
    closePopup();
}

function gridEventListener(e) {
    const targetCard = e.target.parentElement.parentElement;
    const targetBook = library.find(book => book.card === targetCard);
    if (e.target.id === 'delete') {
        displayPopup('delete');
        const prompt = deletePopup.querySelector('p');
        prompt.textContent += ` '${targetBook.title}'?`;
    } else if (e.target.id === 'edit') {
        displayPopup('edit');
        bookToBeEdited = targetBook;
        fillEditPopup(bookToBeEdited);
    }
}

function fillEditPopup(book) {
    const form = editPopup.querySelector('form');
    form.querySelector('#book-title').value = book.title;
    form.querySelector('#book-author').value = book.author;
    form.querySelector('#book-pages').value = book.page;
    if (book.status === 'unread') {
        form.querySelector(`#current-book-unread`).checked = true;
    } else if (book.status === 'reading') {
        form.querySelector(`#current-book-reading`).checked = true;
    } else if (book.status === 'read') {
        form.querySelector(`#current-book-read`).checked = true;
    }
}

function editBook(bookToBeEdited) {
    const updatedBook = library.find(book => book === bookToBeEdited);
    const form = editPopup.querySelector('form');
    updatedBook.title = form.querySelector('#book-title').value;
    updatedBook.author = form.querySelector('#book-author').value;
    updatedBook.page = form.querySelector('#book-pages').value;
    updatedBook.status = form.querySelector(`[name="current-status"]:checked`).value;
    updatedBook.createCard();
    updateLibraryGrid();
    bookToBeEdited = {};
    closePopup();
}

function resetForm() {
    const form = activePopup.querySelector('form');
    form.reset();
}

function updateActivePopup() {
    const popups = document.querySelectorAll('.overlay');
    activePopup = [...popups].find(popup => popup.classList.contains('active'));
    console.log(activePopup);
}

function displayPopup(type) {
    if (type === 'add') {
        addPopup.classList.toggle('active');
    } else if (type === 'edit') {
        editPopup.classList.toggle('active');
    } else if (type === 'delete') {
        deletePopup.classList.toggle('active');
    }
    updateActivePopup();
}

function resetDeletePrompt() {
    const deletePopupPrompt = deletePopup.querySelector('p');
    deletePopupPrompt.textContent = deletePopupPrompt.textContent.substring(0, deletePopupPrompt.textContent.indexOf("'"));
}

function closePopup() {
    activePopup.classList.toggle('active');
    if (activePopup.id === 'delete-book-popup') {
        resetDeletePrompt();
    } else {
        resetForm();
    }
    updateActivePopup();
}

// UNCOMMENT TO ADD BOOK BY CODE
// function addBookManually(title, author, page, status) {
//     const book = new Book(title, author, page, status);
//     book.createCard();
//     library.push(book);
//     updateLibraryGrid();
// }

// addBookManually('The Way of Kings', 'Brandon Sanderson', '764', 'read');
// addBookManually('Words of Radiance', 'Brandon Sanderson', '814', 'read');
// addBookManually('Oathbringer', 'Brandon Sanderson', '852', 'reading');
// addBookManually('Rhythm of War', 'Brandon Sanderson', 893, 'unread');