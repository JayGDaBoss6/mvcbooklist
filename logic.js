let model = (function () {

    let storage = {
        books: []
    }

    function addItem() {

        let title = document.getElementById('bookTitle').value;
        let author = document.getElementById('author').value;
        let isbn = document.getElementById('isbn').value;

        document.getElementById('bookTitle').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

        model.storage.books.push({
            title: title,
            author: author,
            isbn: isbn
        });

        localStorage.setItem('books', JSON.stringify(model.storage.books));
        view.render();

    }

    function editItem(event) {

        let author = event.target.parentElement.parentElement.previousElementSibling
            .previousElementSibling.previousElementSibling.innerText;

        let title = event.target.parentElement.parentElement.previousElementSibling
            .previousElementSibling.previousElementSibling.previousElementSibling.innerText;

        let isbn = event.target.parentElement.parentElement
            .previousElementSibling.previousElementSibling.innerText;

        $("#editItemModal").modal();
        document.getElementById('modalBookTitle').value = '';
        document.getElementById('modalBookAuthor').value = '';
        document.getElementById('modalBookISBN').value = '';
        document.getElementById('saveChanges').addEventListener('click', event => {
            let title = document.getElementById('modalBookTitle').value;
            let author = document.getElementById('modalBookAuthor').value;
            let bookIsbn = document.getElementById('modalBookISBN').value;
            model.storage.books.forEach((item, index) => {
                if (item.isbn === isbn) {
                    item.title = title;
                    item.author = author;
                    item.isbn = bookIsbn;
                    localStorage.setItem('books', JSON.stringify(model.storage.books));
                    view.render();
                    $("#editItemModal").modal('toggle');
                }


            })

        })


    }

    function deleteItem(event) {

        let isbn = event.target.parentElement.previousElementSibling.innerText;

        model.storage.books.forEach((item, index) => {

            if (item.isbn === isbn) {
                model.storage.books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(model.storage.books));
                view.render();
            }

        })

    };

    function init() {

        if (localStorage.getItem('books')) {

            model.storage.books = JSON.parse(localStorage.getItem('books'));
            view.render()

        } else {
            model.storage.books = [];
            localStorage.setItem('books', JSON.stringify([]))
        }
    }

    return {
        storage: storage,
        init: init,
        addItem: addItem,
        deleteItem: deleteItem,
        editItem: editItem,
    }

})()



let view = (function () {

    document.addEventListener('submit', event => {
        event.preventDefault();
        model.addItem();
    })



    function render() {

        document.getElementById('books-list').innerHTML = '';

        model.storage.books.forEach(item => {



            let template = `
            <tr>
            <td><p id="title">${item.title}</p></td>
            <td><p id="author">${item.author}</p></td>
            <td><p id="item">${item.isbn}</p></td>
            <td><a class="x" href="#">X</a></td>
            <td><a href="#"><img class="pens" src="pen.png"></a></td>
          </tr>`;

            document.getElementById('books-list').innerHTML += template;

        });

        document.querySelectorAll('.x').forEach(item => {
            item.addEventListener('click', event => {
                model.deleteItem(event);
            })
        });

        document.querySelectorAll('.pens').forEach(item => {
            item.addEventListener('click', event => {
                model.editItem(event)
            })
        });

        document.getElementById('bookTitle').focus();

    };


    function saveItem(event) {

        let item = getElementById('modalBookTitle').value;
        let author = getElementById('modalBookAuthor').value;
        let isbn = getElementById('modalBookISBN').value;
        console.log(item, author, isbn);
        $("#editItemModal").modal('hide');


    }

    function showSuccess() {

        document.getElementById('success').classList.toggle('d-none')

        setTimeout(() => {
            document.getElementById('success').classList.toggle('d-none')
        }, 3000);

    }

    function showError() {
        document.getElementById('error').classList.toggle('d-none')

        setTimeout(() => {
            document.getElementById('error').classList.toggle('d-none')
        }, 3000);

    }

    return {
        render: render,
        saveItem: saveItem,
        showSuccess: showSuccess,
        showError: showError
    }
})();


let controller = (function () {

    model.init();
    return {

    }
})();