import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Book = ({ element }) => {
  const axiosPrivate = useAxiosPrivate();
  const removeBook = async () => {
    try {
      const response = await axiosPrivate.delete(
        `http://localhost:5000/api/library/removebook`,
        {
          params: {
            id: element.id,
          },
        }
      );
      if (response.status == 200) {
        window.location.reload();
        alert(response.data.message);
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <tr>
      <td>{element.title}</td>
      <td>{element.author}</td>
      <td>{element.publisher}</td>
      <td>{element.publicationDate}</td>
      <td>{element.edition}</td>
      <td>{element.language}</td>
      <td>{element.availability}</td>
      {/* <td>
        <button
          type="button"
          onClick={(e) => {
            console.log(element.id);
          }}
          class="btn btn-warning"
        >
          Edit
        </button>
      </td> */}
      <td>
        <button
          type="button"
          onClick={(e) => {
            removeBook();
          }}
          class="btn btn-danger"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
function ManageBooks() {
  const [books, setBooks] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const getAllBooks = async () => {
    try {
      const response = await axiosPrivate.get(
        `http://localhost:5000/api/library/getAllBook`
      );
      if (response.status == 200) {
        setBooks(response.data);
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllBooks();
    // setBooks(getAllBooks());
    // console.log(getAllBooks());
  }, []);
  return (
    <div class="container" style={{ minHeight: 40 + "em" }}>
      <h1>Manage Book Catalog</h1>
      <div class="mb-3">
        <input
          class="form-control border-end-0 border rounded-pill"
          placeholder="Search by title, author, or ISBN"
          type="search"
          id="example-search-input"
        />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author(s)</th>
            <th>Publisher</th>
            <th>Publication Date</th>
            {/* <th>ISBN</th> */}
            <th>Edition</th>
            <th>Language</th>
            {/* <th>Genre/Category</th> */}
            <th>Availability</th>
            {/* <th>Edit</th> */}
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {books.map((element) => {
            console.log(element);
            return <Book element={element} />;
          })}
          {/* <!-- Replace this example data with your actual data -->
            <?php
                // Example array of books (you should retrieve this data from your database)
                $books = [
                    ["Title 1", "Author 1", "Publisher 1", "2022-01-15", "1234567890", "1st edition", "English", "Fiction"],
                    ["Title 2", "Author 2", "Publisher 2", "2021-05-20", "0987654321", "2nd edition", "Spanish", "Non-Fiction"],
                    // Add more books as needed
                ];

                // Loop through the array and display each book
                foreach ($books as $book) {
                    echo "<tr>";
                    foreach ($book as $detail) {
                        echo "<td>$detail</td>";
                    }
                    echo "</tr>";
                }
            ?> */}
        </tbody>
      </table>
    </div>
  );
}

export default ManageBooks;
