function aplicarIdioma(idioma) {
  document.documentElement.lang = idioma === 'en' ? 'en' : 'es';

  var elementos = document.querySelectorAll('[data-i18n]');
  for (var i = 0; i < elementos.length; i++) {
    var clave = elementos[i].getAttribute('data-i18n');
    if (TRADUCCIONES[clave] && TRADUCCIONES[clave][idioma]) {
      elementos[i].textContent = TRADUCCIONES[clave][idioma];
    }
  }

  var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  for (var j = 0; j < placeholders.length; j++) {
    var clavePh = placeholders[j].getAttribute('data-i18n-placeholder');
    if (TRADUCCIONES[clavePh] && TRADUCCIONES[clavePh][idioma]) {
      placeholders[j].setAttribute('placeholder', TRADUCCIONES[clavePh][idioma]);
    }
  }

  var boton = document.getElementById('botonIdioma');
  if (boton) {
    boton.textContent = idioma === 'es' ? 'EN' : 'ES';
  }
}

document.addEventListener('DOMContentLoaded', function () {

  var idiomaGuardado = localStorage.getItem('idiomaSitio') || 'es';
  aplicarIdioma(idiomaGuardado);

  var boton = document.getElementById('botonIdioma');
  if (boton) {
    boton.addEventListener('click', function () {
      var actual = localStorage.getItem('idiomaSitio') || 'es';
      var nuevo = actual === 'es' ? 'en' : 'es';
      localStorage.setItem('idiomaSitio', nuevo);
      aplicarIdioma(nuevo);
    });
  }

  var carrusel = document.getElementById('carruselEventos');
  var miniaturas = document.querySelectorAll('.miniatura');

  if (carrusel && miniaturas.length > 0) {
    var bsCarrusel = bootstrap.Carousel.getOrCreateInstance(carrusel);

    for (var i = 0; i < miniaturas.length; i++) {
      miniaturas[i].addEventListener('click', function () {
        var slide = parseInt(this.getAttribute('data-slide'));
        bsCarrusel.to(slide);
      });
    }

    carrusel.addEventListener('slid.bs.carousel', function (e) {
      for (var j = 0; j < miniaturas.length; j++) {
        miniaturas[j].classList.remove('activa');
      }
      if (miniaturas[e.to]) {
        miniaturas[e.to].classList.add('activa');
      }
    });

    if (miniaturas[0]) {
      miniaturas[0].classList.add('activa');
    }
  }

  var buscador = document.getElementById('buscadorGlosario');
  var filas = document.querySelectorAll('.termino-fila');
  var sinResultados = document.getElementById('sinResultados');

  if (buscador) {
    buscador.addEventListener('input', function () {
      var texto = this.value.toLowerCase().trim();
      var visibles = 0;

      for (var i = 0; i < filas.length; i++) {
        var contenido = filas[i].textContent.toLowerCase();
        if (contenido.indexOf(texto) !== -1) {
          filas[i].classList.remove('oculto');
          visibles++;
        } else {
          filas[i].classList.add('oculto');
        }
      }

      if (sinResultados) {
        if (visibles === 0) {
          sinResultados.classList.remove('d-none');
        } else {
          sinResultados.classList.add('d-none');
        }
      }
    });
  }

});
