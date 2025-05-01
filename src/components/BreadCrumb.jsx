import { Link } from "react-router"

function BreadCrumb({href, text}) {
  return (
    <Link to={href} className="go-back"><span className="icon-left"></span>{text}</Link>
  )
}

export default BreadCrumb;