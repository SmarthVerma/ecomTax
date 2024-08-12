import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

export function Crousal2({ images }) {
    

    return (
        <Carousel>
            {
                images.map((img, i) => <Item key={i} image={img} />)
            }
        </Carousel>
    )
}

function Item({ image }) {
    return (
        <Paper>
            <div className="flex w-full aspect-square items-center justify-center p-6">
            <img src={image} alt='' />
            </div>
        </Paper>
    )
}