import React from 'react'

const DropdownContent = React.forwardRef((props, ref) => {
    const {children, open, top, left} = props

    return (
        <div 
            className={`dropdown-content ${open ? 'content-open' : null}`}
            ref={ref}
            style={{top: top ? `${top}px` : '100%', left: left ? `${left}px` : '100%'}}
        >
            {children}
        </div>
    )
})

export default DropdownContent