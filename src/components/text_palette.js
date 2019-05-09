import React, { useState } from 'react'
import '../styles/text_palette.less'
import TextInput from './text_input'
import parseVars from '../util/parseVars'

export default function TextPalette(props) {
  const defaults = parseVars('font', props.vals)
  const [fonts, setFonts] = useState(defaults)
  
  function changeFont (fontKey, newVal) {
    if (!newVal || newVal == '') return

    const regex = /^\d{1,3}(px)?$/
    let matches = newVal.match(regex)
    if (matches && matches.length > 0) {
      let newFonts = {...fonts}
      newFonts[fontKey] = newVal
      setFonts(newFonts)
      props.setFonts(newFonts)

      if (props.publishTextPalette) {
        props.publishTextPalette(newFonts)
      }
    }

  }

  function renderFonts () {
    let fontVals = fonts
    if (props.forPrint && props.textPalette) {
      fontVals = props.textPalette
    }
    return Object.keys(fontVals).map(f => {
      return <div key={f}>
        <TextInput 
          valueKey={f}
          value={fontVals[f]} size={6}
          onChange={changeFont}
          style={{fontSize: fontVals[f]}}
        />
      </div>
    })
  }

  return (
    <div>
      <h2>Text Palette</h2>
      <div className='text__container'>
        { renderFonts() }
      </div>
    </div>
  )
}
