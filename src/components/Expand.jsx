import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import { Grid, Button, Card, CardContent, CardMedia, Typography, Collapse } from '@mui/material'
import { useState, useEffect } from 'react'

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
                    {props.recipe.ingredients && <Typography variant='body2' gutterBottom><strong>Ingredients:</strong> {props.recipe.ingredients}</Typography>}
                </Collapse>
            </CardContent>
        </>
    )
}