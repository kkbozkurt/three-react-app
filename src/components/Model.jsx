import { useLoader, useFrame } from 'react-three-fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react';
import filePath from "C:/Users/Admin/Desktop/developer/three-react-app/src/20230814103920_q.log"

export default function Model (props ) {

    const [logData, setLogData] = useState(0);
    const [frameData, setFrameData] = useState(0);
    const [continueLoop, setContinueLoop] = useState(0);
    const count = useRef(0);
    const ref = useRef();

    const model = useLoader(
        GLTFLoader,
        props.path
    )

    useEffect(()=>{
        console.log(model)

        fetch(filePath)
            .then(response => response.text()) 
            .then(logResponse => {
                setLogData(logResponse.split(','));
                console.log(logResponse.split(','));
            });
        },[])

    // Here's the animation part
    // ************************* 
    let mixer
  
    useEffect(() => {
  
        //Implementing the setInterval method
        const interval = setInterval(() => {
            setContinueLoop(continueLoop+1);
            if(logData.length > 0)
            {
                if(count.current*40 + 40> logData.length){
                    count.current = 0;
                }
                console.log("count current", count.current);
                setFrameData(logData.slice(count.current*40, count.current*40 + 40));
                count.current = count.current+1;
            }
        }, 50);
  
        //Clearing the interval
        return () => clearInterval(interval);
    }, [continueLoop]);

    useEffect(()=>{
        console.log("frame data", frameData);

        //ref.current.getObjectByName("mixamorigRightArm").applyQuaternion(new THREE.Quaternion(-0.9144103693806832,-0.08921880401614674,0.056881080542537855,0.7088525225728048).normalize())
        ref.current.getObjectByName("mixamorigRightArm").setRotationFromQuaternion(new THREE.Quaternion(- frameData[1],frameData[2],-frameData[3],frameData[0]).normalize())
        //ref.current.getObjectByName("mixamorigRightForeArm").setRotationFromQuaternion(new THREE.Quaternion(frameData[5],frameData[6],frameData[7],frameData[4]).normalize())
        ref.current.getObjectByName("mixamorigLeftArm").setRotationFromQuaternion(new THREE.Quaternion(-frameData[9],frameData[10],-frameData[11],frameData[8]).normalize())
        //ref.current.getObjectByName("mixamorigLeftForeArm").setRotationFromQuaternion(new THREE.Quaternion(frameData[13],frameData[14],frameData[15],frameData[12]).normalize())
        ref.current.getObjectByName("mixamorigSpine").setRotationFromQuaternion(new THREE.Quaternion(frameData[17],frameData[18],frameData[19],frameData[16]).normalize())
        ref.current.getObjectByName("mixamorigRightUpLeg").setRotationFromQuaternion(new THREE.Quaternion(frameData[21],-frameData[22],-frameData[23],frameData[20]).normalize())
        //ref.current.getObjectByName("mixamorigRightLeg").setRotationFromQuaternion(new THREE.Quaternion(frameData[25],frameData[26],frameData[27],frameData[24]).normalize())
        ref.current.getObjectByName("mixamorigLeftUpLeg").setRotationFromQuaternion(new THREE.Quaternion(frameData[29],-frameData[30],-frameData[31],frameData[28]).normalize())
        //ref.current.getObjectByName("mixamorigLeftLeg").setRotationFromQuaternion(new THREE.Quaternion(frameData[33],frameData[34],frameData[35],frameData[32]).normalize())
        ref.current.getObjectByName("mixamorigHead").setRotationFromQuaternion(new THREE.Quaternion(frameData[37],frameData[38],frameData[39],frameData[36]).normalize())
    },[frameData])

    useFrame((state, delta) => {
        mixer?.update(delta)
    })
    // *************************

   

    return (
        <primitive 
            ref = {ref} 
            object={model.scene}
            scale={props.scale}
        />
    );
}

