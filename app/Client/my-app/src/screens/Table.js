import React, { useEffect, useState } from "react";
import '../styles/Table.css'
import {Table} from 'react-bootstrap'


function Tables(props){

   console.log(props.tableSolution)
   let counter =0
   const tableColums = props.tableSolution.rows.map((item) =>{
       const date = new Date(item.datum_odovzdania)
    counter += 1
    return(
        <tr style={{textAlign: "center"}}>
            <td>{counter}</td>
            <td>{item.meno_studenta}</td>
            <td>{date.getDate()}.{date.getMonth()+1}.{date.getFullYear()}</td>
            <td>{item.cas_riesenia}</td>
            <td>{item.pocet_spravnych_odpovedi}%</td>
        </tr>
    )

   })

    return (
           <Table className="table" striped bordered hover variant="dark">
                <thead>
                    <tr style={{textAlign: "center"}}>
                    <th></th>
                    <th>Meno študenta</th>
                    <th>Dátum odovzdania</th>
                    <th>Čas riešenia</th>
                    <th>Percentuálna úspešnosť</th>
                    </tr>
                </thead>
                <tbody>
                    {tableColums}
                </tbody>
            </Table>
    );
}

export default Tables;