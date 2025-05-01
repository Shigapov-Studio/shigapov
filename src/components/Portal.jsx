import { createPortal } from 'react-dom'

const Portal = ({ children, containerId = 'portal-root' }) => {
  const container = document.getElementById(containerId)
  return container ? createPortal(children, container) : null
}

export default Portal