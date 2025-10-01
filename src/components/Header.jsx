import { useState, useEffect } from 'react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, MenuItem, Tooltip, Button } from '@mui/material'
import Dropdown from './dropdown.jsx'
import DropdownItem from './dropdownItem.jsx'

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

    const games = [
        { name: 'Echoes of Wisdom', path: '/echoes' },
        { name: 'Tears of the Kingdom', path: '/tears' },
        { name: 'Breath of the Wild', path: '/breath' },
        { name: 'Hyrule Warriors: Age of Calamity', path: '/hyrule-warriors' },
        { name: 'Skyward Sword', path: '/skyward-sword' },
    ]
    
    return (
        <header className='app-header'>
            <Link to="/">
                <h1 className='app-title'>Zelda Recipe Site</h1>
            </Link>
            
            <Dropdown 
                buttonText="Games" 
                content={
                   <>
                        {games.map((game) => (
                            <Link to={game.path} key={game.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <DropdownItem key={game.name}>
                                    {game.name}
                                </DropdownItem>
                            </Link>
                        ))}
                   </>
                }
            />
        </header>
    )
}

