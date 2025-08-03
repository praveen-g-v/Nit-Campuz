import React from 'react'

function Timetable() {
  return (
    <div class="container mt-4">
    <h2>Your Class Schedule</h2>

    {/* <!-- Timetable Table --> */}
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Course</th>
                <th>Class Time</th>
                <th>Room</th>
                <th>Mark Attendance</th>
            </tr>
        </thead>
        <tbody>
            {/* <!-- Replace this with actual data --> */}
            <tr>
                <td>Course A</td>
                <td>Monday, 9:00 AM - 10:30 AM</td>
                <td>Room 101</td>
                <td>
                    <button class="btn btn-primary">Mark Attendance</button>
                </td>
            </tr>
            <tr>
                <td>Course B</td>
                <td>Wednesday, 11:00 AM - 12:30 PM</td>
                <td>Room 202</td>
                <td>
                    <button class="btn btn-primary">Mark Attendance</button>
                </td>
            </tr>
            {/* <!-- Add more rows for other classes --> */}
        </tbody>
    </table>
</div>
  )
}

export default Timetable