import React from 'react'

function PendingBooks() {
  return (
    
  
    <div class="container" style={{minHeight:40+"em"}}>
        <h1>Pending Books</h1>
        <div class="mb-3">
        <input class="form-control border-end-0 border rounded-pill" placeholder="Search by title, author, or ISBN" type="search"  id="example-search-input"/>
                
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author(s)</th>
                    <th>Publisher</th>
                    <th>Due Date</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
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
  )
}

export default PendingBooks