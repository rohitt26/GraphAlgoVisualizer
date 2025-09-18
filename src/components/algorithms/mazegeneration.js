function mazeGeneration(surrounding,rs,re,cs,ce,matrix,row,col,orientation){
    if(rs>re || cs>ce)return;
setTimeout(()=>{

    for(let i=0; i<row; i++){
        for(let j=0; j<col; j++){
            matrix[i][j].classList.remove('path');
            matrix[i][j].classList.remove('visited');
            matrix[i][j].innerText='';
        }
    }
    if(!surrounding){
        for(let i=0; i<row; i++){
            if(!matrix[i][0].classList.contains('target') && !matrix[i][0].classList.contains('source'))matrix[i][0].classList.add('wall');

           if(!matrix[i][col-1].classList.contains('target') && !matrix[i][col-1].classList.contains('source')) matrix[i][col-1].classList.add('wall');
        }
        for(let i=0; i<col; i++){
            if(!matrix[0][i].classList.contains('target') && !matrix[0][i].classList.contains('source'))
            matrix[0][i].classList.add('wall');

            if(!matrix[row-1][i].classList.contains('target') && !matrix[row-1][i].classList.contains('source'))matrix[row-1][i].classList.add('wall');
        }
        rs+=2; re-=2;
        cs+=2; ce-=2;

        surrounding=true;
    };

    if(orientation==='horizontal'){
        // add a horizontal line
        let possiblerow=[];
        let possiblecol=[];

        for(let i=rs; i<=re; i+=2){
            possiblerow.push(i);
        }
        for(let i=cs-1; i<=ce+1; i+=2){
            possiblecol.push(i);
        }
       let rowselect = possiblerow[Math.floor(Math.random() * possiblerow.length)];
 let colselect = possiblecol[Math.floor(Math.random() * possiblecol.length)];

        for(let i=cs-1; i<=ce+1; i++){
            // console.log(rowselect);
            const cell=matrix[rowselect][i];
            if(i!=colselect && !cell.classList.contains('target') && !cell.classList.contains('source')){cell.classList.add('wall');}

            // cell.classList.add('wall');
        }
// lower division
        mazeGeneration(surrounding,rowselect+2,re,cs,ce,matrix,row,col,(re-(rowselect+2)<ce-cs)?'vertical':'horizontal');
// upper division
        mazeGeneration(surrounding,rs,rowselect-2,cs,ce,matrix,row,col,(rowselect-2-rs<ce-cs)?'vertical':'horizontal');
    }else{
        // add a vertical line
        let possiblerow=[];
        let possiblecol=[];

        for(let i=rs-1; i<=re+1; i+=2){
            possiblerow.push(i);
        }
        for(let i=cs; i<=ce; i+=2){
            possiblecol.push(i);
        }
        let rowselect = possiblerow[Math.floor(Math.random() * possiblerow.length)];
        let colselect = possiblecol[Math.floor(Math.random() * possiblecol.length)];
        
        for(let i=rs-1; i<=re+1; i++){
            const cell=matrix[i][colselect];
            if(i!=rowselect && !cell.classList.contains('target') && !cell.classList.contains('source')){cell.classList.add('wall');}
        }
// left division
        mazeGeneration(surrounding,rs,re,cs,colselect-2,matrix,row,col,(re-rs<colselect-2-cs)?'vertical':'horizontal');
// right division
        mazeGeneration(surrounding,rs,re,colselect+2,ce,matrix,row,col,(re-rs<ce-colselect-2)?'vertical':'horizontal');
    }

},1)

};
export default mazeGeneration;