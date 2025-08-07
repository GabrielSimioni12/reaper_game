const criatura = document.getElementById("criatura");

let mouseX = 0;
let mouseY = 0;

let criaturaX = 0;
let criaturaY = 0;

let speed = 0.1; // velocidade inicial
let tempoDecorrido = 0;

// Captura o movimento do mouse
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - criatura.offsetWidth / 2;
  mouseY = e.clientY - criatura.offsetHeight / 2;
});

function moverCriatura() {
  // Atualiza posição com base na velocidade atual
  criaturaX += (mouseX - criaturaX) * speed;
  criaturaY += (mouseY - criaturaY) * speed;

  criatura.style.transform = `translate(${criaturaX}px, ${criaturaY}px)`;

  requestAnimationFrame(moverCriatura);
}

moverCriatura();

// ⏱ Após 5 segundos, a criatura começa a acelerar
setInterval(() => {
  tempoDecorrido += 1;

  if (tempoDecorrido === 5) {
    speed = 0.15;
  }

  if (tempoDecorrido === 10) {
    speed = 0.25;
  }

  if (tempoDecorrido === 15) {
    speed = 0.4; // Vai bem rápido depois de um tempo
  }
}, 1000);