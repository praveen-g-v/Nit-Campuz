import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AcademicCalendar = () => {
  // State for academic year, selected date, holiday info, and academic info
  const [academicYear, setAcademicYear] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [holidayInfo, setHolidayInfo] = useState("");
  const [academicInfo, setAcademicInfo] = useState("");

  // Handler for date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Handler for saving holiday info
  const handleSaveHolidayInfo = () => {
    // You can save holiday info using the selected date and holiday info
    console.log("Date:", selectedDate);
    console.log("Holiday Info:", holidayInfo);
    // Reset holiday info after saving
    setHolidayInfo("");
  };

  // Handler for saving academic info
  const handleSaveAcademicInfo = () => {
    // You can save academic info using the selected date and academic info
    console.log("Date:", selectedDate);
    console.log("Academic Info:", academicInfo);
    // Reset academic info after saving
    setAcademicInfo("");
  };

  // Render function
  return (
    <div className="container">
      <h1>Academic Calendar</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="academicYear">Academic Year:</label>
            <input
              type="text"
              className="form-control"
              id="academicYear"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="datepicker">Select Date:</label>
            <DatePicker
              id="datepicker"
              selected={selectedDate}
              onChange={handleDateChange}
              className="form-control"
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="form-group">
            <label htmlFor="holidayInfo">Holiday Info:</label>
            <input
              type="text"
              className="form-control"
              id="holidayInfo"
              value={holidayInfo}
              onChange={(e) => setHolidayInfo(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSaveHolidayInfo}>
            Save Holiday Info
          </button>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="academicInfo">Academic Info:</label>
            <input
              type="text"
              className="form-control"
              id="academicInfo"
              value={academicInfo}
              onChange={(e) => setAcademicInfo(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSaveAcademicInfo}>
            Save Academic Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
