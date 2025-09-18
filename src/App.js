import './App.css';
import { useEffect} from 'react';
import Navbar from './components/navbar/Navbar';
import Guidebar from './components/guidebar/Guidebar';
import Gridbox from './components/gridbox/Gridbox';
import generateMaze from './components/algorithms/mazegeneration';
import renderBFS from './components/algorithms/BFS';
import renderDijkstra from './components/algorithms/DijkstraAlgorithm';
import renderConvergentGreedy from './components/algorithms/ConvergentGreedy';
import renderAStar from './components/algorithms/Astar';
import renderDFS from './components/algorithms/DFS';
import swal from 'sweetalert';

var row;
var col;
var cells;
var Matrix;
var sourcecoordinate;
var targetcoordinate;
var delay = 7;

var Statemanagement={
  row:null,
  col:null,
  cells:null,
  Matrix:null,
  sourcecoordinate:null,
  targetcoordinate:null,
  delay:7,
 curpixel:40,
curspeed:1,
curAlgorithm:0
}

var renderState = { 
  isrendered: false, 
  isrendering:false
 };
function renderBoard(cellwidth = 40) {
  renderState.isrendered=false;
  const board = document.getElementById('board');
  board.innerHTML = "";
  const root = document.documentElement; // note this step, this is for changing the css
  root.style.setProperty('--cell-width', `${cellwidth}px`);
  row = Math.floor(board.clientHeight / cellwidth);
  col = Math.floor(board.clientWidth / cellwidth);
  cells = [];
  Matrix = [];
  for (let i = 0; i < row; i++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');
    rowElement.setAttribute('id', `${i}`);
    let rowmat = [];
    for (let j = 0; j < col; j++) {
      const colElement = document.createElement('div');
      colElement.classList.add('col');
      colElement.setAttribute('id', `${i}-${j}`);
      cells.push(colElement);
      rowmat.push(colElement);
      rowElement.appendChild(colElement);
    }
    Matrix.push(rowmat);
    board.appendChild(rowElement);
  }

  // adding board interaction
  function isValid(x, y) {
    return (x >= 0 && y >= 0 && x < row && y < col);
  }

  function set(classname, x = -1, y = -1) {
    if (isValid(x, y)) {
      Matrix[x][y].classList.add(classname);
    } else {
      x = Math.floor(Math.random() * row);
      y = Math.floor(Math.random() * col);
      Matrix[x][y].classList.add(classname);
    }
    return { x, y };
  }

  sourcecoordinate = set('source');
  targetcoordinate = set('target');

  let Dragpoint = null;
  let isDrawing = false;
  let isDragging = false;
  let rightclick=false;
  let prevSource={...sourcecoordinate};
  let prevtarget={...targetcoordinate};

// to make sure while draggin there is not multiple renders

  let prevhoveringcoordinate={x:-1,y:-1};

  cells.forEach(cell => {
    
    // dragging the source and the destination
    const pointerdown = (e) => {
      if(!renderState.isrendering){
        if(e.button===2){
          rightclick=true;
        }
        if (e.target.classList.contains('source')) {
          isDragging = true;
          Dragpoint = 'source';
        } else if (e.target.classList.contains('target')) {
          isDragging = true;
          Dragpoint = 'target';
        } else {
          isDrawing = true;
          if (e.target.classList.contains('wall')) e.target.classList.remove('wall');
          else {
            e.target.classList.add('wall');
          }
        }
      }
    }
    
    const pointermove = (e) => {
      if (isDrawing) {

        if(rightclick===true){
          if (!e.target.classList.contains(`source`) && !e.target.classList.contains(`target`)) {
            e.target.classList.remove('wall');
          }
        }
        else if (!e.target.classList.contains(`source`) && !e.target.classList.contains(`target`)) {
          e.target.classList.add('wall');
        }

      } else if (isDragging) {



        cells.forEach(cell => {
          cell.classList.remove(`${Dragpoint}`);
        });

        e.target.classList.add(`${Dragpoint}`);

        if (Dragpoint === 'source' 
        // && !e.target.classList.contains('wall')
      ) {
          sourcecoordinate.x = +e.target.id.split('-')[0];
          sourcecoordinate.y = +e.target.id.split('-')[1];
        } else if(Dragpoint === 'target' 
        // && !e.target.classList.contains('wall')
      ){
          targetcoordinate.x = +e.target.id.split('-')[0];
          targetcoordinate.y = +e.target.id.split('-')[1];
        }

let currhoveringcoordinate={x:+e.target.id.split('-')[0],y:+e.target.id.split('-')[1]};

        if(!(prevhoveringcoordinate.x===currhoveringcoordinate.x && prevhoveringcoordinate.y===currhoveringcoordinate.y) && renderState.isrendered){

          const vbtext=document.querySelector('.btn').innerText;
console.log(vbtext);
          if(vbtext!=`Dijkstra's algorithm`){
            for(let i=0; i<row; i++){
              for(let j=0; j<col; j++){
                Matrix[i][j].innerText='';
              }
            }
          }
    
          switch(vbtext){
    
            case `Dijkstra's algorithm`: 
            renderDijkstra({ 
              row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
             });
        break;
        
             case 'Greedy Search':
             renderConvergentGreedy({ 
               row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
              });
        break;
             case 'DFS':
             renderDFS({ 
               row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
              });
        break;
             case 'BFS':
             renderBFS({ 
               row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
              });
        break;
             case 'A* Algorithm':
             renderAStar({ 
               row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
              });
        break;
          }
        }
        prevhoveringcoordinate={...currhoveringcoordinate}

      }
    }
    const pointerup = (e) => {

      if(((e.target.classList.contains('target')||e.target.classList.contains('source')) && e.target.classList.contains('wall'))||(e.target.classList.contains('target')&&e.target.classList.contains('source'))){
        
        swal("","(1).Target/Source can't be placed on wall\n(2).Source and Target can't be placed on the same cell","warning");
////////////////
        Matrix[sourcecoordinate.x][sourcecoordinate.y].classList.remove('source');
        Matrix[targetcoordinate.x][targetcoordinate.y].classList.remove('target');
        Matrix[prevSource.x][prevSource.y].classList.add('source');
        Matrix[prevtarget.x][prevtarget.y].classList.add('target');
/////////////////////////////////

        console.log(sourcecoordinate);
        console.log(targetcoordinate);
        console.log(prevSource);
        console.log(prevtarget);
        sourcecoordinate={...prevSource};
        targetcoordinate={...prevtarget};
      }
      if (renderState.isrendered === true 
        // && (e.target.classList.contains('source') || e.target.classList.contains('target'))
      ) {


      const vbtext=document.querySelector('.btn').innerText;

      if(vbtext!=`Dijkstra's algorithm`){
        for(let i=0; i<row; i++){
          for(let j=0; j<col; j++){
            Matrix[i][j].innerText='';
          }
        }
      }

      switch(vbtext){

        case `Dijkstra's algorithm`: 
        renderDijkstra({ 
          row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
         });
    break;
    
         case 'Greedy Search':
         renderConvergentGreedy({ 
           row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
          });
    break;
         case 'DFS':
         renderDFS({ 
           row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
          });
    break;
         case 'BFS':
         renderBFS({ 
           row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
          });
    break;
         case 'A* Algorithm':
         renderAStar({ 
           row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
          });
    break;
      }

        

      }
      prevSource={...sourcecoordinate};
      prevtarget={...targetcoordinate};
      Statemanagement.sourcecoordinate=sourcecoordinate;
      Statemanagement.targetcoordinate=targetcoordinate;

      isDragging = false;
      isDrawing = false;
      Dragpoint = null;
      rightclick=false;
    }

    cell.addEventListener('pointerdown', pointerdown);
    cell.addEventListener('pointermove', pointermove);
    cell.addEventListener('pointerup', pointerup);
  });



  Statemanagement.row=row;
  Statemanagement.col=col;
  Statemanagement.cells=cells;
  Statemanagement.Matrix=Matrix;
  Statemanagement.sourcecoordinate=sourcecoordinate;
  Statemanagement.targetcoordinate=targetcoordinate;
  Statemanagement.delay=delay;

};

function restofthing() {
  console.log(Matrix);
  const clearPathBoardGeneratemaze = document.querySelectorAll('.nav-menu>li>a');

  clearPathBoardGeneratemaze.forEach(a => {
    console.log(a.innerText);
    let Text = a.innerText;
    let li = a.parentElement;
    if (Text === 'Clear Path' || Text === 'Clear Board' || Text === 'Generate Maze') li.addEventListener('click', () => {



    if (Text === 'Clear Path') {

if(!renderState.isrendering){

renderState.isrendering=true;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      Matrix[i][j].classList.remove('path');
      Matrix[i][j].classList.remove('visited');
      Matrix[i][j].classList.remove('renderedpath');
      Matrix[i][j].classList.remove('renderedvisited');
      Matrix[i][j].innerText='';
    }
  }
renderState.isrendering=false;
renderState.isrendered=false;
}

      }
      if (Text === 'Clear Board') {

      if(!renderState.isrendering){
        const visualizeBtn=document.querySelector('.btn');
        visualizeBtn.innerText='Visualize';
        renderState.isrendering=true;
        renderBoard(Statemanagement.curpixel);      
        renderState.isrendering=false;
        renderState.isrendered=false;
// this is for making the algorithm dropoption consistency
        const dropOptions=document.querySelectorAll('.drop-menu>li>a');

        dropOptions.forEach(dropOption=>{
          const li=dropOption.parentElement;
    
          const dropOption_pEpEpE=dropOption.parentElement.parentElement.parentElement;
          const navOptionText=dropOption_pEpEpE.firstChild.innerText;

          if(navOptionText==='Algorithms'){
              li.classList.remove('active');
          }
      });

////////////////////////////////////////////////////////////////
      }

      }

      if (Text === 'Generate Maze' && !renderState.isrendering) {

        // renderState.isrendering=true;

        for (let i = 0; i < row; i++) {
          for (let j = 0; j < col; j++) {
            Matrix[i][j].classList.remove('path');
            Matrix[i][j].classList.remove('visited');
            Matrix[i][j].classList.remove('renderedpath');
            Matrix[i][j].classList.remove('renderedvisited');
          }
        }

        let remWal = document.querySelectorAll('.wall');
        remWal.forEach(x => {
          x.classList.remove('wall');
        })
        

        generateMaze(false, 0, row - 1, 0, col - 1, Matrix, row, col, (row < col) ? 'vertical' : 'horizontal');
  
        // renderState.isrendered=false;

        console.log("appjs ka function");
          
      }
    });

  })

  const speedcontrol = document.querySelectorAll('.drop-menu>li>a');

  speedcontrol.forEach(x => {
    let li = x.parentElement;
    let text = x.innerText;
    if (text === 'Slow' && !renderState.isrendering) {
      li.addEventListener('click', () => {
        delay = 15;
        console.log(delay);
      });
    }
    if (text === 'Fast' && !renderState.isrendering) {
      li.addEventListener('click', () => {
        delay = 2;
        console.log(delay);
      });
    }
    if (text === 'Normal' && !renderState.isrendering) {
      li.addEventListener('click', () => {
        delay = 7;
        console.log(delay);
      });
    }
  });

  const visualizeBtn = document.querySelector('.btn');

visualizeBtn.addEventListener('click', () => {

// if(clearboardDelaytoggle_isactive===true){
if(!renderState.isrendering){
  const vbtext=visualizeBtn.innerText;
  switch(vbtext){
    case 'Visualize':visualizeBtn.innerText='Select an Algorithm to Visualize';
break;

    case `Dijkstra's algorithm`: renderState.isrendered=false;
    renderState.isrendering=true;
  
    renderDijkstra({ 
      row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
     });
break;

     case 'Greedy Search':renderState.isrendered=false;
     renderState.isrendering=true;
   
     renderConvergentGreedy({ 
       row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
      });
break;
     case 'DFS':renderState.isrendered=false;
     renderState.isrendering=true;
   
     renderDFS({ 
       row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
      });
break;
     case 'BFS':renderState.isrendered=false;
     renderState.isrendering=true;
   
     renderBFS({ 
       row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
      });
break;
     case 'A* Algorithm':renderState.isrendered=false;
     renderState.isrendering=true;
   
     renderAStar({ 
       row, col, Matrix, sourcecoordinate, targetcoordinate, delay, renderState
      });
break;
  }

  


  console.log(renderState.isrendered);

}


//     clearboardDelaytoggle_isactive=false;
//     setTimeout(()=>{
//       clearboardDelaytoggle_isactive=true;
//     },1000);
// };
    
  });

}

function App() {
  useEffect(() => {
    restofthing();
  }, []);

  return (
    <div className="template">
      <div>
        <Navbar renderBoard={renderBoard} renderState={renderState} Statemanagement={Statemanagement} />
        <Guidebar />
      </div>
      <Gridbox renderBoard={renderBoard} />
    </div>
  );
}

export default App;