import React, { useState } from 'react'
import '../styles/spacing_palette.less'
import TextInput from './text_input'
import parseVars from '../util/parseVars'


export default function SpacingPalette(props) {
  const [spacings, setSpacings] = useState(parseVars('spacing', props.vals))
    
  function changeSpacing (spacingKey, newVal) {
    if (!newVal || newVal == '') return

    const regex = /^\d{1,3}(px)?$/
    let matches = newVal.match(regex)
    if (matches && matches.length > 0) {
      let newSpacings = {...spacings}
      newSpacings[spacingKey] = newVal
      setSpacings(newSpacings)
      props.setSpacings(newSpacings)
    }
  }

  function renderSpacings () {
    return Object.keys(spacings).map(s => {
      return <div key={s} className='spacing__item'>
        <div className='spacing' style={{width: spacings[s]}}></div>
        <TextInput 
          valueKey={s}
          value={spacings[s]} size={6}
          onChange={changeSpacing}
          style={{}}
        />
      </div>
    })
  }

  return (
    <div>
      <h2>Spacing Palette</h2>
      <div className='spacing__container'>
      { renderSpacings() }
      </div>
    </div>
  )
}
