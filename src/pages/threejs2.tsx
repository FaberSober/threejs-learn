import { Link, Outlet } from 'react-router-dom'


export default function Threejs2() {
  return (
    <div className="fa-threejs-main">
      <Link to="/">back</Link>
      <div>Threejs2 demo</div>

      <div id="threejs2-container">
        <Outlet />
      </div>
    </div>
  )
}
