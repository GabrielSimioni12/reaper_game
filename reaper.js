const criatura = document.getElementById("criatura");

let mouseX = 0;
let mouseY = 0;
let criaturaX = 0;
let criaturaY = 0;

let speed = 0.1;
let tempoDecorrido = 0;

// Captura posição do mouse
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX - criatura.offsetWidth / 2;
  mouseY = e.clientY - criatura.offsetHeight / 2;
});

// Cria o rastro (fantasminha)
function criarRastro(x, y) {
  const rastro = document.createElement("div");
  rastro.className = "rastro";
  rastro.style.left = `${x}px`;
  rastro.style.top = `${y}px`;
  rastro.style.background = criatura.style.background;

  document.body.appendChild(rastro);

  setTimeout(() => {
    rastro.style.opacity = 0;
    setTimeout(() => rastro.remove(), 500);
  }, 10);
}

// Movimenta a criatura + rastro
function moverCriatura() {
  criaturaX += (mouseX - criaturaX) * speed;
  criaturaY += (mouseY - criaturaY) * speed;

  criatura.style.transform = `translate(${criaturaX}px, ${criaturaY}px)`;

  criarRastro(criaturaX, criaturaY);

  requestAnimationFrame(moverCriatura);
}

moverCriatura();

// Aumenta velocidade e muda aparência com o tempo
setInterval(() => {
  tempoDecorrido += 1;

  if (tempoDecorrido === 5) {
    speed = 0.15;
    criatura.style.background = "radial-gradient(circle, #ffcc00, #ff6600)";
    criatura.style.boxShadow = "0 0 25px #ff990088";
  }

  if (tempoDecorrido === 10) {
    speed = 0.25;
    criatura.style.background = "radial-gradient(circle, #ff0066, #cc0052)";
    criatura.style.boxShadow = "0 0 30px #ff006688";
  }

  if (tempoDecorrido === 15) {
    speed = 0.4;
    criatura.style.background = "radial-gradient(circle, #9900ff, #330066)";
    criatura.style.boxShadow = "0 0 40px #9900ffaa";
  }
}, 1000);