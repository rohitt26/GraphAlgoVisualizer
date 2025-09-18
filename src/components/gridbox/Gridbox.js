import React, { useEffect } from 'react';
import './Gridbox.css'
function Gridbox(props) {
    useEffect(() => {
     props.renderBoard();
    }, []);
    return (
        <div id='board' className='grid-box'></div>
    );
}

export default Gridbox;
