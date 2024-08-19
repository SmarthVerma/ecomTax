import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

export function Crousal2({ images }) {

    return (
        <Carousel>
            {
                images.map((img, i) => <Item key={i} image={img.url} />)
            }
        </Carousel>
    )
}

function Item({ image }) {
    return (
        <Paper>
            <div className="flex overflow-clip max-w-lg w-full items-center justify-center p-3">
                <img className='w-full aspect-square object-cover' src={image} alt='' />
            </div>
        </Paper>
    )
}