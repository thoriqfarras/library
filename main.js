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

    editBtnAnchor.appendChild(editBtnIcon);
    deleteBtnAnchor.appendChild(deleteBtnIcon);
    editBtn.appendChild(editBtnAnchor);
    deleteBtn.appendChild(deleteBtnAnchor);

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

// function Library() {
//     this.books = [];
// }

// Library.prototype.addBook = function addBook(title, author, page, status) {
//     const book = new Book(title, author, page, status);
//     book.createCard();
//     this.books.push(book);
// }

function createAddBookPopUp() {
    const overlay = document.createElement('div');
    const popup = document.createElement('div');
    const header = document.createElement('div');
    const headerTitle = document.createElement('h2');
    const headerCross = document.createElement('a');
    const inputs = document.createElement('ul');
    const titleInput = document.createElement('li');
    const authorInput = document.createElement('li');
    const pagesInput = document.createElement('li');
    const statusInput = document.createElement('li');

    // Overlay
    overlay.classList.add('overlay');
    overlay.setAttribute('id', 'add-book-popup');

    // Popup
    popup.classList.add('popup');

    // Header
    header.classList.add('header');
    headerTitle.textContent = 'Add a book';
    headerCross.textContent = 'x';
    headerCross.setAttribute('href', '#');

    // Title input
    const titleLabel = document.createElement('label');
    titleLabel.setAttribute('for', 'book-title');
    titleLabel.textContent = 'Title';
    const titleInputField = document.createElement('input');
    titleInputField.setAttribute('type', 'text')
    titleInputField.setAttribute('name', 'title')
    titleInputField.setAttribute('id', 'book-title');
    titleInput.appendChild(titleLabel);
    titleInput.appendChild(titleInputField);

    // Author input
    const authorLabel = document.createElement('label');
    authorLabel.setAttribute('for', 'book-author');
    authorLabel.textContent = 'Author';
    const authorInputField = document.createElement('input');
    authorInputField.setAttribute('type', 'text')
    authorInputField.setAttribute('name', 'author')
    authorInputField.setAttribute('id', 'book-author');
    authorInput.appendChild(authorLabel);
    authorInput.appendChild(authorInputField);

    // Pages input
    const pagesLabel = document.createElement('label');
    pagesLabel.setAttribute('for', 'book-pages');
    pagesLabel.textContent = 'Pages';
    const pagesInputField = document.createElement('input');
    pagesInputField.setAttribute('type', 'number')
    pagesInputField.setAttribute('name', 'pages')
    pagesInputField.setAttribute('id', 'book-pages');
    pagesInput.appendChild(pagesLabel);
    pagesInput.appendChild(pagesInputField);

    // Status Input
    const statusFieldset = document.createElement('fieldset');
    const statusLegend = document.createElement('legend');
    const radioButtons = document.createElement('div');
    radioButtons.classList.add('radio-buttons');
    const radioButtonsLabels = document.createElement('div');
    radioButtonsLabels.classList.add('radio-buttons-text');
    statusInput.appendChild(statusFieldset);
    statusFieldset.appendChild(statusLegend);
    statusFieldset.appendChild(radioButtons);
    statusFieldset.appendChild(radioButtonsLabels);

    // // Unread button
    const unreadLabel = document.createElement('label');
    unreadLabel.setAttribute('for', 'book-unread');
    unreadLabel.textContent = 'To be read';
    const unreadInputField = document.createElement('input');
    unreadInputField.setAttribute('type', 'radio')
    unreadInputField.setAttribute('name', 'status')
    unreadInputField.setAttribute('id', 'book-unread')
    unreadInputField.setAttribute('value', 'unread');
    radioButtonsLabels.appendChild(unreadLabel);
    radioButtons.appendChild(unreadInputField);
    
    // // Reading button
    const readingLabel = document.createElement('label');
    readingLabel.setAttribute('for', 'book-reading');
    readingLabel.textContent = 'Currently reading';
    const readingInputField = document.createElement('input');
    readingInputField.setAttribute('type', 'radio')
    readingInputField.setAttribute('name', 'status')
    readingInputField.setAttribute('id', 'book-reading')
    readingInputField.setAttribute('value', 'reading');
    radioButtonsLabels.appendChild(readingLabel);
    radioButtons.appendChild(readingInputField);
    
    // // Reading button
    const readLabel = document.createElement('label');
    readLabel.setAttribute('for', 'book-read');
    readLabel.textContent = 'Read';
    const readInputField = document.createElement('input')
    readInputField.setAttribute('type', 'radio')
    readInputField.setAttribute('name', 'status')
    readInputField.setAttribute('id', 'book-read')
    readInputField.setAttribute('value', 'read');
    radioButtonsLabels.appendChild(readLabel);
    radioButtons.appendChild(readInputField);

    overlay.appendChild(popup);
    popup.appendChild(header);
    popup.appendChild(inputs);
    header.appendChild(headerTitle);
    header.appendChild(headerCross);
    inputs.appendChild(titleInput);
    inputs.appendChild(authorInput);
    inputs.appendChild(pagesInput);
    inputs.appendChild(statusInput);
    return overlay;
}

const library = [];
const body = document.querySelector('body');
const collection = document.querySelector('.collection');
let cards = document.querySelectorAll('.card');

function addBook(title, author, page, status) {
    const book = new Book(title, author, page, status);
    const card = book.createCard();
    library.push(book);
    collection.appendChild(card);
    cards = document.querySelectorAll('.card');
}

function removeBook(book) {
    library.splice(library.indexOf(book), 1);
    book.card.remove();
}

addBook('The Way of Kings', 'Brandon Sanderson', '764', 'read');
addBook('Words of Radiance', 'Brandon Sanderson', '814', 'read');
addBook('Oathbringer', 'Brandon Sanderson', '852', 'reading');
addBook('Rhythm of War', 'Brandon Sanderson', 893, 'unread');

// cards.forEach(card => {
//     const editBtn = card.querySelector('#edit');
//     // editBtn.addEventListener('click', editBook);

//     const deleteBtn = card.querySelector('#delete');
//     // deleteBtn.addEventListener('click', removeBook);
// });

library.forEach((book) => {
    const editBtn = book.card.querySelector('#edit');
    const deleteBtn = book.card.querySelector('#delete');

    deleteBtn.addEventListener('click', () => {
        removeBook(book);
    });
});