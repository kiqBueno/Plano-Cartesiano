let origin, zoom = 30;
const unitLineSize = 10;
let pontos = [];

function setup() {
  createCanvas(windowWidth, windowHeight,);

  origin = createVector(width / 2, height / 2);
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    origin.x += mouseX - pmouseX;
    origin.y += mouseY - pmouseY;
  }

  translate(origin.x, origin.y);

  noFill();

  stroke(0);
  strokeWeight(1);

  axis(true, 25);

  stroke(0, 100, 0);
  strokeWeight(2);

  // for (let i = 0; i < pontos.length; i++) {
  //   f(pontos[i].x, pontos[i].y);
  // }
  for (let i = 0; i < pontos.length; i++) {
    f(pontos[i].x, pontos[i].y);
    if (i < pontos.length - 1) {
      line(pontos[i].x * zoom, -pontos[i].y * zoom, pontos[i+1].x * zoom, -pontos[i+1].y * zoom);
    }
  }
  // Desenha a última linha entre o último ponto e o primeiro ponto da lista
  if (pontos.length > 1) {
    line(pontos[pontos.length-1].x * zoom, -pontos[pontos.length-1].y * zoom, pontos[0].x * zoom, -pontos[0].y * zoom);
  }
}

function salvar(){
  let valorDeX = document.getElementById("valorX").value;
  let valorDeY = document.getElementById("valorY").value;
   
  pontos.push({x: valorDeX, y: valorDeY});
  
  f(valorDeX,valorDeY)
  // console.log(pontos)


}

function axis(grid, gridAlpha) {
  //abscissa
  line(-origin.x, 0, width - origin.y, 0);

  for (let i = 1; i < origin.x / zoom; i++) {
    line(-i * zoom, unitLineSize / 2, -i * zoom, -unitLineSize / 2);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-i * zoom, -origin.y, -i * zoom, height - origin.y);
      pop();
    }

    push();
    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);
    text(-i, -i * zoom - textWidth(-i) / 2, unitLineSize * 2);
    pop();
  }
  for (let i = 1; i < (width - origin.x) / zoom; i++) {
    line(i * zoom, unitLineSize / 2, i * zoom, -unitLineSize / 2);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(i * zoom, -origin.y, i * zoom, height - origin.y);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);

    text(i, i * zoom - textWidth(i) / 2, unitLineSize * 2);

    pop();
  }
  //ordinate
  line(0, -origin.y, 0, height - origin.y);
  for (let i = 1; i < origin.y / zoom; i++) {
    line(unitLineSize / 2, -i * zoom, -unitLineSize / 2, -i * zoom);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-origin.x, -i * zoom, width - origin.x, -i * zoom);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);

    text(-i, -(unitLineSize + textWidth(-i)), -i * zoom + unitLineSize / 2);

    pop();
  }
  for (let i = 1; i < (height - origin.y) / zoom; i++) {
    line(unitLineSize / 2, i * zoom, -unitLineSize / 2, i * zoom);

    if (grid) {
      push();
      stroke(0, gridAlpha);
      line(-origin.x, i * zoom, width - origin.x, i * zoom);
      pop();
    }

    push();

    noStroke();
    fill(0);
    textSize(unitLineSize * 1.2);

    text(i, -(unitLineSize + textWidth(i)), i * zoom + unitLineSize / 2);

    pop();
  }
}

function f(x, y) {
  if (x && y) {
    point(x * zoom, -y * zoom);
  }
}

function mouseWheel(event) {
  zoom -= event.delta / 20;
  if (zoom < 18) {
    zoom = 18;
  }
}

function area() {
  if (pontos.length < 3) return;

  let xCoords = pontos.map(p => p.x * zoom);
  let yCoords = pontos.map(p => p.y * zoom);

  let sum1 = 0, sum2 = 0;

  for (let i = 0; i < pontos.length - 1; i++) {
    sum1 += xCoords[i] * yCoords[i+1];
    sum2 += yCoords[i] * xCoords[i+1];
  }

  sum1 += xCoords[pontos.length-1] * yCoords[0];
  sum2 += yCoords[pontos.length-1] * xCoords[0];

  let area = (sum1 - sum2) / 2;

  let resultDiv = document.getElementById("resultado");
  resultDiv.innerHTML = "Área: " + area;
}

function keyPressed() {
  if (keyCode === 65) { // "a" key
    if (pontos.length >= 3) { // apenas calcula a área se houver pelo menos 3 pontos
      let xCoords = pontos.map(p => p.x); // cria uma lista com as coordenadas x de cada ponto
      let yCoords = pontos.map(p => p.y); // cria uma lista com as coordenadas y de cada ponto
      
      let sum = 0;
      for (let i = 0; i < pontos.length - 1; i++) {
        sum += xCoords[i] * yCoords[i+1] - xCoords[i+1] * yCoords[i]; // realiza o cálculo da soma
      }
      sum += xCoords[pontos.length-1] * yCoords[0] - xCoords[0] * yCoords[pontos.length-1]; // adiciona o produto do último ponto com o primeiro
      let area = Math.abs(sum) / 2; // divide o resultado final por 2 e calcula o valor absoluto
      
      console.log(`Área: ${area}`); // imprime o valor da área no console
    } else {
      console.log("Insira pelo menos 3 pontos para calcular a área."); // caso haja menos de 3 pontos
    }
  }
}