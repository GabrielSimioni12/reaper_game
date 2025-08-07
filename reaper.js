const criatura = document.getElementById("criatura");
const pupilas = document.querySelectorAll(".pupila");

let mouseX = 0;
let mouseY = 0;
let criaturaX = 0;
let criaturaY = 0;
let speed = 0.1;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - criatura.offsetWidth / 2;
  mouseY = e.clientY - criatura.offsetHeight / 2;

  // Movimento dos olhos
  pupilas.forEach((pupila) => {
    const olho = pupila.parentElement.getBoundingClientRect();
    const centerX = olho.left + olho.width / 2;
    const centerY = olho.top + olho.height / 2;
    const angleX = (e.clientX - centerX) / 10;
    const angleY = (e.clientY - centerY) / 10;
    pupila.style.transform = `translate(${angleX}px, ${angleY}px)`;
  });
});

function animarCriatura() {
  const dx = mouseX - criaturaX;
  const dy = mouseY - criaturaY;
  const distancia = Math.sqrt(dx * dx + dy * dy);

  criaturaX += dx * speed;
  criaturaY += dy * speed;

  // Efeito elástico (estica mais quanto mais rápido)
  const escalaX = 1 + Math.min(distancia / 150, 0.5); // máx 1.5x
  const escalaY = 1 - Math.min(distancia / 300, 0.2); // máx 0.8x

  criatura.style.transform = `translate(${criaturaX}px, ${criaturaY}px) scaleX(${escalaX}) scaleY(${escalaY})`;

  requestAnimationFrame(animarCriatura);
}

animarCriatura();