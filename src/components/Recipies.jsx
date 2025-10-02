import { styled } from '@mui/material/styles'
import { Grid, Card, CardContent, Typography, CardMedia, TextField, Box } from '@mui/material'
import Expander from './Expand.jsx'
import React from 'react'
import { ingredients as skyIngredients } from "../data/skywarddata.js";
import { ingredients as echoesIngredients } from "../data/echoesdata.js";
import useRecipeSearch from './recipeSearch.jsx';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.spacing(1),
  overflow: 'hidden',
  margin: theme.spacing(1), // spacing between cards
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
  overflow: 'hidden',
})

export default function Recipes(props) {

    const { query, setQuery, filtered } = useRecipeSearch(
        props.recipes || [],
        { skyIngredients, echoesIngredients }
    ) 

    return (
        <div className="recipes-grid"> {/* use themed grid class */}
            <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'center' }}>
                <TextField
                    size="small"
                    placeholder="Search recipes..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    sx={{ width: '100%', maxWidth: 600 }}
                />
            </Box>
            <Grid container justifyContent="center">
                {filtered.map((recipe, index) => (
                    <StyledCard key={index} variant="outlined">
                        <StyledCardContent>
                            <Typography variant='h6' gutterBottom>
                                No. {recipe.id} {recipe.name}
                            </Typography>
                            <Typography variant='body2' gutterBottom>
                                {recipe.description}
                            </Typography>
                            {recipe.image ? (
                                <CardMedia
                                component="img"
                                image={recipe.image}
                                alt={recipe.name}
                                sx={{
                                    width: 'auto',         
                                    height: 'auto',          
                                    objectFit: 'cover',    // crop to fit
                                    borderRadius: 1,       // small rounded corners
                                    display: 'block',      // make it a block so margins center it
                                    margin: '8px auto 0',  // center horizontally and add bottom spacing
                                }}
                            />
                            ) : null}
                        </StyledCardContent>
                        <Expander recipe={recipe} />
                    </StyledCard>
                ))}
            </Grid>
        </div>
    )
}

