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
var distance;
function Dijkstra(row, col, matrix, source_cordinate, target_cordinate) {

  const pq = new PriorityQueue();
  const childparent = new Map();
  distance=[];

  ///////////////////////////////
  for(let i=0; i<row; i++){
    const INF=[];
    for(let j=0; j<col;j++){
        INF.push(Infinity);
    }
    distance.push(INF);
  }
  /////////////////////////

  distance[source_cordinate.x][source_cordinate.y]=0;

  pq.push({ cordinate: source_cordinate, cost: 0 });


  pathtoanimate = [];
  visitedCell = [];
  
  while (!pq.isEmpty()) {

    const { cordinate: current, cost: distanceSoFar } = pq.pop();
    // coordinate current me assign ho jaega 

    visitedCell.push(matrix[current.x][current.y]);
    // finding the target

    // if (current.x === target_cordinate.x && current.y === target_cordinate.y) {
    //   getPath(childparent, target_cordinate, matrix);
    //   return;
    // }

    const neighbours = [
      { x: current.x + 1, y: current.y },
      { x: current.x - 1, y: current.y },
      { x: current.x, y: current.y + 1 },
      { x: current.x, y: current.y - 1 }
    ];

    for (const neighbour of neighbours) {
      const key = `${neighbour.x}-${neighbour.y}`;
      const nx = neighbour.x;
      const ny = neighbour.y;

      if (isValid(nx, ny) && !matrix[nx][ny].classList.contains('wall')) {

        const edgeWeight=1;
        const distanceToNeighbour=distanceSoFar+edgeWeight;

        if (distanceToNeighbour < distance[neighbour.x][neighbour.y]) {
            distance[neighbour.x][neighbour.y] = distanceToNeighbour;
            pq.push({ cordinate: neighbour, cost: distanceToNeighbour });
            childparent.set(key, current);
        }

      }
    }
  }

  getPath(childparent, target_cordinate, matrix);

  console.log(pathtoanimate);

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



function animate(elements, className, delay,renderState,matrix,row,col) {
    
    if(renderState.isrendered===true){


        for (let i = 0; i < elements.length; i++) {

           
              elements[i].classList.add('renderedvisited');

              if (i === elements.length - 1) {

                for (let j = pathtoanimate.length - 1; j >= 0; j--) {
                    pathtoanimate[j].classList.remove('renderedvisited');
                    pathtoanimate[j].classList.add('renderedpath');
                    // pathtoanimate[j].innerText=pathtoanimate.length-j-1;

                    if(j===0){
                      renderState.isrendering=false;
                    }

                }


              }


              if(i===elements.length-1){
                for (let k = 0; k < row; k++) {
                  for (let l = 0; l < col; l++) {
  
                      if(!matrix[k][l].classList.contains('wall')){
                        matrix[k][l].innerText=distance[k][l];
                        if(distance[k][l]===Infinity){
                          matrix[k][l].innerText='~';
                        }
                        if(matrix[k][l].classList.contains('target')||
                          matrix[k][l].classList.contains('source')
                        ){matrix[k][l].innerText='';}
                      }
                  }
                }
              }



              // elements[i].innerText=i;
          }
    }
  else{

    // let targetpresent=false;

    for (let i = 0; i < elements.length; i++) {

      // if(elements[i].classList.contains('target'))targetpresent=true;

        setTimeout(() => {

          elements[i].classList.remove('visited');

          elements[i].classList.add(className);

          if (i === elements.length - 1) {

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

                 ////////////////////////////              

                 //////////////////////////////


                 if(j===-1) return;

                pathtoanimate[j].classList.remove('visited');
                pathtoanimate[j].classList.add('path');
                // pathtoanimate[j].innerText=pathtoanimate.length-j-1;


                // this is the new line at 3:20 am
              }, (Math.max(0,pathtoanimate.length - 1 - j)) * delay);
            }

            if(i===elements.length-1){
              for (let k = 0; k < row; k++) {
                for (let l = 0; l < col; l++) {

                    if(!matrix[k][l].classList.contains('wall')){
                      matrix[k][l].innerText=distance[k][l];
                      if(distance[k][l]===Infinity){
                        matrix[k][l].innerText='~';
                      }
                      if(matrix[k][l].classList.contains('target')||
                        matrix[k][l].classList.contains('source')
                      ){matrix[k][l].innerText='';}
                    }
                }
              }
            }


          }

          // elements[i].innerText=i;

        }, delay * i);
      }

  }
}

function renderDijkstra({ row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState }) {
  visitedCell = [];
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      Matrix[i][j].classList.remove('path');
      Matrix[i][j].classList.remove('visited');
      Matrix[i][j].classList.remove('renderedpath');
      Matrix[i][j].classList.remove('renderedvisited');
      Matrix[i][j].innerText='';
    }
  }

  Dijkstra(row, col, Matrix, sourcecoordinate, targetcoordinate);



  animate(visitedCell, 'visited', delay,renderState,Matrix,row,col);

}

export default renderDijkstra;
