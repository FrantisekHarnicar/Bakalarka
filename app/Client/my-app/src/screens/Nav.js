import React from 'react';
import {Link, Outlet} from 'react-router-dom';

function Nav() {
    return(
        <section>
            <div>
                <p>
                    Metóda ikonicko-textovej výuky
                </p>
            </div>
            <div>
                <p>
                    Pokračovať ďalej ako...
                </p>
            </div>
            <div >
                <Link to='/teacherlogin' >Učiteľ</Link>
                <Link to='/studentlogin' >Študent</Link>
            </div>
            <Outlet/>
        </section>
    );
}

export default Nav;