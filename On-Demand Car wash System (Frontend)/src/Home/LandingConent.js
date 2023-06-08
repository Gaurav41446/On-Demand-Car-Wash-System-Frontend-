import React from 'react'

import '../CSS/style.css';
import MainNavbar from './MainNavbar';
import Navcontent from './Navcontent';


const LandingContent=()=>
{
    return (
        <div id="main">

                <MainNavbar/>
            
               <Navcontent/>

        </div>
    )
}

export default LandingContent;