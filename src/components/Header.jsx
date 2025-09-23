import { useState, useEffect } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, MenuItem, Tooltip, Button } from '@mui/material'

export default function Header() {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleButtonClick = (event) => {
        if (open) {
            handleClose()
        } else {
            handleClick(event)
        }
    }
    
    return (
        <header className='app-header'>
            <Link to="/">
                <h1>Zelda Recipe Site</h1>
            </Link>
            <Button
                id="game-select-button"
                aria-controls={open ? 'game-select' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleButtonClick}
            >
                Games
            </Button>
            <Menu
                id="game-select" 
                anchorEl={anchorEl}
                open={open}
                close={handleClose} 
                slotProps={{
                    list: {
                        'aria-labelledby': 'game-select-button'
                    },
                }}  
            >
                <MenuItem 
                    onClick={ () => {
                        navigate('/echoes')
                        handleClose()
                    }}
                > 
                    Echoes of Wisdom 
                </MenuItem>
                <MenuItem 
                    onClick={ () => {
                        navigate('/tears')
                        handleClose()
                    }}
                > 
                    Tears of the Kingdom
                </MenuItem>
                <MenuItem 
                    onClick={ () => {
                        navigate('/breath')
                        handleClose()
                    }}
                > 
                    Breath of the Wild 
                </MenuItem>
                <MenuItem>
                    Hyrule Warriors: Age of Calamity
                </MenuItem>
                <MenuItem>
                    Skyward Sword
                </MenuItem>
            </Menu>
        </header>
    )
}

