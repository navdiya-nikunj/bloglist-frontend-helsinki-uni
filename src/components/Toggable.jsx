import { forwardRef, useImperativeHandle, useState } from 'react'
import Prototypes from 'prop-types'
import { Button } from '@mui/material'

const Toggable = forwardRef(({ children, buttonLabel, cancelButton }, refs) => {
    const [isActive, setIsActive] = useState(false)
    const toggleButton = () => {
        setIsActive(!isActive)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleButton,
        }
    }, [])
    return <>{isActive ? children : <></>}</>
})

Toggable.propTypes = {
    buttonLabel: Prototypes.string.isRequired,
}

export default Toggable
