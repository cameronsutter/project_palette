export default function printOptions () {
  return {
    html2canvas: {
      ignoreElements: (element) => {
        let result = false
        if (element.classList && element.classList.value) {
          result = element.classList.value.includes('swatch-select') ? true : result
        }

        return result
      },
      onclone: (doc) => {
        modifyBody(doc)
        modifySwatches(doc)
        modifyBottomPalettes(doc)
      }
    },
  }
}

function modifySwatches (doc) {
  // .color-swatches
  let colorSwatches = doc.getElementsByClassName('color-swatches')
  colorSwatches[2].style.marginTop = '20px'
  colorSwatches[5].style.marginTop = '20px'

  // .swatch_column
  let swatchColumns = doc.getElementsByClassName('swatch_column')
  for (let i = 0; i < swatchColumns.length; i++) {
    swatchColumns[i].style.height = '460px'
  }

  // .swatch_item
  let swatchItems = doc.getElementsByClassName('swatch_item')
  for (let i = 0; i < swatchItems.length; i++) {
    swatchItems[i].style.flexDirection = 'column'
    swatchItems[i].style.width = '125px'

    // .text-input__container
    swatchItems[i].lastChild.style.width = '125px'
  }
}

function modifyBody (doc) {
  let div = doc.querySelector('.html2pdf__container #palettes')
  // div.style.width = '100%'
  div.style.margin = '0'
  div.style.paddingTop = '10px'
  div.style.paddingBottom = '0'
  // div.style.height = '100%'
  // div.style.border = 'none'

  let h2 = doc.getElementsByTagName('h2')
  for (let i = 0; i < h2.length; i++) {
    h2[i].style.marginTop = '2px'
    h2[i].style.marginBottom = '8px'
  }

  let h3 = doc.getElementsByClassName('inline-h3-wrapper')
  for (let h of h3) {
    h.style.margin = '15px'
  }
}

function modifyBottomPalettes (doc) {
  // console.log(doc)
  let bottom = doc.querySelector('.html2pdf__container .palette__container')
  // console.log(bottom)
  bottom.style.marginTop = '10px'
  // bottom.style.marginTop = '40px'
  bottom.style.marginBottom = '0'
}