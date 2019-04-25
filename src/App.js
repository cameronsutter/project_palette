import React, { useState, useEffect } from 'react'
import ColorPalette from './components/color_palette'
import TextPalette from './components/text_palette'
import SpacingPalette from './components/spacing_palette'
import CustomProperties from 'react-custom-properties'
import './styles/App.less'
import defaultVars from './defaults'
import html2pdf from 'html2pdf.js'
import printOptions from './util/printOptions'

const FIRST_NEUTRAL = '--neutral-0'
const KEY = 'defaultVars'

export default function App() {
  let initialState = defaultVars
  if (localStorage.getItem(KEY)) initialState = JSON.parse(localStorage.getItem(KEY))
  const [vals, setVals] = useState(initialState)

  useEffect(() => {
    document.body.style.color = vals[FIRST_NEUTRAL]
  }, [vals])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(vals))
  }, [vals])

  function download () {
    let el = document.getElementById('palettes')
    let printer = html2pdf().from(el)
    printer.set(printOptions())
    printer.save('project_palette.pdf')
  }

  function setValues (values) {
    let newValues = Object.keys(vals).reduce((acc, v) => {
      acc[v] = values[v] || vals[v]
      return acc
    }, {})
    setVals(newValues)
  }

  return (
    <CustomProperties properties={vals}>
      <div className='app-body'>
        <h1>Project Palette</h1>
        <div id='palettes' className='palettes'>
          <ColorPalette vals={vals} setColors={setValues}/>
          <div className='palette__container'>
            <TextPalette vals={vals} setFonts={setValues}/>
            <SpacingPalette vals={vals} setSpacings={setValues}/>
          </div>
          <div className='palette__container' data-html2canvas-ignore>
            <button onClick={download} className='download'>Download this Project Palette</button>
          </div>
        </div>
      </div>
      <div className='footer'>
        Made by the creator of <div><a href="http://www.plotmynovel.com"><img width="75" src="http://www.plotmynovel.com/images/plottr_logo.png"/></a></div>
      </div>
    </CustomProperties>
  )
}
