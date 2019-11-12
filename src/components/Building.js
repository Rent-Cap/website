import React from 'react'

const Building = props => (
    <li class="building-card">
        <div></div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
    </li>
)

export default Building