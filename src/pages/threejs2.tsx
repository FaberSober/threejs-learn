import { Outlet } from 'react-router-dom'

export default function Threejs2() {
  return (
    <div className="fa-threejs-main">
      <a href="/">back</a>
      <div>Threejs2 demo</div>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
