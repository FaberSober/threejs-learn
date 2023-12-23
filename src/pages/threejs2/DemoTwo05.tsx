import React, { useEffect } from 'react'
import * as THREE from 'three';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';


const gui = new GUI();

export default function DemoTwo04() {
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


    const geometry = new THREE.BoxGeometry(1, 1, 1);

    const loader = new THREE.TextureLoader();
    const texture = loader.load('/assets/wall.png');
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    /*
    再创建一个网格(Mesh)对象，它包含了：
    几何体(Geometry)(物体的形状)
    材质(Material)(如何绘制物体，光滑还是平整，什么颜色，什么贴图等等)
    对象在场景中相对于他父对象的位置、朝向、和缩放。下面的代码中父对象即为场景对象。
     */
    const cube = new THREE.Mesh(geometry, material);

    // 最后我们将网格添加到场景中。
    scene.add(cube);

    class DegRadHelper {
      obj
      prop
      constructor(obj:any, prop:any) {
        this.obj = obj;
        this.prop = prop;
      }
      get value() {
        return THREE.MathUtils.radToDeg(this.obj[this.prop]);
      }
      set value(v) {
        this.obj[this.prop] = THREE.MathUtils.degToRad(v);
      }
    }

    class StringToNumberHelper {
      obj
      prop
      constructor(obj:any, prop:any) {
        this.obj = obj;
        this.prop = prop;
      }
      get value() {
        return this.obj[this.prop];
      }
      set value(v) {
        this.obj[this.prop] = parseFloat(v);
      }
    }

    const wrapModes = {
      'ClampToEdgeWrapping': THREE.ClampToEdgeWrapping,
      'RepeatWrapping': THREE.RepeatWrapping,
      'MirroredRepeatWrapping': THREE.MirroredRepeatWrapping,
    };

    function updateTexture() {
      texture.needsUpdate = true;
    }

    const gui = new GUI();
    gui.add(new StringToNumberHelper(texture, 'wrapS'), 'value', wrapModes)
      .name('texture.wrapS')
      .onChange(updateTexture);
    gui.add(new StringToNumberHelper(texture, 'wrapT'), 'value', wrapModes)
      .name('texture.wrapT')
      .onChange(updateTexture);
    gui.add(texture.repeat, 'x', 0, 5, .01).name('texture.repeat.x');
    gui.add(texture.repeat, 'y', 0, 5, .01).name('texture.repeat.y');
    gui.add(texture.offset, 'x', -2, 2, .01).name('texture.offset.x');
    gui.add(texture.offset, 'y', -2, 2, .01).name('texture.offset.y');
    gui.add(texture.center, 'x', -.5, 1.5, .01).name('texture.center.x');
    gui.add(texture.center, 'y', -.5, 1.5, .01).name('texture.center.y');
    gui.add(new DegRadHelper(texture, 'rotation'), 'value', -360, 360)
      .name('texture.rotation');

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
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
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
