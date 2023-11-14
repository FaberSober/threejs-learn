import React, { useEffect } from 'react'
import * as THREE from 'three';


export default function Demo01() {
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    if (loaded) {
      return;
    }

    // const width = window.innerWidth, height = window.innerHeight;
    const width = 700, height = 500;
    // init

    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );
    renderer.setAnimationLoop( animation );
    document.getElementById('three-container')!.appendChild( renderer.domElement );

    // animation
    function animation(time:number) {
      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render( scene, camera );
    }

    setLoaded(true);
  }, [])

  return (
    <div>
      <h1>just use threejs</h1>
      <div id="three-container" style={{ width: 700, height: 500 }} />
    </div>
  )
}
