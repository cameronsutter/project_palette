import React, { useState, useEffect } from 'react'
import '../styles/text_input.less'
import RevertButton from './revert_button'
import defaultVars from '../defaults'
import swatches from '../swatches/swatches_list'

export default function TextInput (props) {
  let originalVal = defaultVars[props.valueKey]
  if (props.listKey) originalVal = swatches[props.listKey][props.valueKey]

  const [currentVal, setVal] = useState(props.value)

  useEffect(() => {
    if (props.value != currentVal) setVal(props.value)
  }, [props.value])

  function handleKeyPress (e) {
    if (e.key == 'Enter') {
      finishEditing()
    }
  }
  
  function finishEditing () {
    props.onChange(props.valueKey, currentVal)
  }

  function revert () {
    setVal(originalVal)
    props.onChange(props.valueKey, originalVal)
  }

  function renderRevertButton () {
    if (props.listKey && props.value == swatches[props.listKey][props.valueKey]) return null
    if (props.value == originalVal) return null
    return <RevertButton onClick={revert}/>
  }
  
  function changeText(event) {
    setVal(event.target.value)
  }

  return <div className='text-input__container'>
    <input className='text-input' type='text'
      size={props.size} style={props.style}
      value={currentVal} onChange={changeText}
      onKeyPress={handleKeyPress} onBlur={finishEditing}
    />
    { renderRevertButton() }
  </div>
}
