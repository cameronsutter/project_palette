import React, { useReducer, useEffect } from 'react'
import '../styles/color_palette.less'
import Swatch from './swatch'
import { KEY, initialState, swatchesReducer, CHANGE_COLOR, CHANGE_SWATCH } from '../util/swatchesReducer'
import swatches from '../swatches/swatches_list'

export default function ColorPalette(props) {
  const [currentSwatches, dispatch] = useReducer(swatchesReducer, initialState())

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(currentSwatches))
  }, [currentSwatches])

  function handleChangeColor (role, index, value) {
    dispatch({type: CHANGE_COLOR, role, index, value})

    if (role == 'neutral' || role == 'primary') {
      let key = `--${role}-${index}`
      props.setColors({[key]: value})
    }

    if (props.publishColorPalette) {
      props.publishColorPalette(currentSwatches)
    }
  }

  function handleChangeSwatch (role, listKey) {
    dispatch({type: CHANGE_SWATCH, role, listKey})

    if (role == 'neutral' || role == 'primary') {
      let newColors = swatches[listKey].reduce((acc, c, idx) => {
        acc[`--${role}-${idx}`] = c
        return acc
      }, {})
      props.setColors(newColors)
    }

    if (props.publishColorPalette) {
      props.publishColorPalette(currentSwatches)
    }
  }

  if (props.forPrint) {
    let val = props.colorPalette || currentSwatches
    return (
      <>
        <div className='color-swatches html2pdf__page-break'>
          <Swatch title='Neutrals' role='neutral' swatchObj={val['neutral']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
          <Swatch title='Primary Color' role='primary' swatchObj={val['primary']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
          <Swatch title='Success' role='success' swatchObj={val['success']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
        </div>
        <div className='color-swatches html2pdf__page-break'>
          <Swatch title='Error' role='error' swatchObj={val['error']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
          <Swatch title='Warning' role='warning' swatchObj={val['warning']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
          <Swatch title='Supporting' role='support' swatchObj={val['support']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h2>Color Palette</h2>
        <div className='color-swatches'>
          <Swatch title='Neutrals' role='neutral' swatchObj={currentSwatches['neutral']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
          <Swatch title='Primary Color' role='primary' swatchObj={currentSwatches['primary']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
        </div>
        <div className='color-swatches'>
          <Swatch title='Success' role='success' swatchObj={currentSwatches['success']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
          <Swatch title='Error' role='error' swatchObj={currentSwatches['error']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
        </div>
        <div className='color-swatches'>
          <Swatch title='Warning' role='warning' swatchObj={currentSwatches['warning']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
          <Swatch title='Supporting' role='support' swatchObj={currentSwatches['support']} changeSwatch={handleChangeSwatch} changeColor={handleChangeColor}/>
        </div>
      </>
    )
  }

}

// const MIDDLE_PRIMARY = '--primary-5'
//
// <HuePicker color={parseHSL(primaries[MIDDLE_PRIMARY])} onChange={handleHueChange} />
//
// function handleHueChange (color, _event) {
//   let newHue = Math.round(color.hsl.h)
//   let newPrimaries = Object.keys(primaries).reduce((acc, k) => {
//     let newColor = parseHSL(primaries[k])
//     newColor.h = newHue
//     acc[k] = hslToString(newColor)
//     return acc
//   }, {})
//   setPrimaries(newPrimaries)
//   props.setColors(newPrimaries)
// }