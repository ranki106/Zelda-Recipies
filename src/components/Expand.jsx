import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { Grid, Button, Card, CardContent, CardMedia, Typography, Collapse } from '@mui/material'
import { useState, useEffect } from 'react'
import HoverPopup from './hoverpopup'
import HoverPopup2 from './hoverpopup2'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Expander(props) {
    const [expand, setExpand] = useState(false)

    const handleExpandClick = () => {
        setExpand(!expand)
    }

    return (
        <>
            <ExpandMore
                expand={expand}
                onClick={handleExpandClick}
            >
                <Typography variant='button'> {expand ? "Less" : "More"} </Typography>
            </ExpandMore>
            <CardContent>
                    <Collapse in={expand} timeout="auto" unmountOnExit>
                    {props.recipe.effects && <Typography variant='body2' gutterBottom><strong>Effects:</strong> {props.recipe.effects}</Typography>}
                    <Typography variant="body2" component="div" gutterBottom>
                        {props.recipe.ingredient1 ? 
                        <>
                            <span  style={{ fontWeight: 600 }}>Main Ingredient:</span>
                            <span style={{ marginLeft: 8 }}>
                                <HoverPopup recipe={props.recipe} />
                            </span>
                        </> 
                        : 
                            null
                        }
                    </Typography>
                    {props.recipe.ingredient2 && props.recipe.ingredient2.length > 0 && (
                      <Typography variant='body2' component="div" gutterBottom>
                        <strong>
                          Secondary Ingredient{props.recipe.ingredient2.length === 1 ? '' : 's'}:
                        </strong>{' '}
                        <HoverPopup2 recipe={props.recipe}/>
                      </Typography>
                    )}
                    {Array.isArray(props.recipe.ingredients) && props.recipe.ingredients.length > 0 && (
                        <Typography variant='body2' component="div" gutterBottom>
                            <strong>Ingredients:</strong>{' '}
                            <HoverPopup2 recipe={props.recipe} />
                        </Typography>
                    )}
                </Collapse>
            </CardContent>
        </>
    )
}