import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import profile from "../../assets/Logo/profile-default.png";
const UserProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const [userData, setUserData] = useState({});
  const setUserProfileData = async () => {
    let resp = await axiosPrivate.get("/manageusers/getUserProfile");
    console.log(resp);
    setUserData(resp.data);
  };
  useEffect(() => {
    setUserProfileData();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Profile</h3>
      <div class="card mb-3" styles="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-2">
            <img
              src={profile}
              class="img-fluid w-60 h-80"
              alt="Profile Photo"
            />
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <h4 class="card-title">{userData.name}</h4>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Unique ID</h6>
                <div class="card-title col-8 pr-0 m-0">{userData.uniqueId}</div>
              </div>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Registration ID</h6>
                <div class="card-title col-8 pr-0 m-0">{userData.regId}</div>
              </div>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Admission Year</h6>
                <div class="card-title col-8 pr-0 m-0">
                  {userData.admissionYear}
                </div>
              </div>
              {/* <h6 class="card-title">Student ID</h6>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p> */}
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title col-4 m-0">Academic Info</h5>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Degree</h6>
                <div class="card-title col-8 pr-0 m-0">{userData.degree}</div>
              </div>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Course</h6>
                <div class="card-title col-8 pr-0 m-0">{userData.course}</div>
              </div>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Class</h6>
                <div class="card-title col-8 pr-0 m-0">{userData.class}</div>
              </div>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Academic Year</h6>
                <div class="card-title col-8 pr-0 m-0">
                  {userData.academicYear}
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Personal Info</h5>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Date of Birth</h6>
                <div class="card-title col-8 pr-0 m-0">{userData.dob}</div>
              </div>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Mobile No</h6>
                <div class="card-title col-8 pr-0 m-0">{userData.phoneNo}</div>
              </div>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Communication Address</h6>
                <div class="card-title col-8 pr-0 m-0">
                  {userData.communicationAddress}
                </div>
              </div>
              <div class="row">
                <h6 class="card-title col-4 pr-0 m-0">Permananet Address</h6>
                <div class="card-title col-8 pr-0 m-0">
                  {userData.permanentAddress}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
