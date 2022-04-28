import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import '../styles/MainScreen.css'
import studentIcon from '../styles/img/studentIcon.png'
import teacherIcon from '../styles/img/teacherIcon.png'

function Nav() {
    return(

        <div className='background'>
            <section>
                <div style={{display:'grid', placeItems: 'center'}}>
                    <div className='caption'>
                        <p className='Pcaption' >
                            Metóda ikonicko-textovej výuky
                        </p>
                    </div>
                </div>
                <div style={{display:'grid', placeItems: 'center'}}>
                <div className='bublesPosition' >
                    
                    <div className='bubles'>
                    <Link to='/studentlogin' style={{textDecoration: 'none'}}>
                        <div style={{display:'grid', placeItems: 'center', padding: "1.5em"}}>
                            
                            <img className='icon' src={studentIcon}/>
                            
                            <p className='bublesCaption'>
                                Študent
                            </p>
                        </div>
                    </Link>
                    </div>

                    <p className='continue'>
                        Pokračovať ďalej ako...
                    </p>

                    <div className='bubles'>
                    <Link to='/teacherlogin' style={{textDecoration: 'none'}}>
                        <div style={{display:'grid', placeItems: 'center', padding: "1.5em"}}>
                            
                            <img className='icon' src={teacherIcon}/>
                            
                            <p className='bublesCaption'>
                                Učiteľ
                            </p>
                        </div>
                    </Link>
                    </div>
                </div>
                </div>
                <Outlet/>
                
            </section>
        </div>

    );
}

export default Nav;