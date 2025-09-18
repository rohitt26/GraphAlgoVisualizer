import React, { useEffect } from 'react';
import './Navbar.css';
import renderBFS from '../algorithms/BFS';
import renderDijkstra from '../algorithms/DijkstraAlgorithm';
import renderConvergentGreedy from '../algorithms/ConvergentGreedy';
import renderAStar from '../algorithms/Astar';
import renderDFS from '../algorithms/DFS';

function Navbar(props) {
    useEffect(() => {

        const visualizebtn=document.querySelector('.btn');
        const navOptions = document.querySelectorAll('.nav-menu > li > a');
        // navOptions is a object contains lots of <a>
        navOptions.forEach(navOption => {
            // adding event listener to <a>
            navOption.addEventListener('click', () => {
                const li=navOption.parentElement;
                

                if(navOption.innerText==='Clear Path' || navOption.innerText==='Clear Board'||navOption.innerText==='Generate Maze'){
                    togglenavOptions(); 

                }
                else{

                    if(li.classList.contains('active')){
                        li.classList.remove('active');
                    }
                    else{
                        togglenavOptions(); 
                        li.classList.add('active');
                    }


                }




                // if(li.classList.contains('active')){
                //     li.classList.remove('active');
                // }
                // else{
                //     togglenavOptions(); 
                //     li.classList.add('active');
                // }
            });

        function togglenavOptions(){
            const togglenavoptions=document.querySelectorAll('.nav-menu > li');
            togglenavoptions.forEach(togglenavoption=>{
                togglenavoption.classList.remove('active');
            })
        }
        });
/////////////////////////////////////////
        function dropOptionstoggle(){
            const dropOptions=document.querySelectorAll('.drop-menu > li > a');
        dropOptions.forEach(dropOption=>{
            const li=dropOption.parentElement;
            li.classList.remove('active');
        });
        };

        const dropOptions=document.querySelectorAll('.drop-menu > li > a');
        dropOptions.forEach(dropOption=>{

            const li=dropOption.parentElement;
 
            dropOption.addEventListener('click',()=>{


                li.classList.add('active');

                const dropOption_pEpEpE=dropOption.parentElement.parentElement.parentElement;
                
                const navOptionText=dropOption_pEpEpE.firstChild.innerText;

                if(navOptionText==='Pixel')
                    // render the board here
                    {
                        if(!props.renderState.isrendering){
                            props.Statemanagement.curpixel=integerconverter(li.innerText); props.renderBoard(props.Statemanagement.curpixel);
                        }
                    }

                if(navOptionText==='Speed' && !props.renderState.isrendering)props.Statemanagement.curspeed=integerconverter(li.innerText);

                if(navOptionText==='Algorithms' && !props.renderState.isrendering){props.Statemanagement.curAlgorithm=integerconverter(li.innerText);
                    visualizebtn.innerText=li.innerText;


                    if(props.renderState.isrendered){

                        switch(visualizebtn.innerText){

                            case `Dijkstra's algorithm`: 
                            renderDijkstra({ 
                              row:props.Statemanagement.row, col:props.Statemanagement.col, Matrix:props.Statemanagement.Matrix, sourcecoordinate:props.Statemanagement.sourcecoordinate, targetcoordinate:props.Statemanagement.targetcoordinate, delay:props.Statemanagement.delay, renderState:props.renderState
                             });
                        break;
                        
                             case 'Greedy Search':
                             renderConvergentGreedy({ 
                                row:props.Statemanagement.row, col:props.Statemanagement.col, Matrix:props.Statemanagement.Matrix, sourcecoordinate:props.Statemanagement.sourcecoordinate, targetcoordinate:props.Statemanagement.targetcoordinate, delay:props.Statemanagement.delay, renderState:props.renderState                            });
                        break;
                             case 'DFS':
                             renderDFS({ 
                                row:props.Statemanagement.row, col:props.Statemanagement.col, Matrix:props.Statemanagement.Matrix, sourcecoordinate:props.Statemanagement.sourcecoordinate, targetcoordinate:props.Statemanagement.targetcoordinate, delay:props.Statemanagement.delay, renderState:props.renderState                           });
                        break;
                             case 'BFS':
                             renderBFS({ 
                                row:props.Statemanagement.row, col:props.Statemanagement.col, Matrix:props.Statemanagement.Matrix, sourcecoordinate:props.Statemanagement.sourcecoordinate, targetcoordinate:props.Statemanagement.targetcoordinate, delay:props.Statemanagement.delay, renderState:props.renderState                          });
                        break;
                             case 'A* Algorithm':
                             renderAStar({ 
                                row:props.Statemanagement.row, col:props.Statemanagement.col, Matrix:props.Statemanagement.Matrix, sourcecoordinate:props.Statemanagement.sourcecoordinate, targetcoordinate:props.Statemanagement.targetcoordinate, delay:props.Statemanagement.delay, renderState:props.renderState                             });
                        break;
                          }

                        
                    }

                }

                li.parentElement.parentElement.classList.remove('active');
                dropOptionstoggle();
                addactiveclasstoActive();
            });
        });


addactiveclasstoActive();

function addactiveclasstoActive(){
    dropOptions.forEach(dropOption=>{
        const li=dropOption.parentElement;

        const val=integerconverter(li.innerText);

        const dropOption_pEpEpE=dropOption.parentElement.parentElement.parentElement;

        const navOptionText=dropOption_pEpEpE.firstChild.innerText;



        if(navOptionText==='Pixel' && val===props.Statemanagement.curpixel){li.classList.add('active');}

        if(navOptionText==='Speed' && val===props.Statemanagement.curspeed){
            li.classList.add('active');
        }
        if(navOptionText==='Algorithms' && val===props.Statemanagement.curAlgorithm){
            li.classList.add('active');
        }
    });
}
        function integerconverter(liinnertext){
            // if(liinnertext==='14px')return 14;
            // if(liinnertext==='16px')return 16;
            // if(liinnertext==='18px')return 18;
            if(liinnertext==='50px')return 50;
            if(liinnertext==='40px')return 40;
            if(liinnertext==='30px')return 30;
            if(liinnertext==='25px')return 25;
            if(liinnertext==='Fast')return 3;
            if(liinnertext==='Normal')return 2;
            if(liinnertext==='Slow')return 1;
            if(liinnertext==='DFS')return 3;
            if(liinnertext==='BFS')return 4;
            if(liinnertext===`Dijkstra's algorithm`)return 1;
            if(liinnertext==='Greedy BFS')return 2;
            if(liinnertext==='A* Algorithm')return 5;
        }
//////////////////////////////////////////////////

document.addEventListener('click', (e) => {
    const navOptionParents = document.querySelectorAll('.nav-menu > li');
    if (e.target.tagName !== 'A') {
        navOptionParents.forEach(navOptionparent => {
            navOptionparent.classList.remove('active');
        });
    }
});


    }, []);

    return (
        <>
            <nav>
                <div className='logobtnalign'>
                <a href='./index.html' className='logo'><div>Graph Algorithms</div> <div>Visualizer</div></a>
                <div className='btn' id='visualize'>Visualize</div>
                </div>
                
                <div>
                <ul className='nav-menu'>
                    <li><a href='#'>Clear Path</a></li>
                    <li><a href='#'>Clear Board</a></li>
                    <li><a href='#'>Generate Maze</a></li>
                    <li className='drop-box'>
                        <a href='#'>Pixel <span className='caret'></span></a>
                        <ul className='drop-menu'>
                            {/* <li><a href='#'>14px</a></li>
                            <li><a href='#'>16px</a></li>
                            <li><a href='#'>18px</a></li> */}
                            <li><a href='#'>25px</a></li>
                            <li><a href='#'>30px</a></li>
                            <li><a href='#'>40px</a></li>
                            <li><a href='#'>50px</a></li>
                        </ul>
                    </li>
                    <li className='drop-box'>
                        <a href='#'>Speed <span className='caret'></span></a>
                        <ul className='drop-menu'>
                            <li><a href='#'>Slow</a></li>
                            <li><a href='#'>Normal</a></li>
                            <li><a href='#'>Fast</a></li>
                        </ul>
                    </li>
                    <li className='drop-box'>
                        <a href='#'>Algorithms <span className='caret'></span></a>
                        <ul className='drop-menu'>
                        <li><a href='#'>Dijkstra's algorithm</a></li>
                        <li><a href='#'>Greedy Search</a></li>
                        <li><a href='#'>DFS</a></li>
                            <li><a href='#'>BFS</a></li>
                            {/* <li><a href='#'>A* Algorithm</a></li> */}
                        </ul>
                    </li>
                </ul>
                </div>
                
            </nav>
        </>
    );
}

export default Navbar;