import React from "react";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

function AddNewBook() {
  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [isbn, setIsbn] = useState("");
  const [edition, setEdition] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const checkFeilds = () => {
    if (title.trim() === "" || title === undefined || title === null) {
      alert("Please fill title");
      return false;
    } else if (
      author.trim() === "" ||
      author === undefined ||
      author === null
    ) {
      alert("Please fill author");
      return false;
    } else if (
      publisher.trim() === "" ||
      publisher === undefined ||
      publisher === null
    ) {
      alert("Please fill publisher");
      return false;
    } else if (
      publicationDate === "" ||
      publicationDate === undefined ||
      publicationDate === null
    ) {
      alert("Please select Publication Date");
      return false;
    } else if (isbn.trim() === "" || isbn === undefined || isbn === null) {
      alert("Please fill isbn");
      return false;
    } else if (
      edition.trim() === "" ||
      edition === undefined ||
      edition === null
    ) {
      alert("Please fill edition");
      return false;
    } else if (
      language.trim() === "" ||
      language === undefined ||
      language === null
    ) {
      alert("Please select language");
      return false;
    } else if (genre.trim() === "" || genre === undefined || genre === null) {
      alert("Please select genre");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (checkFeilds()) {
      // addNewBook(title,author,publisher,publicationDate,isbn,edition,language,genre)
      try {
        let data = {
          title: title,
          author: author,
          publisher: publisher,
          publicationDate: publicationDate,
          isbn: isbn,
          edition: edition,
          language: language,
          genre: genre,
        };
        const response = await axiosPrivate.post(
          `http://localhost:5000/api/library/addBooks`,
          data
        );
        console.log(response);
        if (response.status === 200) {
          setTitle("");
          setAuthor("");
          setPublisher("");
          setPublicationDate("");
          setIsbn("");
          setEdition("");
          setLanguage("");
          setGenre("");
          alert(response.data.message);
        }
      } catch (err) {
        console.log(err);
        alert(err.message ? err.message : "Unknown Error Occurred");
      }
    } else {
      //write code for showing alerts
    }

    //setCollection([...collection,{title:title,authot:author,publisher:publisher,publicationDate:publicationDate,isbn:isbn,edition:edition,language:language}])
  };

  return (
    <div class="container mw-80" style={{ minHeight: 40 + "em" }}>
      <h1>Add Book</h1>
      <form>
        <div class="mb-3">
          <label for="title" class="form-label">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            class="form-control"
            id="title"
            name="title"
            required
          />
          <div class="invalid-feedback">Please fill this feild</div>
        </div>
        <div class="mb-3">
          <label for="authors" class="form-label">
            Author(s)
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
            class="form-control"
            id="authors"
            name="authors"
            required
          />
          <div class="invalid-feedback">Please fill this feild</div>
        </div>
        <div class="mb-3">
          <label for="publisher" class="form-label">
            Publisher
          </label>
          <input
            type="text"
            value={publisher}
            onChange={(e) => {
              setPublisher(e.target.value);
            }}
            class="form-control"
            id="publisher"
            name="publisher"
            required
          />
          <div class="invalid-feedback">Please fill this feild</div>
        </div>
        <div class="mb-3">
          <label for="publicationDate" class="form-label">
            Publication Date
          </label>
          <input
            type="date"
            value={publicationDate}
            onChange={(e) => {
              setPublicationDate(e.target.value);
            }}
            class="form-control"
            id="publicationDate"
            name="publicationDate"
          />
          <div class="invalid-feedback">Please fill this feild</div>
        </div>
        <div class="mb-3">
          <label for="isbn" class="form-label">
            ISBN
          </label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => {
              setIsbn(e.target.value);
            }}
            class="form-control"
            id="isbn"
            name="isbn"
            required
          />
          <div class="invalid-feedback">Please fill this feild</div>
        </div>
        <div class="mb-3">
          <label for="edition" class="form-label">
            Edition
          </label>
          <input
            type="text"
            value={edition}
            onChange={(e) => {
              setEdition(e.target.value);
            }}
            class="form-control"
            id="edition"
            name="edition"
          />
          <div class="invalid-feedback">Please fill this feild</div>
        </div>
        <div class="mb-3">
          <label for="language" class="form-label">
            Language
          </label>
          <div class="invalid-feedback">Please fill this feild</div>
          <select
            class="form-select"
            onChange={(e) => {
              setLanguage(e.target.value);
            }}
            value={language}
            id="language"
            name="language"
          >
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="genre" class="form-label">
            Genre/Category
          </label>
          <div class="invalid-feedback">Please fill this feild</div>
          <select
            class="form-select"
            onChange={(e) => {
              setGenre(e.target.value);
            }}
            id="genre"
            name="genre"
            value={genre}
          >
            <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
          </select>
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          class="btn btn-primary"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddNewBook;
