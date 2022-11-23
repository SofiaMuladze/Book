const loader = document.querySelector("#loader");
//Funzione che mostra il loader
function displayLoading() {
    loader.classList.add("display");
}

// funzione che nasconde il loader
function hideLoading() {
    loader.classList.remove("display");
}

async function getBooks(e) {
    e.preventDefault();
    window.location.href="#loader";
    displayLoading();//mostra il loader
    document.getElementById('output').innerHTML = "";
    await fetch(`https://openlibrary.org/search.json?q=${document.getElementById("input").value}`)
        .then(a => a.json())
        .then(response => {
            //console.log(response);
            if (document.getElementById("input").value == "") {
                console.log("input vuoto")
                alert("Please enter something in the search field");
            }

            for (var i = 0; i < 80; i++) {
                // console.log(response.docs[i]);
                const author = response.docs[i].author_name;
                const title = response.docs[i].title;
                const cover = response.docs[i].cover_i;

                if (title === undefined) {
                    let bookTitle = `<div class='bookTitle'><h1></div>)`;
                } else {
                    bookTitle = `<div class='bookTitle'><h1>${title}</div>`;
                }

                if (author === undefined) {
                  let authorName = `<div class='authorName'><h3>Unknown</div>`;
                } else {
                    authorName = `<div class='authorName'><h3>${author}</div>`;
                }

                let bookCoverImage = `<div class='coverPlace'><h1 class='titlePlace'>${title}</h1><h6 class='authorPlace'>${author}</h6></div>`;

                if (cover != undefined) {
                    bookCoverImage = `<img src ='https://covers.openlibrary.org/b/id/${cover}-M.jpg'>`;
                }

                let bookCover = `<div class='bookCover cover'>${bookCoverImage}</div>`;

                //link per la descrizione
                let linkDesc = `https://openlibrary.org/${response.docs[i].key}`;
                let key = `<div class='linkBtn'><a class='bookLink' target='_blank' href = ${linkDesc}>Description</a></div>`;

                //output
                const datax = document.getElementById("output").innerHTML += `<div class='books-container'>${bookCover}${bookTitle}${authorName}${key}</div>`;
            }
        })
        
        .catch(error => {
            console.log(error)
            document.getElementById("output").innerHTML += `<div class='errorMessage'><h1>No books found</h1></div>`;
        })

        .finally(() => {
            window.location.href="#output";
            document.getElementById('input').value = '';//Reset del campo di input 
            hideLoading();//Nasconde il loader
        });
}

