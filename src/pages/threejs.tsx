import { Outlet } from 'react-router-dom'

export default function Threejs() {
  return (
    <div className="fa-threejs-main">
      <a href="/">back</a>
      <div>Threejs demo</div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
