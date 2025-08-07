const criaturaGrupo = document.getElementById("criaturaGrupo");
const pupilaEsq = document.getElementById("pupilaEsq");
const pupilaDir = document.getElementById("pupilaDir");

let mouseX = 0;
let mouseY = 0;
let criaturaX = 75; // centro inicial
let criaturaY = 75;
let speed = 0.1;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animarCriatura() {
  const dx = mouseX - criaturaX;
  const dy = mouseY - criaturaY;
  const distancia = Math.sqrt(dx * dx + dy * dy);

  criaturaX += dx * speed;
  criaturaY += dy * speed;

  const escalaX = 1 + Math.min(distancia / 150, 0.5);
  const escalaY = 1 - Math.min(distancia / 300, 0.2);

  // Move e estica o SVG com transform
  criaturaGrupo.setAttribute(
    "transform",
    `translate(${criaturaX - 75}, ${criaturaY - 75}) scale(${escalaX}, ${escalaY}`);


  // Pupilas seguem o cursor com leve movimento
  moverPupila(pupilaEsq, 55, 70, 5);
  moverPupila(pupilaDir, 95, 70, 5);

  requestAnimationFrame(animarCriatura);
}

function moverPupila(pupila, cx, cy, limite) {
  const angX = ((mouseX / window.innerWidth) - 0.5) * 2;
  const angY = ((mouseY / window.innerHeight) - 0.5) * 2;
  const offsetX = angX * limite;
  const offsetY = angY * limite;
  pupila.setAttribute("cx", cx + offsetX);
  pupila.setAttribute("cy", cy + offsetY);
}

animarCriatura();