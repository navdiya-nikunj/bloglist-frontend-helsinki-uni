import { forwardRef, useImperativeHandle, useState } from 'react'
import Prototypes from 'prop-types'

const Toggable = forwardRef(({ children, buttonLabel, cancelButton }, refs) => {
  const [isActive, setIsActive] = useState(false)
  const toggleButton = () => {
    console.log('isactive', isActive)
    setIsActive(!isActive)
  }

  useImperativeHandle(
    refs,
    () => {
      return {
        toggleButton,
      }
    },
    []
  )
  return !isActive ? (
    <button onClick={toggleButton}> {buttonLabel}</button>
  ) : (
    <>
      {children}
      <button onClick={toggleButton}>{cancelButton}</button>
    </>
  )
})

Toggable.propTypes = {
  buttonLabel: Prototypes.string.isRequired,
}

export default Toggable
