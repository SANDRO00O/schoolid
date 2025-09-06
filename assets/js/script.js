// IIFE لتجنب المتغيرات العامة وتحسين النطاق
(() => {
  // كائن التكوين المركزي
  const config = {
    gender: 'female',
    templatePaths: {
      female: '/assets/template/female-template.png',
      male: '/assets/template/male-template.png'
    },
    colors: {
      female: '#ba1971',
      male: '#1976d2'
    },
    canvasSettings: {
      userImage: {
        x: 125,
        y: 145,
        size: 270,
        radius: 35
      },
      textPositions: {
        name: { x: 815, y: 160 },
        grade: { x: 815, y: 260 },
        school: { x: 785, y: 363 },
        place: { x: 805, y: 465 },
        phone: { x: 805, y: 565 }
      }
    }
  };

  // عناصر DOM
  const elements = {
    genderButtons: document.querySelectorAll('[data-gender]'),
    nameInput: document.getElementById('name'),
    schoolInput: document.getElementById('school'),
    placeInput: document.getElementById('place'),
    gradeInput: document.getElementById('grade'),
    phoneInput: document.getElementById('phone'),
    imageInput: document.getElementById('image'),
    fileNameDisplay: document.getElementById('fileName'),
    canvas: document.getElementById('id-card-canvas'),
    downloadBtn: document.getElementById('download-btn'),
    shareBtn: document.getElementById('share-btn'),
    modal: document.getElementById('myModal')
  };

  // تهيئة التطبيق
  function init() {
    setupGenderSelection();
    setupEventListeners();
    initDefaultGender();
  }

  // إعداد تحديد الجنس
  function setupGenderSelection() {
    elements.genderButtons.forEach(button => {
      button.addEventListener('click', handleGenderSelection);
      button.setAttribute('role', 'button');
      button.setAttribute('aria-pressed', 'false');
    });
  }

  // معالج اختيار الجنس
  function handleGenderSelection(event) {
    const targetButton = event.currentTarget;
    config.gender = targetButton.dataset.gender;
    
    updateGenderButtonsUI(targetButton);
  }

  // تحديث واجهة أزرار الجنس
  function updateGenderButtonsUI(selectedButton) {
    elements.genderButtons.forEach(btn => {
      const isSelected = btn === selectedButton;
      btn.classList.toggle('selected', isSelected);
      btn.setAttribute('aria-pressed', isSelected.toString());
    });
  }

  // تهيئة الجنس الافتراضي
  function initDefaultGender() {
    const defaultButton = document.querySelector('[data-gender="female"]');
    if (defaultButton) {
      defaultButton.classList.add('selected');
      defaultButton.setAttribute('aria-pressed', 'true');
    }
  }

  // إعداد مستمعي الأحداث
  function setupEventListeners() {
    // تغيير صورة المستخدم
    elements.imageInput.addEventListener('change', handleImageUpload);
    
    // أحداث النموذج
    document.getElementById('generateForm').addEventListener('submit', (e) => {
      e.preventDefault();
      generateID();
    });
    
    // أحداث الأزرار
    elements.downloadBtn.addEventListener('click', downloadID);
    elements.shareBtn.addEventListener('click', shareID);
    
    // إغلاق المودال
    elements.modal.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
      if (event.target === elements.modal) {
        closeModal();
      }
    });
  }

  // معالج تحميل الصورة
  function handleImageUpload(event) {
    const file = event.target.files[0];
    elements.fileNameDisplay.textContent = file 
      ? `الصورة المختارة: ${file.name}` 
      : 'لا يوجد ملف مختار';
  }

  // إنشاء البطاقة التعريفية
  async function generateID() {
    if (!validateForm()) {
      showModal();
      return;
    }

    try {
      const [templateImg, userImg] = await Promise.all([
        loadImage(config.templatePaths[config.gender]),
        loadUserImage(elements.imageInput.files[0])
      ]);
      
      drawIDCard(templateImg, userImg);
      showActionButtons();
    } catch (error) {
      handleError(error);
    }
  }

  // تحميل الصورة
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`فشل تحميل الصورة: ${src}`));
    });
  }

  // تحميل صورة المستخدم
  function loadUserImage(file) {
    return new Promise((resolve, reject) => {
      if (!file) reject(new Error('لم يتم اختيار صورة'));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error('صورة غير صالحة'));
      };
      reader.readAsDataURL(file);
    });
  }

  // رسم البطاقة
  function drawIDCard(templateImg, userImg) {
    const ctx = elements.canvas.getContext('2d');
    
    // إعادة تعيين Canvas
    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
    
    // رسم القالب
    ctx.drawImage(templateImg, 0, 0, elements.canvas.width, elements.canvas.height);
    
    // رسم صورة المستخدم
    drawUserImage(ctx, userImg);
    
    // إضافة النصوص
    addTextElements(ctx);
  }

  // رسم صورة المستخدم
  function drawUserImage(ctx, userImg) {
    const { x, y, size, radius } = config.canvasSettings.userImage;
    
    ctx.save();
    createRoundRectPath(ctx, x, y, size, size, radius);
    ctx.clip();
    
    const scale = Math.max(size / userImg.width, size / userImg.height);
    const dx = x + (size - userImg.width * scale) / 2;
    const dy = y + (size - userImg.height * scale) / 2;
    
    ctx.drawImage(
      userImg,
      0, 0, userImg.width, userImg.height,
      dx, dy, userImg.width * scale, userImg.height * scale
    );
    
    ctx.restore();
  }

  // إنشاء مسار مستطيل بزوايا دائرية
  function createRoundRectPath(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // إضافة النصوص
  function addTextElements(ctx) {
    ctx.font = '900 30px NotoKufiArabic';
    ctx.fillStyle = config.colors[config.gender];
    
    const { textPositions } = config.canvasSettings;
    ctx.fillText(elements.nameInput.value, textPositions.name.x, textPositions.name.y);
    ctx.fillText(elements.gradeInput.value, textPositions.grade.x, textPositions.grade.y);
    ctx.fillText(elements.schoolInput.value, textPositions.school.x, textPositions.school.y);
    ctx.fillText(elements.placeInput.value, textPositions.place.x, textPositions.place.y);
    ctx.fillText(elements.phoneInput.value, textPositions.phone.x, textPositions.phone.y);
  }

  // التحقق من النموذج
  function validateForm() {
    const requiredFields = [
      elements.nameInput,
      elements.schoolInput,
      elements.placeInput,
      elements.gradeInput,
      elements.phoneInput
    ];
    
    return requiredFields.every(field => field.value.trim() !== '') && 
           elements.imageInput.files[0];
  }

  // عرض الأزرار
  function showActionButtons() {
    elements.downloadBtn.style.display = 'inline-block';
    elements.shareBtn.style.display = 'inline-block';
  }

  // تنزيل البطاقة
  function downloadID() {
    const link = document.createElement('a');
    link.href = elements.canvas.toDataURL('image/png', 1.0);
    link.download = 'school_id.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // مشاركة البطاقة
  async function shareID() {
    try {
      const blob = await new Promise(resolve => {
        elements.canvas.toBlob(resolve, 'image/png');
      });
      
      const file = new File([blob], 'school_id.png', { type: 'image/png' });
      
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          title: 'بطاقة هوية التلميذ',
          text: 'أنشأت هذه البطاقة باستخدام منشئ هوية التلميذ العراقي.',
          files: [file],
          url: 'https://schoolcard.space',
        });
      } else {
        alert('المشاركة غير مدعومة على هذا الجهاز. يرجى تحميل الصورة يدويًا.');
      }
    } catch (error) {
      console.error('فشل في المشاركة:', error);
    }
  }

  // إظهار المودال
  function showModal() {
    elements.modal.style.display = 'block';
  }

  // إغلاق المودال
  function closeModal() {
    elements.modal.style.display = 'none';
  }

  // معالجة الأخطاء
  function handleError(error) {
    console.error('حدث خطأ:', error);
    alert(error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.');
  }

  // بدء التطبيق
  init();
})();