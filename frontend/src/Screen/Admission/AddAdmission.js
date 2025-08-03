import React from 'react'

function AddAdmission() {
  return (
    <div class="container">
    <h1>Admission Form</h1>
    <form>
      <div class="mb-3">
        <label for="fullName" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="fullName" name="fullName" placeholder="Enter your full name"/>
      </div>

      <div class="mb-3">
        <label for="dateOfBirth" class="form-label">Date of Birth</label>
        <input type="date" class="form-control" id="dateOfBirth" name="dateOfBirth"/>
      </div>

      <div class="mb-3">
        <label for="gender" class="form-label">Gender</label>
        <select class="form-select" id="gender" name="gender">
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="nationality" class="form-label">Nationality</label>
        <input type="text" class="form-control" id="nationality" name="nationality" placeholder="Enter your nationality"/>
      </div>

      <div class="mb-3">
        <label for="contactInfo" class="form-label">Contact Information</label>
        <input type="text" class="form-control" id="contactInfo" name="contactInfo" placeholder="Enter your contact information"/>
      </div>

      <div class="mb-3">
        <label for="previousSchool" class="form-label">Previous School/College/University</label>
        <input type="text" class="form-control" id="previousSchool" name="previousSchool" placeholder="Enter the name of your previous institution"/>
      </div>

      <div class="mb-3">
        <label for="academicQualifications" class="form-label">Academic Qualifications</label>
        <input type="text" class="form-control" id="academicQualifications" name="academicQualifications" placeholder="Enter your academic qualifications"/>
      </div>

      <div class="mb-3">
        <label for="standardizedTestScores" class="form-label">Standardized Test Scores</label>
        <input type="text" class="form-control" id="standardizedTestScores" name="standardizedTestScores" placeholder="Enter your standardized test scores"/>
      </div>

      <div class="mb-3">
        <label for="programOfInterest" class="form-label">Program of Interest</label>
        <input type="text" class="form-control" id="programOfInterest" name="programOfInterest" placeholder="Enter the program you are interested in"/>
      </div>

      <div class="mb-3">
        <label for="intendedStart" class="form-label">Intended Start Date</label>
        <input type="date" class="form-control" id="intendedStart" name="intendedStart"/>
      </div>

      <div class="mb-3">
        <label for="major" class="form-label">Major/Concentration</label>
        <input type="text" class="form-control" id="major" name="major" placeholder="Enter your major or concentration (if applicable)"/>
      </div>

      <div class="mb-3">
        <label for="resume" class="form-label">Resume or CV</label>
        <input type="file" class="form-control" id="resume" name="resume"/>
      </div>

      <div class="mb-3">
        <label for="statementOfPurpose" class="form-label">Statement of Purpose</label>
        <textarea class="form-control" id="statementOfPurpose" name="statementOfPurpose" rows="4" placeholder="Write your statement of purpose"></textarea>
      </div>

      <div class="mb-3">
        <label for="recommendationLetters" class="form-label">Letters of Recommendation</label>
        <input type="file" class="form-control" id="recommendationLetters" name="recommendationLetters" multiple/>
      </div>

      <div class="mb-3">
        <label for="admissionEssay" class="form-label">Admission Essay or Writing Samples</label>
        <textarea class="form-control" id="admissionEssay" name="admissionEssay" rows="4" placeholder="Write your admission essay or provide writing samples"></textarea>
      </div>

      <div class="mb-3">
        <label for="portfolio" class="form-label">Portfolio (if applicable)</label>
        <input type="file" class="form-control" id="portfolio" name="portfolio" multiple/>
      </div>

      <div class="mb-3">
        <label for="languageProficiency" class="form-label">Language Proficiency Proof</label>
        <input type="file" class="form-control" id="languageProficiency" name="languageProficiency"/>
      </div>

      <div class="mb-3">
        <label for="financialSupport" class="form-label">Proof of Financial Support</label>
        <input type="file" class="form-control" id="financialSupport" name="financialSupport"/>
      </div>

      <div class="mb-3">
        <label for="extracurricularActivities" class="form-label">Extracurricular Activities</label>
        <textarea class="form-control" id="extracurricularActivities" name="extracurricularActivities" rows="4" placeholder="List your extracurricular activities"></textarea>
      </div>

      <div class="mb-3">
        <label for="workExperience" class="form-label">Work Experience</label>
        <textarea class="form-control" id="workExperience" name="workExperience" rows="4" placeholder="Provide details of your work experience (if applicable)"></textarea>
      </div>

      <div class="mb-3">
        <label for="volunteerService" class="form-label">Volunteer and Community Service</label>
        <textarea class="form-control" id="volunteerService" name="volunteerService" rows="4" placeholder="List your volunteer and community service activities"></textarea>
      </div>

      <div class="mb-3">
        <label for="references" class="form-label">References</label>
        <textarea class="form-control" id="references" name="references" rows="4" placeholder="Provide contact information for your references (teachers, employers, mentors)"></textarea>
      </div>

      <div class="mb-3">
        <label for="legalStatus" class="form-label">Legal and Citizenship Status</label>
        <input type="text" class="form-control" id="legalStatus" name="legalStatus" placeholder="Provide information on your legal and citizenship status"/>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
  )
}

export default AddAdmission