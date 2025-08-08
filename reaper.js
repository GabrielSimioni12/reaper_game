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

  // --- O PRIMEIRO NÓ AGORA SE MOVE SUAVEMENTE ---
  let followSpeed = 0.1; // Ajuste este valor para controlar a velocidade de "acompanhamento"
  nodes[0].x += (mouseX - nodes[0].x) * followSpeed;
  nodes[0].y += (mouseY - nodes[0].y) * followSpeed;
  
  // Parâmetros para os movimentos
  let tailSpeed = 0.08; 
  let tailAmplitude = 0.6;
  let bodyWobbleSpeed = 0.05;
  let bodyWobbleAmplitude = 0.3;

  // Loop para os outros nós seguirem o anterior
  for (let i = 1; i < nodes.length; i++) {
    let prevNode = nodes[i - 1];
    let currentNode = nodes[i];
    
    // Calcula a distância para manter a lógica de "esticar"
    let dist = p5.Vector.dist(
      createVector(prevNode.x, prevNode.y),
      createVector(currentNode.x, currentNode.y)
    );

    let angle = atan2(prevNode.y - currentNode.y, prevNode.x - currentNode.x);

    let finalAngle = angle;
    
    // Adiciona o balanço no corpo
    let tailStart = Math.floor(nodes.length * 0.7);
    if (i < tailStart) {
      let bodyOffset = sin(frameCount * bodyWobbleSpeed + i * 0.5) * bodyWobbleAmplitude;
      finalAngle += bodyOffset;
    } 
    
    // Adiciona o movimento de onda apenas para a cauda
    if (i >= tailStart) {
      let amplitudeDecrease = map(i, tailStart, nodes.length - 1, 1, 0);
      let waveOffset = sin(frameCount * tailSpeed + i * 0.5) * tailAmplitude * amplitudeDecrease;
      finalAngle += waveOffset;
    }
    
    // --- CÓDIGO CORRIGIDO PARA POSICIONAR OS NÓS SUAVEMENTE ---
    let targetX = prevNode.x - cos(finalAngle) * currentNode.size;
    let targetY = prevNode.y - sin(finalAngle) * currentNode.size;

    currentNode.x += (targetX - currentNode.x) * followSpeed;
    currentNode.y += (targetY - currentNode.y) * followSpeed;
  }
  
  // --- O CÓDIGO DE DESENHO ABAIXO NÃO MUDOU ---
  for (let i = 0; i < nodes.length; i++) {
    let currentNode = nodes[i];
    
    let nodeSize = 0;
    if (i < nodes.length * 0.4) {
      nodeSize = map(i, 0, nodes.length * 0.4, 5, 40);
    } else {
      nodeSize = map(i, nodes.length * 0.4, nodes.length - 1, 40, 2);
    }
    
    let lineWeight = map(nodeSize, 2, 40, 1, 4);

    if (i > 0) {
      let prevNode = nodes[i - 1];
      let angle = atan2(prevNode.y - currentNode.y, prevNode.x - currentNode.x);

      stroke(255);
      strokeWeight(lineWeight);
      line(prevNode.x, prevNode.y, currentNode.x, currentNode.y);
      
      let legStart = Math.floor(nodes.length * 0.1);
      let legEnd = Math.floor(nodes.length * 0.4);
      if (i > legStart && i < legEnd) {
        let legLength = map(i, legStart, legEnd, 20, 40);
        let footLength = 7;
        let legWeight = 2;
        
        let legSpeed = 0.1;
        let legAmplitude = 0.5;

        let legOscillation = sin(frameCount * legSpeed + i);
        let currentLegAngle = angle + (legOscillation * legAmplitude);
        
        stroke(255);
        strokeWeight(legWeight);
        
        let legAngleRight = currentLegAngle + HALF_PI;
        let legEndPointX_R = currentNode.x + cos(legAngleRight) * legLength;
        let legEndPointY_R = currentNode.y + sin(legAngleRight) * legLength;
        line(currentNode.x, currentNode.y, legEndPointX_R, legEndPointY_R);
        line(legEndPointX_R, legEndPointY_R, legEndPointX_R + cos(legAngleRight + HALF_PI) * footLength, legEndPointY_R + sin(legAngleRight + HALF_PI) * footLength);
        
        let legAngleLeft = angle - (legOscillation * legAmplitude) - HALF_PI;
        let legEndPointX_L = currentNode.x + cos(legAngleLeft) * legLength;
        let legEndPointY_L = currentNode.y + sin(legAngleLeft) * legLength;
        line(currentNode.x, currentNode.y, legEndPointX_L, legEndPointY_L);
        line(legEndPointX_L, legEndPointY_L, legEndPointX_L + cos(legAngleLeft - HALF_PI) * footLength, legEndPointY_L + sin(legAngleLeft - HALF_PI) * footLength);
      }
    }
    
    fill(255);
    noStroke();
    
    if (i === 0) {
      ellipse(currentNode.x, currentNode.y, nodeSize * 1.5, nodeSize * 1.5);
    } else {
      ellipse(currentNode.x, currentNode.y, nodeSize, nodeSize);
    }
  }
}