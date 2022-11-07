const loader = document.querySelector("#loader");
//Funzione che mostra il loader
function displayLoading() {
    loader.classList.add("display");
}

// funzione che nasconde il loader
function hideLoading() {
    loader.classList.remove("display");
}

async function getbooks() {
    displayLoading();//mostra il loader
    document.getElementById('output').innerHTML = "";
    await fetch("https://openlibrary.org/search.json?q=" + document.getElementById("input").value)
        .then(a => a.json())
        .then(response => {
            //console.log(response);
            if (document.getElementById("input").value == "") {
                console.log("input vuoto")
                alert("Please enter something in the search field");
            }

            for (var i = 0; i < 20; i++) {
                // console.log(response.docs[i]);
                const author = response.docs[i].author_name;
                const title = response.docs[i].title;
                const cover = response.docs[i].cover_i;

                if (title === undefined) {
                    var bookTitle = "<div class='bookTitle'>" + "<h1>" + " " + "</div>";
                } else {
                    var bookTitle = "<div class='bookTitle'>" + "<h1>" + title + "</div>";
                }

                if (author === undefined) {
                  var authorName = "<div class='authorName'>" + "<h3>" + "Unknown" + "</div>";
                } else {
                    authorName = "<div class='authorName'>" + "<h3>" + author + "</div>";
                }

                let bookCoverImage = "<div class='coverPlace'>" +
                    "<h1 class='titlePlace'>" + title + "</h1>" +
                    "<h6 class='authorPlace'>" + author + "</h6>" +
                    "</div>";

                if (cover != undefined) {
                    bookCoverImage = "<img src ='https://covers.openlibrary.org/b/id/" + cover + "-M.jpg'>";
                }

                var bookCover = "<div class='bookCover cover'>" + bookCoverImage + "</div>";

                //link per la descrizione
                let linkDesc = "https://openlibrary.org/" + response.docs[i].key;
                var key = "<div class='linkBtn'>" + "<a class='bookLink' href = " + linkDesc + " target='_blank'>" + 'Description' + "</a>" + "</div>";

                //output
                const datax = document.getElementById("output").innerHTML += "<div class='books-container'>" + bookCover + bookTitle + authorName + key + "</div>";
            }
        })
        
        .catch(error => {
            console.log(error)
            document.getElementById("output").innerHTML += "<div class='errorMessage'>" + "<h1>"+ 'No books found' + "</h1>" + "</div>";
        })

        .finally(() => {
            document.getElementById('input').value = '';//Reset del campo di input 
            hideLoading();//Nasconde il loader
        });

}


//click sul button usando l'enter della tastiera
var inputButton = document.getElementById("input");
inputButton.addEventListener("keypress", function (event) {
    //console.log(inputButton)
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
});
