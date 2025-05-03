const vocales = ['a', 'e', 'i', 'o', 'u'];
let actual = 0;
let aciertos = 0;

const letraEl = document.getElementById('letra');
const textoEl = document.getElementById('texto');
const aciertosEl = document.getElementById('aciertos');
const hablarBtn = document.getElementById('hablarBtn');

hablarBtn.addEventListener('click', escuchar);

function escuchar() {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert("Tu navegador no soporta el reconocimiento de voz.");
    return;
  }

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const reconocimiento = new Recognition();
  reconocimiento.lang = 'es-ES';
  reconocimiento.interimResults = false;
  reconocimiento.maxAlternatives = 1;
  reconocimiento.start();

  reconocimiento.onresult = (event) => {
    const texto = event.results[0][0].transcript.toLowerCase().trim();

    // Normalizar: quitar tildes y espacios
    const normalizado = texto
      .normalize("NFD")                     // separa caracteres como é → e + ́
      .replace(/[\u0300-\u036f]/g, "")     // elimina marcas de tilde
      .replace(/\s+/g, "");                // quita espacios

    textoEl.textContent = normalizado;

    const esperado = vocales[actual];

    if (normalizado === esperado) {
      aciertos++;
      aciertosEl.textContent = aciertos;
      actual = (actual + 1) % vocales.length;
      letraEl.textContent = vocales[actual].toUpperCase();
    } else {
      alert(`Dijiste "${normalizado}", pero se esperaba "${esperado}". Intenta de nuevo.`);
    }
  };

  reconocimiento.onerror = (event) => {
    alert("Error al reconocer la voz: " + event.error);
  };
}
