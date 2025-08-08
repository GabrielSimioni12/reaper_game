class Node {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }
}





let nodes = [];
let numNodes = 15; // Número de nós do corpo do lagarto

function setup() {
  createCanvas(800, 600); // Cria a tela de desenho
  
  // Cria os nós do lagarto e os armazena no array
  for (let i = 0; i < numNodes; i++) {
    // Inicialmente, todos os nós ficam no centro da tela
    nodes.push(new Node(width / 2, height / 2, 10)); 
  }
}



function draw() {
  background(0); // Fundo preto a cada frame

  // O primeiro nó (a cabeça) segue o mouse
  nodes[0].x = mouseX;
  nodes[0].y = mouseY;

  // Loop para os outros nós seguirem o anterior
  for (let i = 1; i < nodes.length; i++) {
    let prevNode = nodes[i - 1];
    let currentNode = nodes[i];
    
    // Calcula a distância entre o nó atual e o anterior
    let dist = p5.Vector.dist(
      createVector(prevNode.x, prevNode.y),
      createVector(currentNode.x, currentNode.y)
    );

    // Calcula o ângulo entre o nó atual e o anterior
    let angle = atan2(prevNode.y - currentNode.y, prevNode.x - currentNode.x);

    // Reposiciona o nó atual para ficar a uma distância fixa do anterior
    // A distância agora é baseada no tamanho do nó anterior
    currentNode.x = prevNode.x - cos(angle) * prevNode.size;
    currentNode.y = prevNode.y - sin(angle) * prevNode.size;
  }

  // --- NOVO CÓDIGO DE DESENHO ---
  for (let i = 0; i < nodes.length; i++) {
    let currentNode = nodes[i];
    
    // Mapeia o tamanho para criar uma perspectiva (cabeça maior, cauda menor)
    // O nó 0 (cabeça) tem o maior tamanho, o último nó tem o menor
    let nodeSize = map(i, 0, nodes.length - 1, 15, 2);
    
    // Desenha as linhas entre os nós
    if (i > 0) {
      let prevNode = nodes[i - 1];
      // A espessura da linha também diminui em direção à cauda
      let lineWeight = map(i, 0, nodes.length - 1, 3, 1);
      strokeWeight(lineWeight); // Define a espessura da linha
      stroke(255); // Cor branca para a linha
      line(prevNode.x, prevNode.y, currentNode.x, currentNode.y);
    }
    
    // Desenha os nós como círculos
    fill(255); // Cor branca para o círculo
    noStroke();
    ellipse(currentNode.x, currentNode.y, nodeSize, nodeSize);
  }
}
  // O primeiro nó (a cabeça) segue o mouse
  nodes[0].x = mouseX;
  nodes[0].y = mouseY;

  // Loop para os outros nós seguirem o anterior
  for (let i = 1; i < nodes.length; i++) {
    let prevNode = nodes[i - 1];
    let currentNode = nodes[i];
    
    // Calcula a distância entre o nó atual e o anterior
    let dist = p5.Vector.dist(
      createVector(prevNode.x, prevNode.y),
      createVector(currentNode.x, currentNode.y)
    );

    // Calcula o ângulo entre o nó atual e o anterior
    let angle = atan2(prevNode.y - currentNode.y, prevNode.x - currentNode.x);

    // Reposiciona o nó atual para ficar a uma distância fixa do anterior
    currentNode.x = prevNode.x - cos(angle) * prevNode.size;
    currentNode.y = prevNode.y - sin(angle) * prevNode.size;
  }

  // Desenha os nós e as linhas para formar o esqueleto
  for (let i = 0; i < nodes.length; i++) {
    // Desenha as linhas entre os nós
    if (i > 0) {
      let prevNode = nodes[i - 1];
      let currentNode = nodes[i];
      stroke(255); // Cor branca para a linha
      line(prevNode.x, prevNode.y, currentNode.x, currentNode.y);
    }

    // Desenha os nós como círculos
    fill(255); // Cor branca para o círculo
    noStroke();
    ellipse(nodes[i].x, nodes[i].y, nodes[i].size, nodes[i].size);
  }



