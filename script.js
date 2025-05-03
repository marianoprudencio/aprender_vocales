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
    textoEl.textContent = texto;

    const esperado = vocales[actual];
    const equivalencias = {
      'a': ['a', 'ah'],
      'e': ['e', 'eh'],
      'i': ['i'],
      'o': ['o', 'oh'],
      'u': ['u']
    };

    if (equivalencias[esperado].includes(texto)) {
      aciertos++;
      aciertosEl.textContent = aciertos;
      actual = (actual + 1) % vocales.length;
      letraEl.textContent = vocales[actual].toUpperCase();
    }
  };

  reconocimiento.onerror = (event) => {
    alert("Error al reconocer la voz: " + event.error);
  };
}
