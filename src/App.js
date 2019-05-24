import React, { useState, useEffect } from 'react'
import ColorPalette from './components/color_palette'
import TextPalette from './components/text_palette'
import SpacingPalette from './components/spacing_palette'
import CustomProperties from 'react-custom-properties'
import Icon from './components/icon'
import './styles/App.less'
import './styles/print.less'
import defaultVars from './defaults'
import html2pdf from 'html2pdf.js'
import printOptions from './util/printOptions'
import downloadFile from 'downloadjs'
import makeCSSTemplate from './util/css_template'

const FIRST_NEUTRAL = '--neutral-0'
const KEY = 'defaultVars'

export default function App() {
  let initialState = defaultVars
  if (localStorage.getItem(KEY)) initialState = JSON.parse(localStorage.getItem(KEY))
  const [vals, setVals] = useState(initialState)
  const [hidden, setHidden] = useState(true)

  const [colorPalette, publishColorPalette] = useState()
  const [textPalette, publishTextPalette] = useState()
  const [spacingPalette, publishSpacingPalette] = useState()

  useEffect(() => {
    document.body.style.color = vals[FIRST_NEUTRAL]
  }, [vals])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(vals))
  }, [vals])

  function download () {
    setHidden(false)
    setTimeout(() => {
      let el = document.getElementById('forPrint')
      let printer = html2pdf().from(el)
      printer.set(printOptions())
      printer.save('project_palette.pdf')
      setTimeout(() => setHidden(true), 500)
    }, 1000)
    downloadCSS()
  }

  function downloadCSS () {
    let text = makeCSSTemplate(colorPalette, textPalette, spacingPalette)
    downloadFile(text, 'project_palette.css', 'application/css')
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
          <p className='donate'>Consider donating <a className='btn btn-sm' target="_blank" href='https://paypal.me/clouiss?locale.x=en_US'>PayPal</a></p>
          <div className='attribution'>
            <p>Made by the creator of </p><div><a href="http://www.plotmynovel.com"><img width="75" src="http://www.plotmynovel.com/assets/img/plottr_logo_29_500w.png"/></a></div>
          </div>
        </div>

        <a className="off-canvas-overlay" href="#close"></a>

        <div className="off-canvas-content">
          <div id='palettes' className='palettes'>
            <ColorPalette vals={vals} setColors={setValues} publishColorPalette={publishColorPalette}/>
            <div className='palette__container'>
              <TextPalette vals={vals} setFonts={setValues} publishTextPalette={publishTextPalette}/>
              <SpacingPalette vals={vals} setSpacings={setValues} publishSpacingPalette={publishSpacingPalette}/>
            </div>
          </div>
          <div id='forPrint' className={`forPrint ${hidden ? 'hidden' : ''}`}>
            <h2>Color Palette</h2>
            <ColorPalette vals={vals} setColors={setValues} forPrint={true} colorPalette={colorPalette}/>
            <div className='palette__container'>
              <TextPalette vals={vals} setFonts={setValues} forPrint={true} textPalette={textPalette}/>
              <SpacingPalette vals={vals} setSpacings={setValues} forPrint={true} spacingPalette={spacingPalette}/>
            </div>
          </div>
        </div>
      </div>
    </CustomProperties>
  )
}
