import React from 'react'
import '../styles/swatch.less'
import TextInput from './text_input'
import SwatchSelect from './swatch_select'

export default function Swatch(props) {

  let classification = props.role == 'neutral' ? 'neutrals' : 'primaries'

  function handleChangeIndividualColor (idx, value) {
    props.changeColor(props.role, idx, value)
  }

  function handleChangeSwatch (e) {
    props.changeSwatch(props.role, e.value)
  }

  function renderSwatch (colors) {
    return colors.map((c, idx) => {
      return <div key={`${props.role}-${idx}`} className='swatch_item'>
        <div className='color' style={{backgroundColor: c}}></div>
        <TextInput
          valueKey={idx}
          value={c} size={17}
          onChange={handleChangeIndividualColor}
          listKey={props.swatchObj.listKey}
          style={{}}
        />
      </div>
    })
  }

  return (
    <div>
      <div className='inline-h3-wrapper'>
        <div className='inline-h3'>{props.title}</div>
        <SwatchSelect onChange={handleChangeSwatch} classification={classification} selected={props.swatchObj.listKey}/>
      </div>
      <div className='swatch_column'>
        { renderSwatch(props.swatchObj.colors) }
      </div>
    </div>
  )
}