import { Link, Outlet } from 'react-router-dom'

export default function Threejs() {
  return (
    <div className="fa-threejs-main">
      <Link to="/">back</Link>
      <div>Threejs demo</div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
