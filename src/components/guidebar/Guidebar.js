import React from 'react'
import './Guidebar.css'
function app(){
    return (
       <>
        <div className='guide-bar'>
            <div className='guidenav'>
                <div className='guidesource'></div>
                <div>Start Node</div>
            </div>
            <div className='guidenav'>
                <div className='guidetarget'></div>
                <div>Target Node</div>
            </div>
            <div className='guidenav'>
                <div className='guideunvisited'></div>
                <div>Unvisited</div>
            </div>
            <div className='guidenav'>
                <div className='guidevisited'></div>
                <div>Visited</div>
            </div>
            <div className='guidenav'>
                <div className='guidewall'></div>
                <div>Wall</div>
            </div>
            <div className='guidenav'>
                <div className='guidepath'></div>
                <div>Path</div>
            </div>
        </div>
       </>
    );
}
export default app;