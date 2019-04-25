import React, { useState } from 'react'
import '../styles/swatch_select.less'
import Select from 'react-select'
import swatchList from '../swatches/swatches_labels'

export default function SwatchSelect(props) {

  let placeholder = swatchList[props.classification][props.selected]

  function makeOptions () {
    return Object.keys(swatchList[props.classification])
      .map(s => ({value: s, label: swatchList[props.classification][s]}))
  }

  return <Select
    className='swatch-select'
    defaultValue={props.selected}
    placeholder={placeholder}
    onChange={props.onChange}
    options={makeOptions()}
  />
}