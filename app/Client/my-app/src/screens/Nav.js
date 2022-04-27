import React from 'react';
import {Link} from 'react-router-dom';

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
                <Link to='/teacher' >Učiteľ</Link>
                <Link to='/student' >Študent</Link>
            </div>
        </section>
    );
}

export default Nav;