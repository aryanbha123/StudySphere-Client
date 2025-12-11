import React from 'react'
import { useParams } from 'react-router-dom'

export default function Attempt() {
    const {id} = useParams();
    console.log(id);
  return (
    <div>Attempt</div>
  )
}
