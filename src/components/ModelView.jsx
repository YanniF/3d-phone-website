import {OrbitControls, PerspectiveCamera, View} from '@react-three/drei';
import {Suspense} from 'react';
import * as THREE from 'three';
import Lights from './Lights.jsx';
import Loader from './Loader.jsx';
import Phone from './Phone.jsx';

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`absolute size-full ${index === 2 ? '-right-full' : ''}`}
    >
      <ambientLight intensity={0.5} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />

      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={.5}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group ref={groupRef} name={size}>
        <Suspense fallback={<Loader />}>
          <Phone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  )
}

export default ModelView
