import React, { useEffect, useState } from "react";


function Tweet(){
    useEffect( () => {
        fetchItems();
    }, []);

    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        const data = await fetch('/tweets');
        const items = await data.json();
        setItems(items);
    };
    return (
        <section>
            
            {
                items.map(item => (
                    <div>
                        <p>
                            {item.Meno}
                        </p>
                        <p>
                            {item.Heslo}
                        </p>
                       
                    </div>
                    
                ))
            }
        </section>
    );
}

export default Tweet;