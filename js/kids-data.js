/* ============================================================
   SPONSORED CHILDREN - EDIT ONLY THE LIST BELOW
   ------------------------------------------------------------
   HOW TO ADD A CHILD:
   1. Upload the photo to  assets/images/sponsor/  (github.com,
      open the folder, "Add file" > "Upload files").
   2. Copy one block between { } and paste it at the end of the
      list (add a comma after the previous } ).
   3. Fill the fields:
        foto        -> exact file name, e.g. "maria.jpg"
        nombre      -> child full name
        edad        -> age in numbers
        sexo        -> "F" (girl) or "M" (boy)
        hobby_en/es -> what the child loves (english / spanish)
        sueno_en/es -> dream job (english / spanish)
        apadrinado  -> true if already sponsored, false if not
   4. Click "Commit changes". Done - the website updates itself.
   ============================================================ */

var KIDS = [
  { foto: "shanel.jpg",  nombre: "Shanel Patrick",    edad: 4, sexo: "F",
    hobby_en: "Playing volleyball",            hobby_es: "Jugar al voleibol",
    sueno_en: "to become a teacher",           sueno_es: "ser maestra",
    apadrinado: false, destacado: true },

  { foto: "nino-c.jpg",  nombre: "Dorcas Lucas",      edad: 6, sexo: "F",
    hobby_en: "Playing volleyball",            hobby_es: "Jugar al voleibol",
    sueno_en: "to become a police officer",    sueno_es: "ser policia",
    apadrinado: true },

  { foto: "nino-a.jpg",  nombre: "Maxwell Muyinga",   edad: 7, sexo: "M",
    hobby_en: "Playing football",              hobby_es: "Jugar al futbol",
    sueno_en: "to become a footballer",        sueno_es: "ser futbolista",
    apadrinado: false, destacado: true },

  { foto: "nino-b.jpg",  nombre: "Juniour Peter",     edad: 5, sexo: "M",
    hobby_en: "Playing football",              hobby_es: "Jugar al futbol",
    sueno_en: "to become an engineer",         sueno_es: "ser ingeniero",
    apadrinado: false },

  { foto: "nino-c.jpg",  nombre: "Hekima Elias",      edad: 6, sexo: "F",
    hobby_en: "Drawing & painting",            hobby_es: "Dibujar y pintar",
    sueno_en: "to become a lawyer",            sueno_es: "ser abogada",
    apadrinado: false },

  { foto: "nino-a.jpg",  nombre: "Rose Stanley",      edad: 6, sexo: "F",
    hobby_en: "Playing dolls and painting",    hobby_es: "Jugar con munecas y pintar",
    sueno_en: "to become an engineer",         sueno_es: "ser ingeniera",
    apadrinado: false },

  { foto: "nino-b.jpg",  nombre: "Noel Emanuel",      edad: 4, sexo: "M",
    hobby_en: "Playing football",              hobby_es: "Jugar al futbol",
    sueno_en: "to become a journalist",        sueno_es: "ser periodista",
    apadrinado: false },

  { foto: "nino-c.jpg",  nombre: "Jovin Allen",       edad: 4, sexo: "M",
    hobby_en: "Reading and watching TV",       hobby_es: "Leer y ver la television",
    sueno_en: "to become a journalist",        sueno_es: "ser periodista",
    apadrinado: false },

  { foto: "nino-a.jpg",  nombre: "Precious Mwitta",   edad: 3, sexo: "F",
    hobby_en: "Cooking and gardening",         hobby_es: "Cocinar y jardineria",
    sueno_en: "to become a teacher",           sueno_es: "ser maestra",
    apadrinado: false },

  { foto: "nino-b.jpg",  nombre: "Star Simon",        edad: 6, sexo: "M",
    hobby_en: "Football & drawing",            hobby_es: "Futbol y dibujo",
    sueno_en: "to become a pilot",             sueno_es: "ser piloto",
    apadrinado: false, destacado: true },

  { foto: "nino-a.jpg",  nombre: "Praygod Emily Nnko", edad: 5, sexo: "M",
    hobby_en: "Watching football & scouting",  hobby_es: "Ver futbol y hacer scouts",
    sueno_en: "to become a mechanical engineer", sueno_es: "ser ingeniero mecanico",
    apadrinado: false },

  { foto: "nino-b.jpg",  nombre: "Havila Samwel",     edad: 3, sexo: "F",
    hobby_en: "Cooking and gardening",         hobby_es: "Cocinar y jardineria",
    sueno_en: "to become a teacher",           sueno_es: "ser maestra",
    apadrinado: false },

  { foto: "nino-c.jpg",  nombre: "Nasri Musa",        edad: 5, sexo: "M",
    hobby_en: "Painting & games",              hobby_es: "Pintar y jugar",
    sueno_en: "to become a doctor",            sueno_es: "ser doctor",
    apadrinado: false },

  { foto: "nino-a.jpg",  nombre: "Glady Musa",        edad: 5, sexo: "F",
    hobby_en: "Playing dolls & games",         hobby_es: "Munecas y juegos",
    sueno_en: "to become a musician",          sueno_es: "ser musica",
    apadrinado: false },

  { foto: "nino-b.jpg",  nombre: "Frank John",        edad: 7, sexo: "M",
    hobby_en: "Reading & playing football",    hobby_es: "Leer y jugar al futbol",
    sueno_en: "to become a professor",         sueno_es: "ser profesor",
    apadrinado: false }
];

/* ============================================================
   DO NOT EDIT BELOW THIS LINE
   ============================================================ */

(function () {
  /* Carpeta raiz del sitio, deducida de donde vive este archivo */
  var BASE = ((document.currentScript && document.currentScript.src) || "")
    .replace(/js\/kids-data\.js.*$/, "");

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render() {
    var es = document.documentElement.lang.indexOf("es") === 0;
    var L = es
      ? { anos: "años", niña: "Niña", niño: "Niño", ama: "Le encanta",
          sueño: "Sueño", btn: "Apadrinar a", subj: "Apadrinaje para ",
          sp: "Apadrinado", ver: "Ver y apadrinar" }
      : { anos: "years old", niña: "Girl", niño: "Boy", ama: "Loves",
          sueño: "Dream", btn: "Sponsor", subj: "Sponsorship for ",
          sp: "Sponsored", ver: "View & sponsor" };

    var grid = document.getElementById("sponsor-grid");
    var featured = document.getElementById("featured-kids");

    function cardHtml(k) {
      var genero = k.sexo === "F" ? L.niña : L.niño;
      var spBadge = k.apadrinado
        ? '\n                            <span class="badge badge--success">' + L.sp + ' \u2713</span>'
        : "";
      var cta = k.apadrinado
        ? '<button type="button" class="btn btn--secondary btn--sm" disabled aria-disabled="true" title="' + (es ? "Ya tiene padrino" : "Already sponsored") + '">' + L.btn + " " + esc(k.nombre.split(" ")[0]) + '</button>'
        : '<a href="mailto:info@fortunekids.org?subject=' + encodeURIComponent(L.subj + k.nombre) + '" class="btn btn--secondary btn--sm">' + L.btn + " " + esc(k.nombre.split(" ")[0]) + '</a>';
      return (
'                    <article class="sponsor-child card">\n'
+ '                        <img src="' + BASE + 'assets/images/sponsor/' + k.foto + '" alt="' + esc(k.nombre) + '" width="480" height="336" loading="lazy">\n'
+ '                        <div class="card__content">\n'
+ '                            <h3 class="card__title">' + esc(k.nombre) + '</h3>\n'
+ '                            <span class="badge badge--primary">' + k.edad + " " + L.anos + " &middot; " + genero + '</span>' + spBadge + '\n'
+ '                            <p class="card__text"><strong>' + L.ama + ':</strong> ' + esc(es ? k.hobby_es : k.hobby_en) + '<br>\n'
+ '                            <strong>' + L.sueño + ':</strong> ' + esc(es ? k.sueno_es : k.sueno_en) + '</p>\n'
+ '                            ' + cta + '\n'
+ '                        </div>\n'
+ '                    </article>');
    }

    function miniCardHtml(k) {
      return (
'                        <article class="sponsor-child card">\n'
+ '                            <img src="' + BASE + 'assets/images/sponsor/' + k.foto + '" alt="' + esc(k.nombre) + '" width="480" height="336" loading="lazy">\n'
+ '                            <div class="card__content">\n'
+ '                                <h3 class="card__title">' + esc(k.nombre) + '</h3>\n'
+ '                                <span class="badge badge--primary">' + k.edad + " " + L.anos + '</span>\n'
+ '                                <p class="card__text">' + esc(es ? k.sueno_es : k.sueno_en) + '</p>\n'
+ '                                <a href="' + (es ? "apadrina.html" : "sponsor.html") + '" class="btn btn--secondary btn--sm">' + L.ver + '</a>\n'
+ '                            </div>\n'
+ '                        </article>');
    }

    if (grid) {
      grid.innerHTML = KIDS.map(cardHtml).join("\n\n");
    }
    if (featured) {
      featured.innerHTML = KIDS.filter(function (k) { return k.destacado; })
                               .slice(0, 3)
                               .map(miniCardHtml)
                               .join("\n");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
