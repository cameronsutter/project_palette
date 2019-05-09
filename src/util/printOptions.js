export default function printOptions () {
  return {
    html2canvas: {
      onclone: (doc) => {
        let div = doc.querySelector('.html2pdf__container #forPrint')
        div.style.display = 'block'
      }
    },
  }
}