import gsap from 'gsap';
import {useGSAP} from '@gsap/react';
import {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';
import {Canvas} from '@react-three/fiber';
import ModelView from './ModelView.jsx';
import {yellowImg} from '../utils/assets.js';
import {View} from '@react-three/drei';
import {models, sizes} from '../constants/index.js';
import {animateWithGsap, animateWithGsapTimeline} from '../utils/animations.js';

const Model = () => {
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  });

  // camera control for the model view
  const cameraControlSmall = useRef()
  const cameraControlLarge = useRef()

  const small = useRef(new THREE.Group())
  const large = useRef(new THREE.Group())

  // keep track of the model rotation
  const [smallRotation, setSmallRotation] = useState(0)
  const [largeRotation, setLargeRotation] = useState(0)

  const tl = gsap.timeline()

  useEffect(() => {
    if (size === 'small') {
      animateWithGsapTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      });
    }

    if (size === 'large') {
      animateWithGsapTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      });
    }
  }, [size]);

  useGSAP(() => {
    animateWithGsap(
      '#model-heading',
      { y: 0, opacity: 1 },
      { trigger: '#model' }
    )
  }, [])

  return (
    <section className="common-padding">
      <div className="screen-max-width" id="model">
        <h1 id="model-heading" className="section-heading">Take a closer look.</h1>

        <div className="mt-5 flex flex-col items-center">
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="size-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port/>
            </Canvas>
          </div>

          <div className="mx-auto w-full">
            <p className="text-sma mb-5 text-center font-light">{model.title}</p>
            <div className="flex-center">
              <ul className="color-container">
                {models.map((model, i) => (
                  <li
                    key={i}
                    className="mx-2 size-6 cursor-pointer rounded-full hover:opacity-90"
                    style={{backgroundColor: model.color[0]}}
                    onClick={() => setModel(model)}
                  />
                ))}
              </ul>

              <button className="size-btn-container">
                {sizes.map(({label, value}) => (
                  <span
                    key={label}
                    className="size-btn hover:opacity-90"
                    style={{
                      backgroundColor: size === value ? '#fff' : 'transparent',
                      color: size === value ? '#111' : '#fff'
                    }}
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Model
