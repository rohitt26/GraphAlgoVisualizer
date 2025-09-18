// implementing the priorirty Queue (min heap)
// downHeapify, upHeapify, push(), pop()

class PriorityQueue{
    constructor(){
        this.elements=[];
        this.length=0;
    }
    push(data){
    this.elements.push(data);
    this.length++;
    this.upHeapify(this.length-1);
        // since the index of the data will be length-1
    }
    pop(){
        this.swap(0,this.length-1);
        // note we took the element from the top of the heap
        const popped=this.elements.pop();
        this.length--;
        this.downHeapify(0);
        return popped;
    }
    upHeapify(i){
        if(i===0)return;
        const parent=Math.floor((i-1)/2);
        if(this.elements[i].cost<this.elements[parent].cost){
            this.swap(parent,i);
            this.upHeapify(parent);
        }
    }
    downHeapify(i){

        if(2*i+1>this.length-1)return;

        const childleft=2*i+1;

        const childright=(2*i+2<=this.length-1?(2*i+2):2*i+1);

        const lesser=(this.elements[childleft].cost>this.elements[childright].cost?childright:childleft);

        if(this.elements[i].cost>this.elements[lesser].cost){
          this.swap(i,lesser);
          this.downHeapify(lesser);
        }
    }
    isEmpty(){
        return this.length===0;
    }
    swap(x,y){
        [this.elements[x],this.elements[y]]=[this.elements[y],this.elements[x]];
    }
}

var visitedCell = [];
var pathtoanimate = [];

function ConvergentGreedy(row, col, matrix, source_cordinate, target_cordinate) {
  const pq = new PriorityQueue();
  const visited = new Set();
  const childparent = new Map();

  pathtoanimate = [];
  visitedCell = [];

  pq.push({ cordinate: source_cordinate, cost:  Math.abs(target_cordinate.x-source_cordinate.x)+Math.abs(target_cordinate.y-source_cordinate.y)});

//   visited.add(`${source_cordinate.x}-${source_cordinate.y}`);

  while (!pq.isEmpty()) {

    const { cordinate: current, cost: distanceSoFar } = pq.pop();

    visited.add(`${current.x}-${current.y}`);

    visitedCell.push(matrix[current.x][current.y]);

    // finding the target
    if (current.x === target_cordinate.x && current.y === target_cordinate.y) {
      getPath(childparent, target_cordinate, matrix);
      return;
    }

    const neighbours = [
      { x: current.x + 1, y: current.y },
      { x: current.x, y: current.y - 1 },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 }
    ];

// const tempPQ=new PriorityQueue();

//     for (const neighbour of neighbours) {
//       const nx = neighbour.x;
//       const ny = neighbour.y;
//       const key=`${nx}-${ny}`;

//       if (isValid(nx, ny) && !visited.has(key) && !matrix[nx][ny].classList.contains('wall')) {

//         tempPQ.push({cordinate: neighbour,cost:Math.abs(nx-target_cordinate.x)+Math.abs(ny-target_cordinate.y)});
//       }
//     }

//     const aftercurrent=tempPQ.pop();

//     pq.push(aftercurrent);

//     const key=`${aftercurrent.cordinate.x}-${aftercurrent.cordinate.y}`;

//     visited.add(key);

//     childparent.set(key, current);



for (const neighbour of neighbours) {
    const nx = neighbour.x;
    const ny = neighbour.y;
    const key = `${nx}-${ny}`;

    if (isValid(nx, ny) && !visited.has(key) && !matrix[nx][ny].classList.contains('wall')) {
        pq.push({ cordinate: neighbour, cost: Math.abs(nx - target_cordinate.x) + Math.abs(ny - target_cordinate.y) });
        visited.add(key);
        childparent.set(key, current);
    }
}

  }

  function isValid(nx, ny) {
    return (nx >= 0 && nx < row && ny >= 0 && ny < col);
  }
}

function getPath(childparent, target, matrix) {
  if (!target) return;
  pathtoanimate.push(matrix[target.x][target.y]);
  const parent = childparent.get(`${target.x}-${target.y}`);
  getPath(childparent, parent, matrix);
}


function animate(elements, className, delay,renderState) {
    
    if(renderState.isrendered===true){


        for (let i = 0; i < elements.length; i++) {
           
              elements[i].classList.add('renderedvisited');
              if (i === elements.length - 1 && elements[i].classList.contains('target')) {
                for (let j = pathtoanimate.length - 1; j >= 0; j--) {
                    pathtoanimate[j].classList.remove('renderedvisited');
                    pathtoanimate[j].classList.add('renderedpath');

                    if(j===0){
                      renderState.isrendering=false;
                    }
                }
              }
          }
    }
  else{


    for (let i = 0; i < elements.length; i++) {
        setTimeout(() => {
          elements[i].classList.remove('visited');
          elements[i].classList.add(className);
          if (i === elements.length - 1 
            && className === 'visited'
          ) {
            // animate(pathtoanimate,'path');
            delay = 25;

            for (let j = pathtoanimate.length - 1; j >= -1; j--) {

              setTimeout(() => {

                if(j===0 || j===-1){ 

                  renderState.isrendered=true;
                  console.log("rohit checking 1155 pm ", renderState.isrendered);
                  renderState.visualizebuttonactive=true;
                  renderState.isrendering=false;

                 }
                 if(j===-1) return;

                pathtoanimate[j].classList.remove('visited');
                pathtoanimate[j].classList.add('path');

                // this is the new line at 3:20 am
              }, (Math.max(0,pathtoanimate.length - 1 - j)) * delay);
            }
          }
        }, delay * i);
      }

  }
}

function renderConvergentGreedy({ row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState }) {
  visitedCell = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      Matrix[i][j].classList.remove('path');
      Matrix[i][j].classList.remove('visited');
      Matrix[i][j].classList.remove('renderedpath');
      Matrix[i][j].classList.remove('renderedvisited');
      Matrix[i][j].innerText = '';

    }
  }
  ConvergentGreedy(row, col, Matrix, sourcecoordinate, targetcoordinate);
  animate(visitedCell, 'visited', delay,renderState);

}

export default renderConvergentGreedy;
