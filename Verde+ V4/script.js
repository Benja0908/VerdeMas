document.addEventListener("DOMContentLoaded", () => {

  // --- (MODIFICADO) Base de datos simulada de productos ---
  // Ya está agregado el código de la botella Vital
  const productDatabase = {
    // Código de Agua Vital 600ml
    '7802820600209': {
      name: 'Agua Vital Sin Gas 600ml',
      material: 'PET',
      weight_g: 30, // Peso aproximado
      img: 'img/bottle.png'
    },
    // Código de una Coca-Cola 591ml
    '7501055311270': {
      name: 'Botella de Bebida 591ml',
      material: 'PET',
      weight_g: 28,
      img: 'img/bottle.png'
    },
    // Código de un Nectar Andina 1.5L
    '7802100001062': {
      name: 'Envase TetraPak 1.5L',
      material: 'TetraPak',
      weight_g: 40,
      img: 'img/plant.png' 
    }
  };

  // --- Guías de reciclaje ---
  const recyclingGuides = {
    'PET': {
      storage: 'Lava la botella, sácale la etiqueta y aplástala. Junta las tapas por separado.',
      recycling: 'Deposítala en el contenedor de "Plásticos" (PET 1) de tu punto limpio más cercano. Las tapas van en "Tapas" (PP 5).'
    },
    'TetraPak': {
      storage: 'Enjuaga el envase, ábrelo por las puntas y aplástalo para que ocupe menos espacio. Déjalo secar.',
      recycling: 'Deposítalo en el contenedor específico para "TetraPak" en un punto limpio.'
    },
    'default': {
      storage: 'Revisa el envase para ver su número de reciclaje (ej: 1, 2, 5).',
      recycling: 'Separa según el material e infórmate en tu punto limpio más cercano.'
    }
  };

  // --- Lógica de Puntos ---
  const calculatePoints = (weight, material) => {
    if (material === 'PET') {
      return Math.ceil(weight * 0.5);
    } else if (material === 'TetraPak') {
      return Math.ceil(weight * 0.2);
    }
    return 0; 
  };


  // --- Navegación entre pantallas ---
  const screens = document.querySelectorAll(".screen");
  const allNavLinks = document.querySelectorAll(".bottom-nav a"); 

  const showScreen = (id) => {
    screens.forEach(s => s.classList.remove("active"));
    const newScreen = document.getElementById(id);
    if (newScreen) {
      newScreen.classList.add("active");
    }

    allNavLinks.forEach(link => link.classList.remove("active"));
    
    if (id === "dashboard") {
      const homeLink = document.getElementById("navHomeDash");
      if (homeLink) homeLink.classList.add("active");
    } else if (id === "profileScreen") {
      const profileLink = document.getElementById("navProfileProfile");
      if (profileLink) profileLink.classList.add("active");
    } else if (id === "historyScreen") { 
      const historyLink = document.getElementById("navHistoryHistory");
      if (historyLink) historyLink.classList.add("active");
    }
  };

  // --- Lógica del Slideshow de Introducción ---
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const nextSlideBtn = document.getElementById("nextSlideBtn");
  const skipIntroBtn = document.getElementById("skipIntroBtn");
  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");

    if (index === slides.length - 1) {
      nextSlideBtn.textContent = "Comenzar";
    } else {
      nextSlideBtn.textContent = "Siguiente";
    }
    currentSlide = index;
  };

  if (nextSlideBtn) {
    nextSlideBtn.onclick = () => {
      if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
      } else {
        showScreen("login");
      }
    };
  }

  if (skipIntroBtn) {
    skipIntroBtn.onclick = () => showScreen("login");
  }

  dots.forEach(dot => {
    dot.onclick = () => {
      const slideIndex = parseInt(dot.getAttribute("data-slide"));
      showSlide(slideIndex);
    };
  });
  
  // --- Botones de Navegación General ---
  document.getElementById("loginBtn").onclick = () => showScreen("dashboard");
  document.getElementById("backFromMap").onclick = () => showScreen("dashboard");
  
  document.getElementById("backFromScanner").onclick = () => {
    Quagga.stop(); // Detener la cámara al salir
    showScreen("dashboard");
  };

  document.getElementById("backFromRewards").onclick = () => showScreen("dashboard");
  document.getElementById("backFromTrucks").onclick = () => showScreen("dashboard");
  document.getElementById("backFromNews").onclick = () => showScreen("dashboard");

  
  // --- Botones de Acciones Rápidas (usando IDs) ---
  const rewardsBtn = document.getElementById("rewardsBtn");
  const scanBtn = document.getElementById("scanBtn");
  const mapBtn = document.getElementById("mapBtn");
  const truckScheduleBtn = document.getElementById("truckScheduleBtn"); 
  const newsBtn = document.getElementById("newsBtn"); 
  
  if (rewardsBtn) rewardsBtn.onclick = () => showScreen("rewardsScreen");
  if (mapBtn) mapBtn.onclick = () => showScreen("mapScreen");
  if (truckScheduleBtn) truckScheduleBtn.onclick = () => showScreen("truckScreen"); 
  if (newsBtn) newsBtn.onclick = () => showScreen("newsScreen"); 


  // --- Navegación Inferior (Bottom Nav) ---
  const navHomeDash = document.getElementById("navHomeDash");
  const navHistoryDash = document.getElementById("navHistoryDash"); 
  const navProfileDash = document.getElementById("navProfileDash");
  const navHomeProfile = document.getElementById("navHomeProfile");
  const navHistoryProfile = document.getElementById("navHistoryProfile"); 
  const navProfileProfile = document.getElementById("navProfileProfile");
  const navHomeHistory = document.getElementById("navHomeHistory");
  const navHistoryHistory = document.getElementById("navHistoryHistory");
  const navProfileHistory = document.getElementById("navProfileHistory");

  if (navHomeDash) navHomeDash.onclick = (e) => { e.preventDefault(); showScreen("dashboard"); };
  if (navHistoryDash) navHistoryDash.onclick = (e) => { e.preventDefault(); showScreen("historyScreen"); }; 
  if (navProfileDash) navProfileDash.onclick = (e) => { e.preventDefault(); showScreen("profileScreen"); };
  if (navHomeProfile) navHomeProfile.onclick = (e) => { e.preventDefault(); showScreen("dashboard"); };
  if (navHistoryProfile) navHistoryProfile.onclick = (e) => { e.preventDefault(); showScreen("historyScreen"); }; 
  if (navProfileProfile) navProfileProfile.onclick = (e) => { e.preventDefault(); showScreen("profileScreen"); };
  if (navHomeHistory) navHomeHistory.onclick = (e) => { e.preventDefault(); showScreen("dashboard"); };
  if (navHistoryHistory) navHistoryHistory.onclick = (e) => { e.preventDefault(); showScreen("historyScreen"); };
  if (navProfileHistory) navProfileHistory.onclick = (e) => { e.preventDefault(); showScreen("profileScreen"); };

  // --- Navegación Sub-menú Perfil ---
  const editProfileLink = document.getElementById("editProfileLink");
  const notificationsLink = document.getElementById("notificationsLink");
  const privacyLink = document.getElementById("privacyLink");

  if (editProfileLink) editProfileLink.onclick = (e) => { e.preventDefault(); showScreen("editProfileScreen"); };
  if (notificationsLink) notificationsLink.onclick = (e) => { e.preventDefault(); showScreen("notificationsScreen"); };
  if (privacyLink) privacyLink.onclick = (e) => { e.preventDefault(); showScreen("privacyScreen"); };

  // --- Botones "Volver" de Ajustes ---
  const backFromEditProfile = document.getElementById("backFromEditProfile");
  const backFromNotifications = document.getElementById("backFromNotifications");
  const backFromPrivacy = document.getElementById("backFromPrivacy");

  if (backFromEditProfile) backFromEditProfile.onclick = () => showScreen("profileScreen");
  if (backFromNotifications) backFromNotifications.onclick = () => showScreen("profileScreen");
  if (backFromPrivacy) backFromPrivacy.onclick = () => showScreen("profileScreen");


  // 📈 --- Chart.js ---
  const chartCanvas = document.getElementById('recycleChart');
  if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    const weeklyPoints = [40, 60, 50, 70, 80, 100, 90];
    const totalPoints = weeklyPoints.reduce((a, b) => a + b, 0);
    const progressChange = 10;

    document.getElementById("weeklyPoints").textContent = `${totalPoints} pts`;
    document.getElementById("progressChange").textContent = `+${progressChange}% vs semana pasada`;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
        datasets: [{
          data: weeklyPoints,
          borderColor: '#00b341',
          backgroundColor: 'rgba(0,179,65,0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: '#00b341'
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 20 } }
        }
      }
    });
  }

  // 🗺️ --- Leaflet ---
  const mapElement = document.getElementById("map");
  if (mapElement) {
    const map = L.map("map").setView([-33.45, -70.65], 12);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    const puntosVerdes = [
      { nombre: "Punto Verde Plaza Ñuñoa", coords: [-33.454, -70.598] },
      { nombre: "EcoCentro Providencia", coords: [-33.44, -70.62] },
      { nombre: "ReciclaParque", coords: [-33.47, -70.66] }
    ];

    puntosVerdes.forEach(p => {
      L.marker(p.coords).addTo(map)
        .bindPopup(`<strong>${p.nombre}</strong><br>Centro de reciclaje activo`);
    });
  }

  // 📷 --- (MODIFICADO) Lógica del Escáner ---
  const scannerDiv = document.getElementById("scanner");
  const scanResult = document.getElementById("scanResult");
  const modal = document.getElementById("scanResultModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  
  if (scanBtn) {
    scanBtn.addEventListener("click", () => {
      showScreen("scannerScreen");
      startScanner(); // Iniciar la cámara
    });
  }

  const startScanner = () => {
    scanResult.textContent = "Apunte la cámara al código de barras...";
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: scannerDiv,
        constraints: {
          // (MODIFICADO) Aumentamos la resolución para mejor enfoque
          width: 640,
          height: 480,
          facingMode: "environment" // Usar cámara trasera
        },
      },
      decoder: { 
        readers: ["ean_reader", "code_128_reader"] 
      },
      // (MODIFICADO) Ajustes para mejorar la precisión
      locator: {
        patchSize: "medium",
        halfSample: false // Usa la imagen completa, es más lento pero más preciso
      },
      locate: true
    }, (err) => {
      if (err) {
        console.error(err);
        scanResult.textContent = "Error al iniciar la cámara. (Recuerda usar HTTPS)";
        return;
      }
      Quagga.start();
    });
  };

  Quagga.onDetected((data) => {
    Quagga.stop(); // Detener la cámara al detectar
    const code = data.codeResult.code;
    
    // Buscar el producto en nuestra "base de datos"
    const product = productDatabase[code];

    if (product) {
      // Producto encontrado
      const points = calculatePoints(product.weight_g, product.material);
      const guide = recyclingGuides[product.material] || recyclingGuides.default;

      // Actualizar el contenido del modal
      document.getElementById('modalProductName').textContent = product.name;
      document.getElementById('modalPointsResult').innerHTML = `¡Ganaste <strong>${points}</strong> puntos! <br>(${product.weight_g}g de ${product.material})`;
      document.getElementById('modalProductImage').src = product.img;
      document.getElementById('modalRecycleInfo').innerHTML = `
        <h4>Cómo guardarlo en casa:</h4>
        <p>${guide.storage}</p>
        <h4>Cómo reciclarlo:</h4>
        <p>${guide.recycling}</p>
      `;
      
      // Mostrar el modal
      modal.classList.add("active");

    } else {
      // Producto no encontrado
      scanResult.textContent = `Código [${code}] no reconocido.`;
      // Reiniciar después de un momento
      setTimeout(() => {
        scanResult.textContent = "Apunte la cámara al código de barras...";
        Quagga.start();
      }, 2000);
    }
  });

  // Cerrar el modal y volver a escanear
  if (closeModalBtn) {
    closeModalBtn.onclick = () => {
      modal.classList.remove("active");
      scanResult.textContent = "Apunte la cámara al código de barras...";
      Quagga.start(); // Reiniciar la cámara para escanear otro
    };
  }

});