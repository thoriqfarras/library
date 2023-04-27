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

const library = [];
const collection = document.querySelector('.collection');

function addBook(title, author, page, status) {
    const book = new Book(title, author, page, status);
    const card = book.createCard();
    library.push(book);
    collection.appendChild(card);
}

function removeBook(book) {
    library.splice(library.indexOf(book), 1);
    book.card.remove();
}

addBook('The Way of Kings', 'Brandon Sanderson', '764', 'read');
addBook('Words of Radiance', 'Brandon Sanderson', '814', 'read');
addBook('Oathbringer', 'Brandon Sanderson', '852', 'reading');
addBook('Rhythm of War', 'Brandon Sanderson', 893, 'unread');