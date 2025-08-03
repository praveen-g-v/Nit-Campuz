//This is a Servive Page

var library=[

];

const librarian=[
    "li1812"

];

const users=[
    "st1812",
    "fa1812",
    "ad1812"

];

const getAllBooks=()=>{
    return library;
}
function getBooks(text){ /**
 * 
Need to check wheteher it is needed here or needed while writing the page in search bar
better to write in the search bar
 */
    // let newlib=library.filter((val)=>{
    //     if(val.title.contains(text)||val.author.contains(text)||val.publicationDate.contains(text)||val.publisher.contains(text)||val.isbn.contains(text)||val.edition.contains(text)||val)
    // })
}
const addNewBook=(title,author,publisher,publicationDate,isbn,edition,language,genre)=> {
    library=[...library,{
        title:title,
        author:author,
        publisher:publisher,
        publicationDate:publicationDate,
        isbn:isbn,
        edition:edition,
        language:language,
        genre:genre,
        availability:"Available"
    }]    
}

export {addNewBook,getAllBooks};







