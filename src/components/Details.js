import React from 'react'
import { useParams } from 'react-router-dom'
import Header from './Header'
export default function Details(){

    const{id} = useParams()

    return (
        <di>
            Product Details {id}
        </di>
    )
}