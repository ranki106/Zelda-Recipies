
import { useState, useEffect } from 'react'
import { echoesRecipes } from '../data/echoesdata'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { Grid, Button, Card, CardContent, CardMedia, Typography, Collapse } from '@mui/material'
import Expander from './Expand.jsx'



export default function Recipes (props) {
    return (
        <>
            <Grid container spacing={2}>
                {props.recipes.map( (recipe, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant='outlined'>
                            <CardContent>
                                <Typography variant='h6' gutterBottom>No. {recipe.id} {recipe.name}</Typography>
                                <Typography variant='body2' gutterBottom>{recipe.description}</Typography>
                            </CardContent>
                            <Expander recipe={recipe} />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}