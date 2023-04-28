const editIcon = 'assets/pencil.svg';
const deleteIcon = 'assets/delete.svg';


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
    const editBtnAnchor = document.createElement('a');
    const deleteBtnAnchor = document.createElement('a');
    
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
    
    editBtnAnchor.setAttribute('href', '#edit-book-popup');
    deleteBtnAnchor.setAttribute('href', '#delete-book-popup');

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
const grid = document.querySelector('.collection');
const addBtn = document.querySelector('#add-book');
const addBookBtn = document.querySelector('#add-book-in-popup');
const deleteBookBtn = document.querySelector('#delete-yes');
const closePopupBtns = document.querySelectorAll('.close-popup');

// popups
const addPopup = document.querySelector('#add-book-popup')
const deletePopup = document.querySelector('#delete-book-popup');

// Event listeners
addBtn.addEventListener('click', () => {
    displayPopup('add');
});

grid.addEventListener('click', gridEventListener);

addBookBtn.addEventListener('click', () => {
    const form = addPopup.querySelector('form');
    const title = form.querySelector('#book-title').value;
    const author = form.querySelector('#book-author').value;
    const pages = form.querySelector('#book-pages').value;
    const status = form.querySelector(`[name="status"]:checked`).value;
    console.log(title, author, pages, status);
    addBook(title, author, pages, status);
    closePopup(addPopup);
    resetForm(form);
});

deleteBookBtn.addEventListener('click', removeBookFromLibrary);

closePopupBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const popup = btn.parentElement.parentElement.parentElement;
        closePopup(popup);
    });
});


function updateLibraryGrid() {
    resetLibraryGrid();
    const grid = document.querySelector('.collection');
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

function addBook(title, author, page, status) {
    const book = new Book(title, author, page, status);
    book.createCard();
    library.push(book);
    updateLibraryGrid();
}

function removeBook(bookTbd) {
    library = library.filter(book => book !== bookTbd);
    updateLibraryGrid();
}

function removeBookFromLibrary() {
    const prompt = deletePopup.querySelector('p');
    const bookTitle = prompt.textContent.slice(prompt.textContent.indexOf("'")+1, -2)
    const book = library.find(book => book.title === bookTitle);
    console.log(book);
    removeBook(book);
    closePopup(deletePopup);
}

function gridEventListener(e) {
    if (e.target.id === 'delete') {
        const book = library.filter(book => book.card === e.target.parentElement.parentElement);
        const popup = document.querySelector('#delete-book-popup');
        popup.classList.toggle('active');
        const prompt = popup.querySelector('p');
        prompt.textContent += ` '${book[0].title}'?`;
    }
}

function resetForm(form) {
    form.reset();
}

function displayPopup(type) {
    if (type === 'add') {
        const popup = document.querySelector('#add-book-popup');
        popup.classList.toggle('active');
    } else if (type === 'delete') {
        const popup = document.querySelector('#delete-book-popup');
        popup.classList.toggle('active');
    }
}

function closePopup(popup) {
    popup.classList.toggle('active');
    if (popup.id === 'delete-book-popup') {
        const deletePopupPrompt = popup.querySelector('p');
        deletePopupPrompt.textContent = deletePopupPrompt.textContent.substring(0, deletePopupPrompt.textContent.indexOf("'"));
    }
}

addBook('The Way of Kings', 'Brandon Sanderson', '764', 'read');
addBook('Words of Radiance', 'Brandon Sanderson', '814', 'read');
addBook('Oathbringer', 'Brandon Sanderson', '852', 'reading');
addBook('Rhythm of War', 'Brandon Sanderson', 893, 'unread');

// displayPopup('add');