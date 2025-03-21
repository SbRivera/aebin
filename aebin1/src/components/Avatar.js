import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import styles from '../styles/Avatar.module.css';

const Avatar = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Si ya existe una escena, evita reinicializarla
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(300, 300);

    // Luces
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Grupo para el avatar
    const avatarGroup = new THREE.Group();

    // Cuerpo principal: esfera
    const bodyGeometry = new THREE.SphereGeometry(5, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4caf50, shininess: 30 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    avatarGroup.add(body);

    // Ojos (dos esferas blancas)
    const eyeGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const eyeLeft = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeLeft.position.set(-1.5, 1, 4);
    avatarGroup.add(eyeLeft);
    const eyeRight = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeRight.position.set(1.5, 1, 4);
    avatarGroup.add(eyeRight);

    // Pupilas
    const pupilGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const pupilLeft = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupilLeft.position.set(-1.5, 1, 4.6);
    avatarGroup.add(pupilLeft);
    const pupilRight = new THREE.Mesh(pupilGeometry, pupilMaterial);
    pupilRight.position.set(1.5, 1, 4.6);
    avatarGroup.add(pupilRight);

    // Boca (una forma de toro invertido para la sonrisa)
    const smileGeometry = new THREE.TorusGeometry(2, 0.3, 16, 32, Math.PI);
    const smileMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, -1, 4);
    smile.rotation.x = Math.PI / 2;
    smile.rotation.z = Math.PI;
    avatarGroup.add(smile);

    scene.add(avatarGroup);
    camera.position.z = 15;

    // Animación: efecto "respiración"
    const animate = () => {
      requestAnimationFrame(animate);
      avatarGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      avatarGroup.rotation.y = Math.sin(Date.now() * 0.0005) * 0.3;
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <section className={styles.avatarSection}>
      <h2>Tu Asistente de Reciclaje Personal</h2>
      <p>Habla con EcoBot para conocer más sobre reciclaje y obtener estadísticas en tiempo real</p>
      <div className={styles.avatarContainer}>
        <canvas ref={canvasRef} />
      </div>
      {/* Aquí podrías incluir el componente de conversación, si deseas */}
    </section>
  );
};

export default Avatar;
