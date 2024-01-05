import { CSS3DObject } from '../../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
import {loadGLTF} from "../../libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

var flag1 = 0;


const createYoutube = () => {
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    const onYouTubeIframeAPIReady = () => {
      const player = new YT.Player('player', {
	videoId: 'ilTxDsLDyHw', //ot
  height: 500,
  width: 1000,
  playerVars:{

    
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
      imageTargetSrc: '../../assets/targets2/ap5crop.mind',
      uiScanning:"#scanning",
      uiLoading:"yes"
    });
    const {renderer, cssRenderer, scene, cssScene, camera} = mindarThree;

    const buttondiv = new CSS3DObject(document.querySelector("#buttonDiv"));
    const button1 = document.getElementById("button1");
   
    

    const cssAnchor3 = mindarThree.addCSSAnchor(0);
    cssAnchor3.group.add(buttondiv);

    const obj2 = new CSS3DObject(document.querySelector("#border"));//
    var ob2 = document.getElementById('border');
    const cssAnchor2 = mindarThree.addCSSAnchor(0);//
    cssAnchor2.group.add(obj2);//
    ob2.style.opacity = 0;
    ob2.style.pointerEvents = 'none';
    
    const obj = new CSS3DObject(document.querySelector("#ar-div"));
    var ob = document.getElementById('ar-div');
    const cssAnchor = mindarThree.addCSSAnchor(0);
    cssAnchor.group.add(obj);
    ob.style.opacity = 0;
    ob.style.pointerEvents = 'none';

    button1.addEventListener("click",function() {
     // cssAnchor2.group.add(obj2);
      //cssAnchor.group.add(obj);
      ob2.style.opacity = 1;
      ob.style.opacity = 1;
      flag1 = 1;
      player.playVideo();
      ob2.style.pointerEvents = 'auto';
      ob.style.pointerEvents = 'auto';
     
    });

    cssAnchor.onTargetFound = () => {
    
      
      if(flag1==1){
        player.playVideo();
       
      }else{
        button1.style.visibility  = 'visible';
       
      }
     
      

    }
    cssAnchor.onTargetLost = () => {
      player.pauseVideo();
      button1.style.visibility  = 'hidden';
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





