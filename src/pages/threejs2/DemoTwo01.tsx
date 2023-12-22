import React, { useEffect } from 'react'
import * as THREE from 'three';


export default function DemoTwo01() {
  const [loaded, setLoaded] = React.useState(false);

  function main() {
    const width = 700, height = 500;

    const canvas = document.querySelector('#three-container') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize( width, height );

    const fov = 75;
    const aspect = width / height;  // 相机默认值
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    // 然后我们创建一个场景(Scene)。场景(Scene)是three.js的基本的组成部分
    const scene = new THREE.Scene();

    // 创建一个包含盒子信息的立方几何体(BoxGeometry)
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    // 创建一个基本的材质并设置它的颜色. 颜色的值可以用css方式和十六进制来表示。
    // const material = new THREE.MeshBasicMaterial({color: 0x44aa88});
    const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

    /*
    再创建一个网格(Mesh)对象，它包含了：
    几何体(Geometry)(物体的形状)
    材质(Material)(如何绘制物体，光滑还是平整，什么颜色，什么贴图等等)
    对象在场景中相对于他父对象的位置、朝向、和缩放。下面的代码中父对象即为场景对象。
     */
    const cube = new THREE.Mesh(geometry, material);

    // 最后我们将网格添加到场景中。
    // scene.add(cube);

    // 创建一盏平行光。
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // 之后将场景和摄像机传递给渲染器来渲染出整个场景。
    renderer.render(scene, camera);

    // 让立方体旋转起来，以便更好的在三维环境中显示。为了让它动起来我们需要用到一个渲染循环函数 requestAnimationFrame.
    function render(time:number) {
      time *= 0.001;  // 将时间单位变为秒

      // cube.rotation.x = time;
      // cube.rotation.y = time;

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function makeInstance(geometry:THREE.BoxGeometry, color:number, x:number) {
      const material = new THREE.MeshPhongMaterial({color});

      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      cube.position.x = x;

      return cube;
    }
    const cubes = [
      makeInstance(geometry, 0x44aa88,  0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844,  2),
    ];
  }

  useEffect(() => {
    if (loaded) {
      return;
    }

    main()

    setLoaded(true);
  }, [])

  return (
    <div>
      <h1>just use threejs</h1>
      <canvas id="three-container" style={{width: 700, height: 500}}/>
      <div id="info"></div>
    </div>
  )
}
