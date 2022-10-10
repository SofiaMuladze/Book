function getbooks(){
    //
    document.getElementById('output').innerHTML="";

    fetch("http://openlibrary.org/search.json?q="+document.getElementById("input").value)
    .then(a=>a.json())
    .then(response=>{
        // console.log(response);
        if (document.getElementById("input").value == ""){
            console.log("input vuoto")
            alert("Please enter something in the search field");
        }
        for(var i=0;i<40;i ++){
            // console.log(response.docs[i]);
            var bookTitle = "<div class='bookTitle'>"+"<h1>"+response.docs[i].title+"</div>";
            var authorName = "<div class='authorName'>"+"<h3>"+response.docs[i].author_name[0]+"</div>";

            let bookCoverImage = "<div class='coverPlace'>"+
                                    "<h1 class='titlePlace'>"+response.docs[i].title+"</h1>"+
                                    "<h6 class='authorPlace'>"+response.docs[i].author_name[0]+"</h6>"+
                                 "</div>";

            if (response.docs[i].cover_i != undefined){
                bookCoverImage = "<img src ='https://covers.openlibrary.org/b/id/"+response.docs[i].cover_i+ "-M.jpg'>";
            }

            var bookCover = "<div class='bookCover cover'>" +bookCoverImage+ "</div>";

            //link per la descrizione
            let linkDesc = "https://openlibrary.org/"+response.docs[i].key;
            var key = "<div class='linkBtn'>"+"<a class='bookLink' href = "+linkDesc+" target='_blank'>"+'Description'+"</a>"+"</div>";

            //output
            const datax = document.getElementById("output").innerHTML+= "<div class='okay'>"+bookCover+bookTitle+authorName+key;
        }
    });

}


//click sul button usando l'enter della tastiera
var inputButton = document.getElementById("input");
inputButton.addEventListener("keypress", function(event) {
    console.log(inputButton)
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchBtn").click();
    }
});




