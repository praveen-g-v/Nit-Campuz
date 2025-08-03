import React, { useEffect, useState } from "react";
import nitLogo from "../../../assets/Logo/ngi logo.png";
import profile from "../../../assets/Logo/profile-default.png";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {
  FaUser,
  FaSignOutAlt,
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserCog,
  FaHome,
} from "react-icons/fa";

const Header = ({ userLog, setUserLog }) => {
  const axiosPrivate = useAxiosPrivate();
  const [name, setName] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [userRole, setUserRole] = useState("null");
  const [loading, setLoading] = useState(true);
  const signOut = async () => {
    try {
      const response = await axiosPrivate.get("/login/logout");
      if (response.status === 200) {
        setUserLog({});
        window.location.reload();
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const getName = async () => {
    try {
      const response = await axiosPrivate.get("/manageusers/getUserName", {
        params: { token: userLog.token },
      });
      if (response.status === 200) {
        setName(response.data.name);
      }
    } catch (err) {
      console.error("Error fetching user name:", err);
    }
  };

  const getUserRole = async () => {
    try {
      const response = await axiosPrivate.get("/manageusers/getUserRole", {
        params: { token: userLog.token },
      });
      if (response.status === 200) {
        console.log(response.data);
        setUserRole(response.data.userRole);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error fetching user name:", err);
    }
  };

  useEffect(() => {
    getName();
    getUserRole();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [userLog]);

  // Navigation items for different roles
  const studentNavItems = (
    <>
      <li className="nav-item">
        <Link to="/home" className="nav-link" aria-current="page">
          <FaHome className="me-1" /> Home
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="studentDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaUserGraduate className="me-1" /> Student
        </a>
        <ul className="dropdown-menu" aria-labelledby="studentDropdown">
          <li>
            <Link to="/student/attendance" className="dropdown-item">
              Attendance
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/student/semestertimetable" className="dropdown-item">
              Semester TimeTable
            </Link>
          </li>
          <li>
            <Link to="/student/internaltimetable" className="dropdown-item">
              Internal TimeTable
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/student/semesterResult" className="dropdown-item">
              Semester Result
            </Link>
          </li>
          <li>
            <Link to="/student/internalResult" className="dropdown-item">
              Internal Result
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item">
        <Link to="/library/bookscatalogue" className="nav-link">
          <FaBook className="me-1" /> Library
        </Link>
      </li>
    </>
  );

  const teacherNavItems = (
    <>
      <li className="nav-item">
        <Link to="/faculty/dashboard" className="nav-link" aria-current="page">
          <FaHome className="me-1" /> Home
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="teacherDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaChalkboardTeacher className="me-1" /> Teacher
        </a>
        <ul className="dropdown-menu" aria-labelledby="teacherDropdown">
          <li>
            <Link to="/faculty/dashboard" className="dropdown-item">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/faculty/attendance" className="dropdown-item">
              Attendance
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/faculty/exams" className="dropdown-item">
              Exam Management
            </Link>
          </li>
          <li>
            <Link to="/faculty/grades" className="dropdown-item">
              Grade Management
            </Link>
          </li>
        </ul>
      </li>
    </>
  );

  const adminNavItems = (
    <>
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link" aria-current="page">
          <FaHome className="me-1" /> Home
        </Link>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="adminDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaUserCog className="me-1" /> ADMIN
        </a>
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="adminDropdown"
        >
          <li>
            <Link to="/admin/users" className="dropdown-item">
              User Management
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/admin/courses" className="dropdown-item">
              Course Management
            </Link>
          </li>
          <li>
            <Link to="/admin/subjects" className="dropdown-item">
              Subject Management
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/admin/timetables" className="dropdown-item">
              Timetable Management
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link to="/admin/exams" className="dropdown-item">
              Exam Management
            </Link>
          </li>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="libraryDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FaBook className="me-1" /> Library
        </a>
        <ul className="dropdown-menu" aria-labelledby="libraryDropdown">
          <li>
            <Link to="/library/management" className="dropdown-item">
              Library Management
            </Link>
          </li>
        </ul>
      </li>
    </>
  );

  const getHomeRoute = () => {
    switch (userRole.toLowerCase()) {
      case "admin":
        return "/admin/dashboard";
      case "faculty":
        return "/faculty/dashboard";
      case "student":
        return "/home";
      default:
        return "/home";
    }
  };

  // Determine which nav items to show based on role
  const getNavItems = () => {
    if (loading) return null;

    switch (userRole.toLowerCase()) {
      case "admin":
        return adminNavItems;
      case "faculty":
        return teacherNavItems;
      case "student":
        return studentNavItems;
      default:
        return (
          <li className="nav-item">
            <Link to="/home" className="nav-link" aria-current="page">
              <FaHome className="me-1" /> Home
            </Link>
          </li>
        );
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${
        isScrolled
          ? "navbar-dark bg-primary shadow-sm"
          : "navbar-dark bg-primary"
      }`}
      aria-label="Main navigation"
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link
          to={getHomeRoute()}
          className="navbar-brand d-flex align-items-center"
        >
          <img
            src={nitLogo}
            alt="NIT Campuz Logo"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
          />
          <span className="d-none d-sm-inline">NIT Campuz</span>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Main Navigation */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">{getNavItems()}</ul>

          {/* User Profile Dropdown */}
          {!loading && (
            <div className="d-flex ms-auto">
              <div className="dropdown">
                <a
                  href="#"
                  className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                  id="userDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={profile}
                    alt="Profile"
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  <span className="d-none d-lg-inline">
                    {name || "User"} ({userRole})
                  </span>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow"
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      <FaUser className="me-2" /> Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={signOut}>
                      <FaSignOutAlt className="me-2" /> Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
