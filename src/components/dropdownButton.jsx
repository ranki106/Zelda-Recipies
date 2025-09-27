import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const DropdownButton = React.forwardRef((props, ref) => {
    const {children, open, toggle} = props

    return (
        <div 
            className={`dropdown-btn ${open ? 'button-open' : null}`} 
            onClick={toggle}
            ref={ref}
        >
            {children}
            <span className='toggle-icon'>
                {open ? <FaChevronUp /> : <FaChevronDown />}
            </span>
        </div>
    )
})
export default DropdownButton