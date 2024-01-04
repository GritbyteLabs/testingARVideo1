import { CSS3DObject } from '../../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
import {loadGLTF} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

const createYoutube = () => {
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const onYouTubeIframeAPIReady = () => {
      const player = new YT.Player('player', {
	videoId: 'HCdmO6YFiVg', //pk
  height: 600,
  width: 1000,
  playerVars:{
    autoPlay: 1,//
    mute: 1//
  },
	events: {
	  onReady: () => {
	    resolve(player);
	  }
	}
      });
    }
    window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const player = await createYoutube();

    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: '../../assets/targets2/ap1.mind',
      uiScanning:"#scanning",
      uiLoading:"yes"
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;
    const obj2 = new CSS3DObject(document.querySelector("#border"));//
    const cssAnchor2 = mindarThree.addCSSAnchor(0);//
    cssAnchor2.group.add(obj2);//

    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(obj);

    

    cssAnchor.onTargetFound = () => {
      player.playVideo();
    }
    cssAnchor.onTargetLost = () => {
      player.pauseVideo();
      
    }

  //   const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
  //   scene.add(light);

  //   const raccoon = await loadGLTF('../../assets/Animation GLTF/1.gltf');
  //   const textureLoader = new THREE.TextureLoader();
  //   const texture = textureLoader.load('../../assets/Animation GLTF/1.png');
  //   const material = new THREE.MeshStandardMaterial({
  //     map: texture, 
  //     transparent: true,
  //     opacity: 1, 
  // });
  
  
  // const mesh = raccoon.scene.children[0];
  // mesh.material = material;
  // mesh.rotation.set(0,0, 0);
  // mesh.position.set(0,3,0);
  // raccoon.scene.scale.set(0.3, 0.3, 0.3);
  // //raccoon.scene.position.set(0,-1,3);
  // //raccoon.scene.rotation.set(0,-180,0);

  //   const anchor = mindarThree.addAnchor(0);
  //   anchor.group.add(raccoon.scene);

  //  // const mixer = new THREE.AnimationMixer(raccoon.scene);
  //   //const action = mixer.clipAction(raccoon.animations[0]);
  //  // action.setLoop(THREE.LoopOnce);
  //   //action.clampWhenFinished = true;
  //  // action.play();
  //   const clock = new THREE.Clock();

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      cssRenderer.render(cssScene, camera);
     // const delta = clock.getDelta();
     // mixer.update(delta);
     // renderer.render(scene, camera);
    });
  }
  start();
});



