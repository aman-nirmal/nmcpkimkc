/**
 * MathWorks Certificate Studio Application Logic
 * Professional Version: Zero Emojis, Plus Jakarta Sans, 100% Mobile Friendly
 */

// Official 12 Certificates Data
const CERTIFICATES_DATA = [
  {
    id: 1,
    title: 'Programming in MATLAB',
    type: 'path',
    badgeText: 'Learning Path',
    duration: '3 courses',
    courses: [
      'MATLAB Desktop Tools and Troubleshooting Scripts',
      'Programming Constructs',
      'The How and Why of Writing Functions'
    ],
    defaultDate: '2026-08-08'
  },
  {
    id: 2,
    title: 'Debugging and Error Handling',
    type: 'course',
    badgeText: '1 hour',
    duration: '1 hour',
    defaultDate: '2026-10-26'
  },
  {
    id: 3,
    title: 'Solving Nonlinear Equations with MATLAB',
    type: 'course',
    badgeText: '3 hours',
    duration: '3 hours',
    defaultDate: '2026-10-26'
  },
  {
    id: 4,
    title: 'Introduction to Linear Algebra with MATLAB',
    type: 'course',
    badgeText: '3 hours',
    duration: '3 hours',
    defaultDate: '2026-10-26'
  },
  {
    id: 5,
    title: 'Curve Fitting Onramp',
    type: 'course',
    badgeText: '1 hour',
    duration: '1 hour',
    defaultDate: '2026-10-26'
  },
  {
    id: 6,
    title: 'Solve Systems of First-Order ODEs',
    type: 'course',
    badgeText: '1 hour',
    duration: '1 hour',
    defaultDate: '2026-10-26'
  },
  {
    id: 7,
    title: 'Calculations with Vectors and Matrices',
    type: 'course',
    badgeText: '1 hour',
    duration: '1 hour',
    defaultDate: '2026-10-26'
  },
  {
    id: 8,
    title: 'Simulink Onramp',
    type: 'course',
    badgeText: '2 hours',
    duration: '2 hours',
    defaultDate: '2026-10-26'
  },
  {
    id: 9,
    title: 'Core MATLAB Skills',
    type: 'path',
    badgeText: 'Learning Path',
    duration: '4 courses',
    courses: [
      'MATLAB Desktop Tools and Troubleshooting Scripts',
      'Explore Data with MATLAB Plots',
      'Make and Manipulate Matrices',
      'Calculations with Vectors and Matrices'
    ],
    defaultDate: '2026-10-26'
  },
  {
    id: 10,
    title: 'Introduction to Solving Ordinary Differential Equations',
    type: 'course',
    badgeText: '1 hour',
    duration: '1 hour',
    defaultDate: '2026-10-26'
  },
  {
    id: 11,
    title: 'Simulink Fundamentals',
    type: 'course',
    badgeText: '8 hours',
    duration: '8 hours',
    defaultDate: '2026-10-26'
  },
  {
    id: 12,
    title: 'Organize Your Functions',
    type: 'course',
    badgeText: '1 hour',
    duration: '1 hour',
    defaultDate: '2026-10-26'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentMode = 'course'; // 'course' | 'path'
  let activeCertId = 5; // Default: Curve Fitting Onramp

  // DOM Elements - Shell & Tabs
  const appLayout = document.getElementById('appLayout');
  const btnMobileEdit = document.getElementById('btnMobileEdit');
  const btnMobilePreview = document.getElementById('btnMobilePreview');

  const tabModeCourse = document.getElementById('tabModeCourse');
  const tabModePath = document.getElementById('tabModePath');
  const sectionCourseFields = document.getElementById('sectionCourseFields');
  const sectionPathFields = document.getElementById('sectionPathFields');
  const certCourseContainer = document.getElementById('certCourseContainer');
  const certPathContainer = document.getElementById('certPathContainer');
  const certificateElem = document.getElementById('certificate');
  const previewModeLabel = document.getElementById('previewModeLabel');
  const presetDropdown = document.getElementById('certPresetDropdown');
  const presetCardsContainer = document.getElementById('presetCardsContainer');

  // Inputs
  const inputName = document.getElementById('inputName');
  const inputDate = document.getElementById('inputDate');
  const btnToday = document.getElementById('btnToday');
  const inputCourse = document.getElementById('inputCourse');
  const inputDuration = document.getElementById('inputDuration');
  const inputPercent = document.getElementById('inputPercent');
  const inputPathTitle = document.getElementById('inputPathTitle');
  const inputPathCourses = document.getElementById('inputPathCourses');

  // Certificate Displays
  const recipientNameElements = document.querySelectorAll('.certRecipientName');
  const dateElements = document.querySelectorAll('.certDateText');
  const headerImages = document.querySelectorAll('.certHeaderImg');
  const signatureImages = document.querySelectorAll('.certSignImg');
  const backgroundDiv = document.querySelector('.backgroundDiv');

  const certCourse = document.getElementById('certCourse');
  const certDuration = document.getElementById('certDuration');
  const certPercent = document.getElementById('certPercent');
  const certPathTitle = document.getElementById('certPathTitle');
  const certPathCol1 = document.getElementById('certPathCol1');
  const certPathCol2 = document.getElementById('certPathCol2');

  // Action Buttons
  const btnDownloadPdf = document.getElementById('btnDownloadPdf');
  const btnDownloadPng = document.getElementById('btnDownloadPng');
  const btnPrint = document.getElementById('btnPrint');
  const scaleContainer = document.getElementById('scaleContainer');
  const previewViewport = document.getElementById('previewViewport');

  // Zoom Controls
  const btnZoomFit = document.getElementById('btnZoomFit');
  const btnZoom50 = document.getElementById('btnZoom50');
  const btnZoom75 = document.getElementById('btnZoom75');
  const btnZoom100 = document.getElementById('btnZoom100');

  // Mobile View Switcher
  if (btnMobileEdit && btnMobilePreview) {
    btnMobileEdit.addEventListener('click', () => {
      btnMobileEdit.classList.add('active');
      btnMobilePreview.classList.remove('active');
      appLayout.classList.remove('mobile-show-preview');
    });

    btnMobilePreview.addEventListener('click', () => {
      btnMobilePreview.classList.add('active');
      btnMobileEdit.classList.remove('active');
      appLayout.classList.add('mobile-show-preview');
      setTimeout(() => applyZoom('fit'), 60);
    });
  }

  // Initialize embedded assets
  if (typeof CERT_ASSETS !== 'undefined') {
    if (CERT_ASSETS.watermarkBase) {
      backgroundDiv.style.backgroundImage = `url("${CERT_ASSETS.watermarkBase}")`;
    }
    if (CERT_ASSETS.headerLogo) {
      headerImages.forEach(img => img.src = CERT_ASSETS.headerLogo);
    }
    if (CERT_ASSETS.signature) {
      signatureImages.forEach(img => img.src = CERT_ASSETS.signature);
    }
  }

  // Populate 12 Preset Cards in Sidebar
  function renderPresetCards() {
    presetCardsContainer.innerHTML = '';
    CERTIFICATES_DATA.forEach(cert => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `preset-card-item ${cert.id === activeCertId ? 'active' : ''}`;
      card.dataset.id = cert.id;

      card.innerHTML = `
        <div class="preset-item-left">
          <span class="preset-index">${cert.id}</span>
          <span class="preset-item-title" title="${cert.title}">${cert.title}</span>
        </div>
        <span class="preset-item-tag ${cert.type}">${cert.badgeText}</span>
      `;

      card.addEventListener('click', () => {
        selectCertificate(cert.id);
      });

      presetCardsContainer.appendChild(card);
    });
  }

  // Format Date to "26 October 2026" or "8 August 2026"
  function formatDate(val) {
    if (!val) return '';
    if (/^\d{1,2}\s+[A-Za-z]+\s+\d{4}$/.test(val.trim())) {
      return val.trim();
    }
    const parts = val.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) {
        const monthNames = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return `${day} ${monthNames[month]} ${year}`;
      }
    }
    const parsed = new Date(val);
    if (!isNaN(parsed.getTime())) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      return `${parsed.getDate()} ${monthNames[parsed.getMonth()]} ${parsed.getFullYear()}`;
    }
    return val;
  }

  // Set Mode (Course vs Path)
  function setMode(mode) {
    currentMode = mode;
    if (mode === 'course') {
      tabModeCourse.classList.add('active');
      tabModePath.classList.remove('active');
      sectionCourseFields.style.display = 'block';
      sectionPathFields.style.display = 'none';

      certCourseContainer.style.display = 'block';
      certPathContainer.style.display = 'none';

      certificateElem.classList.remove('mode-path');
      certificateElem.classList.add('mode-course');
      previewModeLabel.textContent = 'Single Course';
    } else {
      tabModePath.classList.add('active');
      tabModeCourse.classList.remove('active');
      sectionCourseFields.style.display = 'none';
      sectionPathFields.style.display = 'block';

      certCourseContainer.style.display = 'none';
      certPathContainer.style.display = 'block';

      certificateElem.classList.remove('mode-course');
      certificateElem.classList.add('mode-path');
      previewModeLabel.textContent = 'Learning Path';
    }
    updateCertificate();
    applyZoom(currentZoom);
  }

  tabModeCourse.addEventListener('click', () => setMode('course'));
  tabModePath.addEventListener('click', () => setMode('path'));

  // Select one of the 12 Certificates
  function selectCertificate(certId) {
    const cert = CERTIFICATES_DATA.find(c => c.id === parseInt(certId, 10));
    if (!cert) return;

    activeCertId = cert.id;

    // Update active state in cards
    document.querySelectorAll('.preset-card-item').forEach(card => {
      card.classList.toggle('active', parseInt(card.dataset.id, 10) === cert.id);
    });

    // Update dropdown value
    if (presetDropdown.value !== String(cert.id)) {
      presetDropdown.value = String(cert.id);
    }

    if (cert.type === 'path') {
      setMode('path');
      inputPathTitle.value = cert.title;
      inputPathCourses.value = cert.courses.join('\n');
      if (cert.defaultDate) inputDate.value = cert.defaultDate;
    } else {
      setMode('course');
      inputCourse.value = cert.title;
      inputDuration.value = cert.duration;
      inputPercent.value = '100%';
      if (cert.defaultDate) inputDate.value = cert.defaultDate;
    }

    updateCertificate();
  }

  presetDropdown.addEventListener('change', (e) => {
    selectCertificate(e.target.value);
  });

  // Update Certificate Content in Live Preview
  function updateCertificate() {
    const nameVal = inputName.value.trim() || 'Your Name';
    recipientNameElements.forEach(el => el.textContent = nameVal);

    const formattedDate = formatDate(inputDate.value) || '26 October 2026';
    dateElements.forEach(el => {
      el.innerHTML = `<span>${formattedDate}</span>`;
    });

    if (currentMode === 'course') {
      certCourse.textContent = inputCourse.value.trim() || 'Curve Fitting Onramp';
      
      const duration = inputDuration.value.trim() || '1 hour';
      certDuration.textContent = duration.toLowerCase().startsWith('course length:')
        ? duration
        : `Course Length: ${duration}`;

      const pct = inputPercent.value.trim() || '100';
      certPercent.textContent = pct.endsWith('%') ? pct + ' ' : pct + '% ';
    } else {
      certPathTitle.textContent = inputPathTitle.value.trim() || 'Programming in MATLAB';

      const rawLines = inputPathCourses.value
        .split('\n')
        .map(l => l.trim())
        .filter(l => l.length > 0);

      const courses = rawLines.length > 0 ? rawLines : [
        'MATLAB Desktop Tools and Troubleshooting Scripts',
        'Programming Constructs',
        'The How and Why of Writing Functions'
      ];

      certPathCol1.innerHTML = '';
      certPathCol2.innerHTML = '';

      if (courses.length <= 4) {
        courses.forEach(c => {
          const li = document.createElement('li');
          li.innerHTML = `${c} &nbsp;&nbsp; `;
          certPathCol1.appendChild(li);
        });
      } else {
        const mid = Math.ceil(courses.length / 2);
        courses.slice(0, mid).forEach(c => {
          const li = document.createElement('li');
          li.innerHTML = `${c} &nbsp;&nbsp; `;
          certPathCol1.appendChild(li);
        });
        courses.slice(mid).forEach(c => {
          const li = document.createElement('li');
          li.innerHTML = `${c} &nbsp;&nbsp; `;
          certPathCol2.appendChild(li);
        });
      }
    }
  }

  // Attach Input Listeners
  [inputName, inputCourse, inputDuration, inputPercent, inputPathTitle, inputPathCourses, inputDate].forEach(input => {
    if (input) {
      input.addEventListener('input', updateCertificate);
      input.addEventListener('change', updateCertificate);
    }
  });

  // Duration Pills
  document.querySelectorAll('.duration-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      inputDuration.value = btn.dataset.duration;
      updateCertificate();
    });
  });

  // Today Date Button
  btnToday.addEventListener('click', () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    inputDate.value = `${yyyy}-${mm}-${dd}`;
    updateCertificate();
  });

  // Auto Scale to Viewport (Supports Mobile and Desktop)
  let currentZoom = 'fit';

  function applyZoom(zoom) {
    currentZoom = zoom;
    const certWidth = 1182;
    const certHeight = currentMode === 'course' ? 816 : 830;

    if (zoom === 'fit') {
      const padding = window.innerWidth <= 768 ? 24 : 50;
      const availWidth = previewViewport.clientWidth - padding;
      const availHeight = previewViewport.clientHeight - padding;
      const scaleX = availWidth / certWidth;
      const scaleY = availHeight / certHeight;
      const scale = Math.min(scaleX, scaleY, 1.0);
      scaleContainer.style.transform = `scale(${Math.max(scale, 0.22)})`;
    } else {
      const scaleVal = parseFloat(zoom) / 100;
      scaleContainer.style.transform = `scale(${scaleVal})`;
    }
  }

  window.addEventListener('resize', () => {
    if (currentZoom === 'fit') {
      applyZoom('fit');
    }
  });

  btnZoomFit.addEventListener('click', () => applyZoom('fit'));
  btnZoom50.addEventListener('click', () => applyZoom(50));
  btnZoom75.addEventListener('click', () => applyZoom(75));
  btnZoom100.addEventListener('click', () => applyZoom(100));

  // Toast Notification (Zero Emojis, Clean SVG)
  function showToast(message, duration = 3500) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <div>${message}</div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // PDF Export
  btnDownloadPdf.addEventListener('click', async () => {
    const originalText = btnDownloadPdf.innerHTML;
    btnDownloadPdf.disabled = true;
    btnDownloadPdf.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
      Generating High-Res PDF...
    `;

    try {
      const isPath = currentMode === 'path';
      const targetWidth = 1182;
      const targetHeight = isPath ? 830 : 816;

      const certElement = document.getElementById('certificate');
      
      const originalTransform = scaleContainer.style.transform;
      scaleContainer.style.transform = 'none';

      const canvas = await html2canvas(certElement, {
        scale: 2.5, // 300 DPI crisp print
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f5f5f5',
        width: targetWidth,
        height: targetHeight
      });

      scaleContainer.style.transform = originalTransform;

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [targetWidth, targetHeight]
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, targetWidth, targetHeight, undefined, 'FAST');

      const safeName = (inputName.value.trim() || 'Certificate').replace(/[^a-zA-Z0-9_-]/g, '_');
      const subject = isPath
        ? (inputPathTitle.value.trim() || 'Learning_Path')
        : (inputCourse.value.trim() || 'Course');
      const safeSubject = subject.replace(/[^a-zA-Z0-9_-]/g, '_');
      const suffix = isPath ? 'Learning_Path_Certificate.pdf' : 'Certificate.pdf';
      const fileName = `${safeName}_${safeSubject}_${suffix}`;

      pdf.save(fileName);
      showToast(`Downloaded: ${fileName}`);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Could not generate PDF: ' + err.message);
    } finally {
      btnDownloadPdf.disabled = false;
      btnDownloadPdf.innerHTML = originalText;
    }
  });

  // PNG Export
  btnDownloadPng.addEventListener('click', async () => {
    const originalText = btnDownloadPng.innerHTML;
    btnDownloadPng.disabled = true;
    btnDownloadPng.innerHTML = `Exporting PNG...`;

    try {
      const isPath = currentMode === 'path';
      const targetWidth = 1182;
      const targetHeight = isPath ? 830 : 816;

      const certElement = document.getElementById('certificate');
      const originalTransform = scaleContainer.style.transform;
      scaleContainer.style.transform = 'none';

      const canvas = await html2canvas(certElement, {
        scale: 2.5,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#f5f5f5',
        width: targetWidth,
        height: targetHeight
      });

      scaleContainer.style.transform = originalTransform;

      const safeName = (inputName.value.trim() || 'Certificate').replace(/[^a-zA-Z0-9_-]/g, '_');
      const subject = isPath
        ? (inputPathTitle.value.trim() || 'Learning_Path')
        : (inputCourse.value.trim() || 'Course');
      const safeSubject = subject.replace(/[^a-zA-Z0-9_-]/g, '_');
      const suffix = isPath ? 'Learning_Path_Certificate.png' : 'Certificate.png';
      const fileName = `${safeName}_${safeSubject}_${suffix}`;

      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast(`Saved PNG: ${fileName}`);
    } catch (err) {
      console.error('Error exporting PNG:', err);
      alert('Could not export PNG: ' + err.message);
    } finally {
      btnDownloadPng.disabled = false;
      btnDownloadPng.innerHTML = originalText;
    }
  });

  // Native Print
  btnPrint.addEventListener('click', () => {
    window.print();
  });

  // Initialize
  renderPresetCards();
  selectCertificate(5); // Start with Curve Fitting Onramp
  setTimeout(() => applyZoom('fit'), 100);
});
