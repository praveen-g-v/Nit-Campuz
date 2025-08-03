import Login from "./LoginandRegistration/Login";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddNewBook from "./Library/LibraryManagement/AddNewBook";
import ManageBooks from "./Library/LibraryManagement/ManageBooks";
import BookCatalogue from "./Library/LibraryManagement/BookCatalogue";
import PendingBooks from "./Library/LibraryManagement/PendingBooks";
import Error from "./ErrorPage/Error";
import AddAdmission from "./Admission/AddAdmission";
import AddUsers from "./Administrator/AddUsers";
import RemoveUser from "./Administrator/RemoveUser";
import Timetable from "./Faculity/Timetable";
import Applyleave from "./ApplyLeave/Applyleave";
import DashBoard from "./Dashboard/DashBoard";
import ManageCourse from "./Administrator/ManageCourse";
import AddSubject from "./Administrator/AddSubject";
import RemoveSubjects from "./Administrator/RemoveSubject";
import CreateTimeTable from "./Administrator/CreateTimeTable";
import EditTimeTable from "./Administrator/EditTimeTable";
import AssignUserToCourse from "./Administrator/AssignUserToCourse";
import InternalExamSchedule from "./Faculity/InternalExamSchedule";
import EditInternalExamSchedule from "./Faculity/EditInternalExamSchedule";
import InternalExamEvaluation from "./Faculity/InternalExamEvaluation";
import SemesterExamSchedule from "./Faculity/semesterExamSchedule";
import EditSemesterExamSchedule from "./Faculity/EditSemesterExamSchedule";
import SemesterExamEvaluation from "./Faculity/SemesterExamEvaluate";
import SemesterAttendance from "./Faculity/SemesterAttendance";
import UserProfile from "./Profile/UserProfile";
import AcademicCalendar from "./AcademicCalendar/academiccalendar";
import StudentAttendance from "./StudentView/StudentAttendance";
import StudentSemesterExamTimetable from "./StudentView/StudentSemesterExamTimeTable";
import StudentInternalExamTimetable from "./StudentView/StudentInternalExamSchedule";
import StudentInternalExamResult from "./StudentView/StudentInternalExamResult";
import StudentSemesterExamResult from "./StudentView/StudentSemesterExamResult";
import AdminDashboard from "./Dashboard/AdminDashBoard";
import FacultyDashboard from "./Dashboard/FacultyDashboard";
import UserManagement from "./Administrator/UserManagement";
import CourseManagement from "./Administrator/CourseManagement";
import SubjectManagement from "./Administrator/SubjectManagement";
import SemesterExamManagement from "./Faculity/SemesterExamManagement";
import TimetableManagement from "./Faculity/TimetableManagement";
// import { useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
/**
 *
 * @returns This return the various routes /components to route to after login
 * Starting path of the route is /initial is Login
 */
/**
 * 
 * <ul class="dropdown-menu">
          <li><a class="dropdown-item"><Link to="/library/bookscatalogue">Check for Books </Link></a></li>
          <li><a class="dropdown-item"><Link to="/library/actionitem">My Pending Action</Link></a></li>
          // {/* <li><hr class="dropdown-divider"/></li> }
          <li><a class="dropdown-item"><Link to="/library/addbook">Add New Book</Link></a></li>
          <li><a class="dropdown-item"><Link to="/library/managebooks">Manage Books</Link></a></li>
        </ul>
 */

const Redirect = ({
  ScreenSize,
  updateUserBasicData,
  updateUserLog,
  userLog,
  userBasicData,
}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Login
              updateUserLog={updateUserLog}
              updateUserBasicData={updateUserBasicData}
              ScreenSize={ScreenSize}
            />
          }
        />

        <Route
          path="library"
          element={
            <Home
              userLog={userLog}
              userBasicData={userBasicData}
              setUserLog={updateUserLog}
              ScreenSize={ScreenSize}
            />
          }
        >
          <Route path="bookscatalogue" element={<BookCatalogue />} />
          <Route path="actionitem" element={<PendingBooks />} />
          <Route path="addbook" element={<AddNewBook />} />
          <Route path="managebooks" element={<ManageBooks />} />
          <Route path="*" element={<Error />} />
        </Route>
        {/* <Route
          path="admission"
          element={
            <Home
              userLog={userLog}
              userBasicData={userBasicData}
              setUserLog={updateUserLog}
              ScreenSize={ScreenSize}
            />
          }
        >
          <Route path="newadmission" element={<AddAdmission />} />
          <Route path="*" element={<Error />} />
        </Route> */}
        <Route
          path="admin"
          element={
            <Home
              userLog={userLog}
              userBasicData={userBasicData}
              setUserLog={updateUserLog}
              ScreenSize={ScreenSize}
            />
          }
        >
          <Route
            path="dashboard"
            element={
              <AdminDashboard userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="users"
            element={
              <UserManagement userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="subjects"
            element={
              <SubjectManagement
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="courses"
            element={
              <ManageCourse userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="exams"
            element={
              <SemesterExamManagement
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="timetables"
            element={
              <TimetableManagement
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="createuser"
            element={
              <AddUsers userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="academiccalendar"
            element={
              <AcademicCalendar
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="removeuser"
            element={
              <RemoveUser userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="managecourse"
            element={
              <ManageCourse userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="addsubject"
            element={
              <AddSubject userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="removesubject"
            element={
              <RemoveSubjects userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="createtimetable"
            element={
              <CreateTimeTable
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="edittimetable"
            element={
              <EditTimeTable userLog={userLog} userBasicData={userBasicData} />
            }
          />
          <Route
            path="assignuser"
            element={
              <AssignUserToCourse
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="createInternalSchedule"
            element={
              <InternalExamSchedule
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="createSemesterSchedule"
            element={
              <SemesterExamSchedule
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="viewInternalSchedule"
            element={
              <EditInternalExamSchedule
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="viewSemesterSchedule"
            element={
              <EditSemesterExamSchedule
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />

          <Route
            path="semesterExamEvaluate"
            element={
              <SemesterExamEvaluation
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="internalExamEvaluate"
            element={
              <InternalExamEvaluation
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route
            path="semesterAttendance"
            element={
              <SemesterAttendance
                userLog={userLog}
                userBasicData={userBasicData}
              />
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
        <Route
          path="faculty"
          element={
            <Home
              userLog={userLog}
              setUserLog={updateUserLog}
              userBasicData={userBasicData}
              ScreenSize={ScreenSize}
            />
          }
        >
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="timetable" element={<Timetable />} />
          <Route path="removeuser" element={<RemoveUser />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route
          path="student"
          element={
            <Home
              userLog={userLog}
              setUserLog={updateUserLog}
              userBasicData={userBasicData}
              ScreenSize={ScreenSize}
            />
          }
        >
          <Route path="" element={<DashBoard />} />
          <Route path="applyleave" element={<Applyleave />} />
          <Route path="attendance" element={<StudentAttendance />} />
          <Route
            path="semestertimetable"
            element={<StudentSemesterExamTimetable />}
          />
          <Route
            path="internaltimetable"
            element={<StudentInternalExamTimetable />}
          />
          <Route
            path="internalResult"
            element={<StudentInternalExamResult />}
          />
          <Route
            path="semesterResult"
            element={<StudentSemesterExamResult />}
          />
          {/* <Route path="removeuser" element={<RemoveUser />} /> */}
          <Route path="*" element={<Error />} />
        </Route>

        <Route
          path="/Home"
          element={
            <Home
              userLog={userLog}
              setUserLog={updateUserLog}
              userBasicData={userBasicData}
              ScreenSize={ScreenSize}
            />
          }
        >
          <Route path="" element={<DashBoard />} />
          {/* <Route path="loading" element={<useLo />} /> */}
          <Route path="user" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Redirect;
