var visitedCell;
var pathtoanimate;
var visited;

function DFS(row, col, matrix, current, target_cordinate) {

    visited.add(`${current.x}-${current.y}`);
    visitedCell.push(matrix[current.x][current.y]);

    if(current.x===target_cordinate.x && current.y===target_cordinate.y)return true;

    const neighbours = [
        { x: current.x - 1, y: current.y },
        { x: current.x, y: current.y + 1 },
        { x: current.x + 1, y: current.y },
        { x: current.x, y: current.y - 1 }
      ];
  
      for (const neighbour of neighbours) {

        const key = `${neighbour.x}-${neighbour.y}`;

        const nx = neighbour.x;
        const ny = neighbour.y;

        if (isValid(nx, ny,row,col) && !visited.has(key) && !matrix[nx][ny].classList.contains('wall')) {
        if(DFS(row, col, matrix, neighbour, target_cordinate))
            {pathtoanimate.push(matrix[neighbour.x][neighbour.y]);
                return true;
            }
        }
      }

      return false;
}

function isValid(nx, ny,row,col) {
    return (nx >= 0 && nx < row && ny >= 0 && ny < col);
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

function renderDFS({ row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState }) {
     visitedCell = [];
    pathtoanimate = [];
    visited=new Set();

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      Matrix[i][j].classList.remove('path');
      Matrix[i][j].classList.remove('visited');
      Matrix[i][j].classList.remove('renderedpath');
      Matrix[i][j].classList.remove('renderedvisited');
      Matrix[i][j].innerText = '';
    }
  }
  DFS(row, col, Matrix, sourcecoordinate, targetcoordinate);
  animate(visitedCell, 'visited', delay,renderState);

}

export default renderDFS;
