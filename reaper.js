

const criatura = document.getElementById("criatura");

let mouseX = 0;
let mouseY = 0;

let criaturaX = 0;
let criaturaY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - criatura.offsetWidth / 2;
  mouseY = e.clientY - criatura.offsetHeight / 2;
});

function moverCriatura() {
  // Suaviza o movimento, quanto menor o fator, mais lenta e suave
  criaturaX += (mouseX - criaturaX) * 0.1;
  criaturaY += (mouseY - criaturaY) * 0.1;

  criatura.style.transform = `translate(${criaturaX}px, ${criaturaY}px)`;

  requestAnimationFrame(moverCriatura);
}

moverCriatura();