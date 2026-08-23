/* ============================================================
   GALLERY PHOTOS - EDIT ONLY THE LIST BELOW
   ------------------------------------------------------------
   HOW TO ADD A PHOTO:
   1. Upload the image to  assets/images/gallery/  (github.com,
      open the folder, "Add file" > "Upload files").
   2. Copy one block between { } and paste it at the end of the
      list (add a comma after the previous } ).
   3. Fill the fields:
        foto      -> exact file name, e.g. "g08.jpg"
        titulo_en -> caption in English
        titulo_es -> caption in Spanish
   4. Click "Commit changes". Done - the website updates itself.

   TIP: use .jpg photos around 1200px wide so the page stays fast.
   ============================================================ */

var GALERIA = [
  { foto: "g01.jpg", titulo_en: "Lunchtime at the home",      titulo_es: "Hora de comer en el hogar" },
  { foto: "g02.jpg", titulo_en: "Learning together",          titulo_es: "Aprendiendo juntos" },
  { foto: "g03.jpg", titulo_en: "Playtime after class",       titulo_es: "Tiempo de juego tras la clase" },
  { foto: "g04.jpg", titulo_en: "Volunteers and children",    titulo_es: "Voluntarios y ninos" },
  { foto: "g05.jpg", titulo_en: "Art workshop",               titulo_es: "Taller de manualidades" },
  { foto: "g06.jpg", titulo_en: "Sports afternoon",           titulo_es: "Tarde de deportes" },
  { foto: "g07.jpg", titulo_en: "Bedtime stories",            titulo_es: "Cuentos antes de dormir" }
];

/* ============================================================
   DO NOT EDIT BELOW THIS LINE
   ============================================================ */

(function () {
  var BASE = ((document.currentScript && document.currentScript.src) || "")
    .replace(/js\/gallery-data\.js.*$/, "");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render() {
    var es = document.documentElement.lang.indexOf("es") === 0;
    var grid = document.getElementById("gallery-grid");
    if (!grid) return;

    grid.innerHTML = GALERIA.map(function (g) {
      return (
'                    <figure class="gallery-item">\n'
+ '                        <button type="button" class="gallery-item__btn" aria-haspopup="dialog">\n'
+ '                            <img src="' + BASE + 'assets/images/gallery/' + g.foto + '" alt="' + esc(es ? g.titulo_es : g.titulo_en) + '" loading="lazy" width="640" height="480">\n'
+ '                        </button>\n'
+ '                        <figcaption>' + esc(es ? g.titulo_es : g.titulo_en) + '</figcaption>\n'
+ '                    </figure>');
    }).join("\n");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
