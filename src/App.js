import React, { useState, useEffect } from 'react'
import ColorPalette from './components/color_palette'
import TextPalette from './components/text_palette'
import SpacingPalette from './components/spacing_palette'
import CustomProperties from 'react-custom-properties'
import Icon from './components/icon'
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
      <div className="off-canvas off-canvas-sidebar-show">
        <a className="off-canvas-toggle btn btn-action" href="#the-sidebar">
          <Icon icon='menu'/>
        </a>

        <div id="the-sidebar" className="off-canvas-sidebar">
          <h1>Project Palette</h1>
          <p>Inspired by the work of <a href="https://refactoringui.com/book">Refactoring UI</a></p>
          <p>Visually define your next project&apos;s palette with this simple tool</p>
          <button onClick={download} className='btn btn-primary btn-lg'><Icon icon='download'/> Download Palette</button>
          <div className='attribution'>
            <p>Made by the creator of </p><div><a href="http://www.plotmynovel.com"><img width="75" src="http://www.plotmynovel.com/images/plottr_logo.png"/></a></div>
          </div>
        </div>

        <a className="off-canvas-overlay" href="#close"></a>

        <div className="off-canvas-content">
          <div id='palettes' className='palettes'>
            <ColorPalette vals={vals} setColors={setValues}/>
            <div className='palette__container'>
              <TextPalette vals={vals} setFonts={setValues}/>
              <SpacingPalette vals={vals} setSpacings={setValues}/>
            </div>
          </div>
        </div>
      </div>
    </CustomProperties>
  )
}
