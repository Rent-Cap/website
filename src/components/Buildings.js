import React from 'react'
import Building from './Building'

const buildingTypes = [
    {
        title: 'Apartment',
        description: 'Your building has multiple units that are all rented. No one owns their units in this building. '
    },
    {
        title: 'Duplex',
        description: 'Your building has exactly 2 separate units in it. '
    },
    {
        title: 'Single Family',
        description: 'Your building has one living space in it that you rent. '
    },
    {
        title: 'Condo',
        description: 'Your building has multiple units that have been bought by individual owners. Some may be owned, but you rent your unit. '
    },
    {
        title: 'Dormitory',
        description: 'You are a student living in housing that is owned and managed by a school or university.'
    },
    {
        title: 'Public Housing',
        description: 'You live in housing that is owned or managed by your local goverment. This also include Below Market Rate (BMR) housing.'
    },
]

const Buildings = () => {
    const listItems = buildingTypes.map(type => {
        return <Building key={type.title} title={type.title} description={type.description}></Building>
    })
    return (
        <ul class="buildings-list">{listItems}</ul>
    )
}
export default Buildings