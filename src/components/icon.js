import React from 'react'

export default function Icon (props) {
  switch (props.icon) {
    case 'menu':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-menu"><path className="secondary" fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/></svg>
    case 'download':
      return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-cloud-download"><path className="primary" d="M15 15v-3a3 3 0 0 0-6 0v3H6a4 4 0 0 1-.99-7.88 5.5 5.5 0 0 1 10.86-.82A4.49 4.49 0 0 1 22 10.5a4.5 4.5 0 0 1-4.5 4.5H15z"/><path className="secondary" d="M11 18.59V12a1 1 0 0 1 2 0v6.59l1.3-1.3a1 1 0 0 1 1.4 1.42l-3 3a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l1.3 1.3z"/></svg>
    default:
      return null
  }
}