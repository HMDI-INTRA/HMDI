document.querySelectorAll('.dropdown-menu').forEach(function(dropdown) {
    dropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

document.addEventListener("DOMContentLoaded", function() {
    var scrollPosition = 120; 
    var scrollSpeed = 10; 
    var currentPosition = window.scrollY;
    var direction = 1;

    var scrollSmooth = function() {
        if (currentPosition < scrollPosition) {
            var nextPosition = currentPosition + scrollSpeed;
  
            if (nextPosition > scrollPosition) {
                nextPosition = scrollPosition;
            }

            window.scrollTo(0, nextPosition);

            currentPosition = nextPosition;
      
            requestAnimationFrame(scrollSmooth);
        }
    };
    scrollSmooth();
});

    



function getDataHoje() {
    var hoje = new Date();
    var ano = hoje.getFullYear();
    var mes = (hoje.getMonth() + 1).toString().padStart(2, '0'); 
    var dia = hoje.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

function definirDataHoje(id) {
    var elemento = document.getElementById(id);
    if (elemento) {
        elemento.value = getDataHoje();
    }
}

definirDataHoje("dataInicio");
definirDataHoje("dataFinal");


$(document).ready(function(){
  $('.modal').modal({
    backdrop: 'static',
    keyboard: false
  });
});
