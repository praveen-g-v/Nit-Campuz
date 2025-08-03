import React from 'react'
import styles from "./NavigationSideBar.module.css"

function NavigationSideBar() {
  return (
    <div className={styles.container}>
        <div className={styles.sub}>
            Home
        </div>
        <div className={styles.sub}>
            Time Table
        </div>
        <div className={styles.sub}>
            Attendance
        </div>
        <div className={styles.sub}>
            Result
        </div>
        <div className={styles.sub}>
            Apply for Leave
        </div>
        <div className={styles.sub}>
            Library
        </div>
        <div className={styles.sub}>
            Entertainment
        </div>
    </div>
  )
}

export default NavigationSideBar