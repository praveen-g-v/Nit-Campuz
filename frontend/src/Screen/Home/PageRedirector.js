
import AddNewBook from "../Library/LibraryManagement/AddNewBook";
import BookCatalogue from "../Library/LibraryManagement/BookCatalogue";
import PendingBooks from "../Library/LibraryManagement/PendingBooks";
import ManageBooks from '../Library/LibraryManagement/ManageBooks';
import Error from "../ErrorPage/Error";

const pages=[<Error/>,<ManageBooks/>,<AddNewBook/>,<PendingBooks/>,<BookCatalogue/>];
const pageNo=[109,];
const pageName=["error","ManageBooks","AddNewBook","PendingBooks","CheckBooks"];

export {pages,pageNo,pageName}