import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AssignUserToCourse = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const currentYear = new Date().getFullYear();
  const [array, setArray] = useState([...Array(5)]);

  useEffect(() => {
    fetchUsers();
    fetchCourses();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosPrivate.get("users"); // Replace with your actual API endpoint for fetching users
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axiosPrivate.get("/courses/getAllCourse"); // Replace with your actual API endpoint for fetching courses
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  // const fetchAssignedCourses = async () => {
  //   try {
  //     const response = await axiosPrivate.get("/api/assignedCourses"); // Replace with your actual API endpoint for fetching assigned courses
  //     setAssignedCourses(response.data.assignedCourses);
  //   } catch (error) {
  //     console.error("Error fetching assigned courses", error);
  //   }
  // };

  const handleAssignment = async (course) => {
    //console.log(course.academic);
    if (
      course.academic === "" ||
      course.academic === null ||
      course.academic === undefined
    ) {
      alert("Please Choose the course");
    } else if (
      course.year === "" ||
      course.year === null ||
      course.year === undefined
    ) {
      alert("Please Choose the Year");
    } else {
      if (
        window.confirm(
          `Are you sure do you want to assign the course to ${course.name}`
        )
      ) {
        await axiosPrivate
          .post("/manageusers/assigncourse", course)
          .then((res) => {
            alert(res.data.message);
          })
          .catch((err) => {
            alert(err.message);
          });
      }
    }
  };

  // const handleModifyCourse = async (userId, courseId) => {
  //   if (userId && courseId) {
  //     try {
  //       // Send a request to your server to modify the course of the user
  //       await axiosPrivate.patch("/api/modifyCourse", {
  //         userId,
  //         courseId,
  //       });

  //       // Refresh the assigned courses after the modification
  //       // fetchAssignedCourses();

  //       // Handle success (you may want to show a success message or redirect)
  //       //console.log("Course modified for the user successfully");
  //     } catch (error) {
  //       console.error("Error modifying course for the user", error);
  //       // Handle error (you may want to show an error message)
  //     }
  //   } else {
  //     // Handle the case where either the user or course is not selected
  //     console.error("Please select both a user and a course for modification");
  //   }
  // };

  const searchUser = async () => {
    if (
      selectedRole === "" ||
      selectedRole === null ||
      selectedRole === undefined
    ) {
      alert("Please Choose the Role");
    } else {
      try {
        const response = await axiosPrivate.get(
          "/manageusers/getUnassignedUser",
          {
            params: {
              rolename: selectedRole,
            },
          }
        ); // Replace with your actual API endpoint for fetching users
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    }
  };

  const handleCourseChange = (course, index) => {
    let newuser = users;
    newuser[index].academic = course;
    //console.log(newuser);
    setUsers(newuser);
  };
  const handleYearChange = (year, index) => {
    let newuser = users;
    newuser[index].year = "" + year;
    //console.log(newuser);

    setUsers(newuser);
    setArray([...Array(5)]);
    //console.log(users);
    // setCourses(courses;
  };

  useEffect(() => {
    //console.log(users);
  }, [users]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">User and Assigned Courses</h1>
      <div className="row mb-3">
        <div className="col-md-4">
          <label htmlFor="roleSelect" className="form-label">
            Select Role:
          </label>
          <select
            id="roleSelect"
            className="form-select"
            onChange={(e) => setSelectedRole(e.target.value)}
            value={selectedRole}
          >
            <option value="">Select a Role</option>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
          </select>
        </div>
        <div className="col-mb-1">
          <button
            className="btn btn-primary me-2"
            onClick={() => searchUser(selectedRole)}
          >
            Search User
          </button>
        </div>
      </div>
      <div className="mb-3"></div>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Assigned Course</th>
            <th>Role</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((assignedCourse, _index) => (
            <tr key={assignedCourse.userId}>
              <td>{assignedCourse.regno}</td>
              <td>{assignedCourse.name}</td>
              <td>
                <select
                  id="courseSelect"
                  className="form-select"
                  onChange={(e) => handleCourseChange(e.target.value, _index)}
                  value={assignedCourse.className}
                >
                  <option value="">Select a Course</option>
                  {courses.map((course) => {
                    let q = course.id;
                    let r = assignedCourse.academic;
                    // console.log(q + "  " + r + "  " + (q == r));
                    if (q == r) {
                      //console.log("///////////////////////true");
                      return (
                        <option selected key={course.id} value={course.id}>
                          {course.courseName}
                        </option>
                      );
                    } else {
                      return (
                        <option key={course.id} value={course.id}>
                          {course.courseName}
                        </option>
                      );
                    }
                  })}
                </select>
              </td>
              <td>{assignedCourse.role}</td>
              <td>
                <select
                  className="form-select"
                  value={assignedCourse.year}
                  onChange={(e) => {
                    handleYearChange(e.target.value, _index);
                  }}
                >
                  <option value="">Select Year</option>
                  {array.map((year, index) => {
                    let yearvalue = "" + (currentYear + 4 - index);

                    if (yearvalue) {
                      return (
                        <option
                          selected
                          key={index}
                          value={currentYear + 4 - index}
                        >
                          {currentYear + 4 - index}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={currentYear + 4 - index}>
                          {currentYear + 4 - index}
                        </option>
                      );
                    }
                  })}
                  {array.map((year, index) => {
                    let yearvalue = "" + (currentYear - index);

                    if (currentYear - index === assignedCourse.year) {
                      return (
                        <option
                          selected
                          key={index}
                          value={currentYear - index}
                        >
                          {currentYear - index}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={currentYear - index}>
                          {currentYear - index}
                        </option>
                      );
                    }
                  })}
                </select>
                {/* {assignedCourse.year}
                <select
                  className="form-select"
                  value={assignedCourse.year}
                  onChange={(e) => {
                    handleYearChange(e.target.value, _index + 1);
                  }}
                >
                  <option value="">Select Year</option>
                  {[...Array(6)].map((year, index) => {
                    //console.log(assignedCourse.year);
                    if (currentYear + 5 - index === assignedCourse.year) {
                      return (
                        <option
                          selected
                          key={index}
                          value={currentYear + 4 - index}
                        >
                          {currentYear + 5 - index}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={currentYear + 4 - index}>
                          {currentYear + 5 - index}
                        </option>
                      );
                    }
                  })}
                  {[...Array(5)].map((year, index) => {
                    //console.log(assignedCourse.year);
                    if (currentYear - (index + 1) === assignedCourse.year) {
                      return (
                        <option
                          selected
                          key={index}
                          value={currentYear - (index + 1)}
                        >
                          {currentYear - (index + 1)}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={currentYear - (index + 1)}>
                          {currentYear - (index + 1)}
                        </option>
                      );
                    }
                  })}
                </select> */}
              </td>
              <td>
                {/* <button
                  className="btn btn-warning"
                  onClick={() =>
                    handleModifyCourse(
                      assignedCourse.userId,
                      assignedCourse.courseId
                    )
                  }
                >
                  Modify Course
                </button> */}
                <button
                  className="btn btn-primary me-2"
                  onClick={() => handleAssignment(assignedCourse)}
                >
                  Assign Course
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignUserToCourse;
