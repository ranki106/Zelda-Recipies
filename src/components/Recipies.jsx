
import { useState, useEffect } from 'react'
import { echoesRecipes } from '../data/echoesdata'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { Grid, Button, Card, CardContent, CardMedia, Typography, Collapse } from '@mui/material'
import Expander from './Expand.jsx'

const StyledCard = styled(Card)(({ theme }) => ({
    width: '300px',
    aspectRatio: '1 / 1',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    height: '100%',
}));

const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
    overflow: 'hidden',
})

export default function Recipes (props) {
    return (
        <>
            <Grid container spacing={2}>
                {props.recipes.map( (recipe, index) => (
                    <Grid item xs={6} md={1} key={index}>
                        <StyledCard variant='outlined'>
                            <StyledCardContent>
                                <Typography variant='h6' gutterBottom>No. {recipe.id} {recipe.name}</Typography>
                                <Typography variant='body2' gutterBottom>{recipe.description}</Typography>
                            </StyledCardContent>
                            <Expander recipe={recipe} />
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}