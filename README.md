<h1 align="center">LoanEase AI Platform</h1>

<p align="center">
  A seamless AI-driven loan application platform with step-by-step guidance and identity verification.
</p>

---

## 🚀 Overview
<p>LoanEase AI simplifies the loan application process using AI-powered features. Users can securely submit personal details, verify their identity, and check their loan eligibility with ease.</p>

---

## 🌟 Features
<ul>
  <li><strong>Step-by-Step Process:</strong> Guides users through key steps including personal details, document submission, and eligibility check.</li>
  <li><strong>Face Verification:</strong> AI-driven identity verification ensures security and trust.</li>
  <li><strong>Loan Eligibility Check:</strong> Displays loan details such as:
    <ul>
      <li>Loan Amount</li>
      <li>Interest Rate</li>
      <li>Loan Term</li>
      <li>Monthly Payment</li>
    </ul>
  </li>
  <li><strong>Interactive Loan Officer:</strong> Communicate with a virtual assistant for support.</li>
  <li><strong>Secure & Transparent:</strong> Ensures data privacy and user security.</li>
</ul>

---

## 🔗 Workflow
<ol>
  <li><strong>Welcome:</strong> Introduction to the loan process.</li>
  <li><strong>Personal Info:</strong> Collects basic details (name, contact, etc.).</li>
  <li><strong>Document Upload:</strong> Upload necessary documents securely.</li>
  <li><strong>Loan Details:</strong> Specify loan amount and duration.</li>
  <li><strong>Face Verification:</strong> AI-based identity verification.</li>
  <li><strong>Eligibility Check:</strong> Displays loan approval status with terms.</li>
</ol>

---

## 📸 Screenshots

<h3>1️⃣ Loan Approval Module</h3>
<p>✔️ Displays pre-approved loan details.</p>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1uGpcSaJsiOHKm6bbLlAQyYjWFSGv_CFK" width="700px">
</p>

<h3>2️⃣ Loan Details Module</h3>
<p>✔️ Displays loan amount, interest rate, and payment breakdown.</p>
<p align="center">
  <img src="https://drive.google.com/uc?export=view&id=1zJctPLOdDXY3WxcNuVfKKb-t4mtJkjJx" width="700px">
</p>

---

## 🎥 Demo Video
<p align="center">
  <a href="https://drive.google.com/file/d/1Z43DheHovO6oUlue-6T2ggivtq_5Vz0h/view?usp=sharing](https://drive.google.com/file/d/1mv60k77Q3Cwn0fZhakfkh3nxFBmLUZhu/view?usp=sharing">
    <img src="https://img.shields.io/badge/Watch%20Demo-Click%20Here-blue?style=for-the-badge&logo=youtube">
  </a>
</p>

---

## 💻 Technologies Used
<ul>
  <li><strong>Frontend:</strong> React.js</li>
  <li><strong>Backend:</strong> Python Flask API</li>
  <li><strong>AI Features:</strong> TensorFlow.js for face verification</li>
  <li><strong>Hosting:</strong> Vercel</li>
</ul>

---

## ⚡ Backend: Python Flask API
<p>The backend of LoanEase AI is built using Flask to handle loan processing, user authentication, and eligibility checks.</p>

### 🔧 API Endpoints
```plaintext
POST   /api/loan-apply       # Submits loan application details
GET    /api/loan-status      # Fetches current loan status
POST   /api/face-verify      # Verifies user identity via AI-based facial recognition
