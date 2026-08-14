// =====================================================================
// CONFIGURACION — Sahumo ArapySandu
// =====================================================================
// Para activar el descuento automático de stock, el guardado de
// pedidos y las ventas de feria, pegá acá abajo el link que te da
// Google Apps Script al publicarlo (termina en /exec).
// Mirá el LEEME.txt, sección "STOCK AUTOMÁTICO" para el paso a paso.
//
// Si dejás esto vacío (""), el catálogo funciona igual que antes,
// con el stock cargado a mano en el panel, sin nada automático.
// =====================================================================

const STOCK_API_URL = "https://script.google.com/macros/s/AKfycby0d8Uz6IUh3pd8frRhr2G-glvemdQU7fsXltLz6KpmjNyqzkWWNZzUKRdaiL_WAeka/exec";

// =====================================================================
// NO TOCAR DE ACÁ PARA ABAJO
// =====================================================================
// Esta función manda datos a la hoja de Google usando un formulario
// oculto en vez de "fetch". Es el método más confiable para este tipo
// de conexión, y funciona igual en index.html, panel-productos.html
// y panel-ventas.html.
function sendToSheet(params) {
  if (typeof STOCK_API_URL === 'undefined' || !STOCK_API_URL) return;

  var iframeName = 'sheetFrame_' + Date.now();
  var iframe = document.createElement('iframe');
  iframe.name = iframeName;
  iframe.style.display = 'none';
  document.body.appendChild(iframe);

  var form = document.createElement('form');
  form.method = 'POST';
  form.action = STOCK_API_URL;
  form.target = iframeName;
  form.style.display = 'none';

  Object.keys(params).forEach(function(key) {
    var input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();

  setTimeout(function() {
    if (form.parentNode) form.parentNode.removeChild(form);
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
  }, 4000);
}
