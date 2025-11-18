// Basic interactivity: nav toggle, smooth scroll, contact form handling, dynamic year
// AI Resume Analyzer functionality

document.addEventListener('DOMContentLoaded', () => {
  // NAV TOGGLE
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-link').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav
        if (nav.classList.contains('open')) nav.classList.remove('open');
      }
    });
  });

  // Contact form basic validation (client-side)
  const form = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = 'Please fill all fields.';
      formMsg.style.color = 'tomato';
      return;
    }
    // email simple check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      formMsg.textContent = 'Please enter a valid email.';
      formMsg.style.color = 'tomato';
      return;
    }

    // Simulate sending (replace with real API)
    formMsg.textContent = 'Sending…';
    formMsg.style.color = '#fff';
    setTimeout(() => {
      form.reset();
      formMsg.textContent = 'Message sent — we will contact you soon!';
      formMsg.style.color = '#8ad19a';
    }, 900);
  });

  // fill year
  document.getElementById('year').textContent = new Date().getFullYear();

  // ===== AI RESUME ANALYZER FUNCTIONALITY =====
  
  const fileInput = document.getElementById('fileInput');
  const uploadArea = document.getElementById('uploadArea');
  const uploadPlaceholder = document.getElementById('uploadPlaceholder');
  const uploadSuccess = document.getElementById('uploadSuccess');
  const uploadFileName = document.getElementById('uploadFileName');
  const uploadFileSize = document.getElementById('uploadFileSize');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultSection = document.getElementById('resultSection');
  const analyzeAnotherBtn = document.getElementById('analyzeAnotherBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // Pre-populate with example file (matching the image)
  let uploadedFile = { name: 'Sumit_resume.pdf', size: 0.10 * 1024 * 1024 };

  // File upload handling
  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  // Drag and drop
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(255,255,255,0.2)';
    uploadArea.style.background = 'rgba(255,255,255,0.03)';
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = 'rgba(255,255,255,0.06)';
    uploadArea.style.background = 'rgba(255,255,255,0.01)';
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = 'rgba(255,255,255,0.06)';
    uploadArea.style.background = 'rgba(255,255,255,0.01)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  });

  function handleFileSelect(file) {
    // Validate file type
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB.');
      return;
    }

    uploadedFile = file;
    
    // Show success state
    uploadPlaceholder.style.display = 'none';
    uploadSuccess.style.display = 'flex';
    uploadFileName.textContent = file.name;
    uploadFileSize.textContent = `Size: ${(file.size / 1024 / 1024).toFixed(2)} MB`;
  }

  // Analyze button functionality
  analyzeBtn.addEventListener('click', () => {
    // Check if a real file was uploaded (File object) or just the example
    const hasRealFile = uploadedFile instanceof File;
    if (!uploadedFile && !hasRealFile) {
      alert('Please upload a resume file first.');
      return;
    }

    const jobDescription = document.getElementById('jobDescription').value.trim();
    if (!jobDescription) {
      alert('Please enter a job description.');
      return;
    }

    // Show loading state
    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Analyzing...</span>';

    // Simulate analysis (replace with actual API call)
    setTimeout(() => {
      // Generate random scores for demo (you can replace with actual analysis results)
      const overallScore = Math.floor(Math.random() * 20) + 80; // 80-100
      const skillsScore = Math.floor(Math.random() * 20) + 60; // 60-80
      const expScore = Math.floor(Math.random() * 20) + 55; // 55-75
      const eduScore = Math.floor(Math.random() * 20) + 75; // 75-95

      // Update scores
      document.getElementById('overallScore').innerHTML = `${overallScore}<span class="pct">%</span>`;
      document.getElementById('overallScoreBar').style.width = `${overallScore}%`;
      document.getElementById('skillsScore').textContent = `${skillsScore}%`;
      document.getElementById('skillsBar').style.width = `${skillsScore}%`;
      document.getElementById('expScore').textContent = `${expScore}%`;
      document.getElementById('expBar').style.width = `${expScore}%`;
      document.getElementById('eduScore').textContent = `${eduScore}%`;
      document.getElementById('eduBar').style.width = `${eduScore}%`;

      // Show result section with animation
      resultSection.style.display = 'flex';
      resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset button
      analyzeBtn.disabled = false;
      analyzeBtn.innerHTML = '<span class="btn-icon">⚙️</span><span>Analyze Resume</span>';

      // Animate progress bars
      setTimeout(() => {
        document.getElementById('overallScoreBar').style.width = `${overallScore}%`;
        document.getElementById('skillsBar').style.width = `${skillsScore}%`;
        document.getElementById('expBar').style.width = `${expScore}%`;
        document.getElementById('eduBar').style.width = `${eduScore}%`;
      }, 100);
    }, 1500);
  });

  // Analyze Another button
  analyzeAnotherBtn.addEventListener('click', () => {
    // Reset file upload
    uploadedFile = null;
    fileInput.value = '';
    uploadPlaceholder.style.display = 'flex';
    uploadSuccess.style.display = 'none';
    
    // Hide results
    resultSection.style.display = 'none';
    
    // Scroll to top of analyzer
    document.querySelector('.analyzer-container').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Download Report button
  downloadBtn.addEventListener('click', () => {
    // Create a simple text report
    const overallScore = document.getElementById('overallScore').textContent.replace('%', '');
    const skillsScore = document.getElementById('skillsScore').textContent;
    const expScore = document.getElementById('expScore').textContent;
    const eduScore = document.getElementById('eduScore').textContent;
    
    const report = `AI Resume Analysis Report
=======================

Overall Match Score: ${overallScore}%

Detailed Breakdown:
- Skills Match: ${skillsScore}
- Experience Match: ${expScore}
- Education Match: ${eduScore}

Matched Skills: JavaScript, React, Git
Skills to Develop: HTML, CSS

Recommendations:
- Consider developing skills in: HTML, CSS
- Excellent candidate for technical interview
- Consider for senior-level position based on skill match

Generated on: ${new Date().toLocaleString()}
`;

    // Create and download file
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume-analysis-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
});
