import React from 'react'
import DropdownButton from './dropdownButton'
import DropdownContent from './dropdownContent.jsx'

const Dropdown = ({buttonText, content}) => {
    const [open, setOpen] = React.useState(false)
    const [dropdownTop, setDropdownTop] = React.useState(0)
    const [dropdownLeft, setDropdownLeft] = React.useState(0)

    const dropdownRef = React.useRef()
    const buttonRef = React.useRef()
    const contentRef = React.useRef()

    const toggleDropdown = () => {

        if(!open) {
            const spaceBelow = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom
            const contentHeight = contentRef.current.clientHeight

            const topPosition = spaceBelow > contentHeight ? null : spaceBelow - contentHeight
            setDropdownTop(topPosition)

            const spaceRight = window.innerWidth - buttonRef.current.getBoundingClientRect().left
            const contentWidth = contentRef.current.clientWidth

            const leftPosition = spaceRight > contentWidth ? null : spaceRight - contentWidth
            setDropdownLeft(leftPosition)
        }
        setOpen((open) => !open)
    }

    React.useEffect(() => {
        const handler = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false)
            }
            document.addEventListener('click', handler)

            return () => {
                document.removeEventListener('click', handler)
            }
        }
    }, [dropdownRef])

    return (
        <div className='dropdown' ref={dropdownRef}>
            <DropdownButton
                open={open}
                toggle={toggleDropdown}
                ref={buttonRef}
            > 
                {buttonText} 
            </DropdownButton>
            <DropdownContent
                top={dropdownTop}
                left={dropdownLeft}
                open={open}
                ref={contentRef}
            > 
                {content} 
            </DropdownContent>
        </div>
    )
}
export default Dropdown