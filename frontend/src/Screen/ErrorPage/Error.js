import React from 'react'

function Error() {
  return (
    <div class="container text-center">
        <div class="jumbotron mt-5">
            <h1 class="display-4">Oops, an error occurred!</h1>
            <p class="lead">The page you are looking for could not be found.</p>
            <hr class="my-4"/>
            <p>Please try again later or go back to the <a href="#">homepage</a>.</p>
        </div>
    </div>
  )
}

export default Error