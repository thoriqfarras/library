const editIcon = 'assets/pencil.svg';
const deleteIcon = 'assets/delete.svg';

// Book object

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    (this.author = author), (this.pages = pages);
    this.status = status;
    this.createCard();
  }

  get title() {
    return this._title;
  }

  get author() {
    return this._author;
  }

  get pages() {
    return this._pages;
  }

  get status() {
    return this._status;
  }

  set title(title) {
    this._title = title;
  }

  set author(author) {
    this._author = author;
  }

  set pages(pages) {
    this._pages = pages;
  }

  set status(status) {
    this._status = status;
  }

  createCard() {
    this.card = createCard(this);
  }
}

function createCard(book) {
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
  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `Pages: ${book.pages}`;
  status.textContent = 'Status: ';
  statusIndicator.textContent = book.status;

  if (book.status === 'unread') {
    statusIndicator.setAttribute('id', 'unread');
  } else if (book.status === 'reading') {
    statusIndicator.setAttribute('id', 'reading');
  } else if (book.status === 'read') {
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

  return card;
}

class Library {
  library = [];
  // form = FormHandler();

  get library() {
    return this.library;
  }

  addBook(book) {
    if (this.library.map((book) => book.title).includes(book.title)) {
      return 'duplicate';
    }
    console.log(this.library);
    this.library.push(book);
    return 'success';
  }

  editBook(toBeEdited, newTitle, newAuthor, newPages, newStatus) {
    let updated = this.library.find((book) => book === toBeEdited);
    updated.title = newTitle;
    updated.author = newAuthor;
    updated.pages = newPages;
    updated.status = newStatus;
    updated.createCard();
  }

  removeBook(toBeRemoved) {
    this.library = this.library.filter(
      (book) => book.title !== toBeRemoved.title
    );
  }
}

function DisplayController() {
  const grid = document.querySelector('.collection');
  const addBtn = document.querySelector('#add-book');
  const commitBtn = document.querySelector('#commit-btn');
  const addAnotherBookBtn = document.querySelector('#add-another-book');
  const deleteBookBtn = document.querySelector('#delete-yes');
  const closePopupBtns = document.querySelectorAll('.close-popup');

  const bookPopup = document.querySelector('#add-book-popup');
  const deletePopup = document.querySelector('#delete-book-popup');
  const duplicatePopup = document.querySelector('#duplicate-book-popup');

  let activePopup = {};

  let library = new Library();
  let toBeEdited = {};
  let toBeRemoved = {};

  function resetLibraryGrid() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
      card.remove();
    });
  }

  function updateLibraryGrid() {
    resetLibraryGrid();
    library.library.forEach((book) => {
      grid.appendChild(book.card);
    });
  }

  function updateActivePopup() {
    const activePopups = document.querySelectorAll('.overlay');
    activePopup = [...activePopups].find((popup) =>
      popup.classList.contains('active')
    );
    console.log(activePopup);
  }

  function displayPopup(type) {
    if (type === 'book') {
      resetForm();
      bookPopup.classList.toggle('active');
    } else if (type === 'delete') {
      deletePopup.classList.toggle('active');
    } else if (type === 'duplicate') {
      duplicatePopup.classList.toggle('active');
    }
    updateActivePopup();
  }

  function closePopup() {
    activePopup.classList.toggle('active');
    updateActivePopup();
  }

  function addBookLibrary(e) {
    const form = activePopup.querySelector('form');
    const title = form.querySelector('#book-title').value;
    const author = form.querySelector('#book-author').value;
    const pages = form.querySelector('#book-pages').value;
    const status = form.querySelector(`[name="status"]:checked`).value;
    const book = new Book(title, author, pages, status);
    const result = library.addBook(book);

    if (result === 'duplicate') {
      const prompt = duplicatePopup.querySelector('p');
      prompt.textContent = `'${book.title}' is already in your library.`;
      displayPopup('duplicate');
    }

    resetForm();
  }

  function removeBookLibrary() {
    library.removeBook(toBeRemoved);
    toBeRemoved = {};
  }

  function fillEditPopup(book) {
    console.log(activePopup);
    const form = activePopup.querySelector('form');
    form.querySelector('#book-title').value = book.title;
    form.querySelector('#book-author').value = book.author;
    form.querySelector('#book-pages').value = book.pages;
    if (book.status === 'unread') {
      form.querySelector(`#current-book-unread`).checked = true;
    } else if (book.status === 'reading') {
      form.querySelector(`#current-book-reading`).checked = true;
    } else if (book.status === 'read') {
      form.querySelector(`#current-book-read`).checked = true;
    }
  }

  function editBookLibrary() {
    const updatedBook = library.library.find((book) => book === toBeEdited);
    const form = activePopup.querySelector('form');
    const newTitle = form.querySelector('#book-title').value;
    const newAuthor = form.querySelector('#book-author').value;
    const newPages = form.querySelector('#book-pages').value;
    const newStatus = form.querySelector(`[name="status"]:checked`).value;
    library.editBook(toBeEdited, newTitle, newAuthor, newPages, newStatus);
    toBeEdited = {};
  }

  function resetForm() {
    const form = bookPopup.querySelector('form');
    form.reset();
  }

  function gridEventHandler(e) {
    const targetCard = e.target.parentElement.parentElement;
    const targetBook = library.library.find((book) => book.card === targetCard);
    if (e.target.id === 'delete') {
      toBeRemoved = targetBook;
      displayPopup('delete');
      const prompt = deletePopup.querySelector('p');
      prompt.textContent = `Are you sure you want to remove '${targetBook.title}'?`;
    } else if (e.target.id === 'edit') {
      togglePopup(bookPopup, 'edit');
      displayPopup('book');
      toBeEdited = targetBook;
      fillEditPopup(toBeEdited);
    }
  }

  function libraryUpdateHandler(operation) {
    if (operation === 'add') addBookLibrary();
    else if (operation === 'delete') removeBookLibrary();
    else if (operation === 'edit') editBookLibrary();
    updateLibraryGrid();
    closePopup();
  }

  function formIsValid() {
    const title = document.getElementById('book-title');
    const author = document.getElementById('book-author');
    const pages = document.getElementById('book-pages');
    return (
      title.validity.valid && author.validity.valid && pages.validity.valid
    );
  }

  function togglePopup(popup, mode) {
    const title = popup.querySelector('h2');
    const commitBtn = popup.querySelector('#commit-btn');
    if (mode === 'edit') {
      title.innerText = 'Edit a Book';
      commitBtn.innerText = 'Save Changes';
      popup.dataset.mode = 'edit';
    } else if (mode === 'add') {
      title.innerText = 'Add a New Book';
      commitBtn.innerText = 'Add book';
      popup.dataset.mode = 'add';
    }
  }

  addBtn.addEventListener('click', () => {
    togglePopup(bookPopup, 'add');
    displayPopup('book');
  });
  grid.addEventListener('click', gridEventHandler);
  closePopupBtns.forEach((btn) => btn.addEventListener('click', closePopup));

  commitBtn.addEventListener('click', (e) => {
    if (!formIsValid()) return;
    e.preventDefault();
    if (activePopup.dataset.mode === 'add') {
      libraryUpdateHandler('add');
    } else if (activePopup.dataset.mode === 'edit') {
      libraryUpdateHandler('edit');
    }
  });
  deleteBookBtn.addEventListener('click', () => libraryUpdateHandler('delete'));

  addAnotherBookBtn.addEventListener('click', () => {
    closePopup();
    togglePopup(bookPopup, 'add');
    displayPopup('book');
  });
}

const display = DisplayController();
