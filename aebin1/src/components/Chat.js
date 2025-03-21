// src/components/Chat.js
import React, { useState } from 'react';
import { queryDeepSeek } from '../controllers/deepSeekService';
import styles from '../styles/Chat.module.css';


const Avatar = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
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

    // Avatar: grupo que contiene cuerpo, ojos, pupilas y sonrisa
    const avatarGroup = new THREE.Group();

    // Cuerpo principal (esfera)
    const bodyGeometry = new THREE.SphereGeometry(5, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x4caf50, shininess: 30 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    avatarGroup.add(body);

    // Ojos
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

    // Boca (forma de toro para la sonrisa)
    const smileGeometry = new THREE.TorusGeometry(2, 0.3, 16, 32, Math.PI);
    const smileMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const smile = new THREE.Mesh(smileGeometry, smileMaterial);
    smile.position.set(0, -1, 4);
    smile.rotation.x = Math.PI / 2;
    smile.rotation.z = Math.PI;
    avatarGroup.add(smile);

    scene.add(avatarGroup);
    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      avatarGroup.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      avatarGroup.rotation.y = Math.sin(Date.now() * 0.0005) * 0.3;
      renderer.render(scene, camera);
    };
    animate();
  }, []);
}
const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy AE-BIN, tu asistente de reciclaje. ¿En qué puedo ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');

  // Función para agregar mensajes
  const addMessage = (sender, text) => {
    setMessages(prev => [...prev, { sender, text }]);
  };

  // Manejo de envío de mensaje
  const handleSend = async () => {
    if (!input.trim()) return;
    addMessage('user', input);
    const question = input;
    setInput('');
    const answer = await queryDeepSeek(question);
    addMessage('bot', answer);
    // Opcional: usar SpeechSynthesis para voz
    speakText(answer);
  };

  // Función para síntesis de voz
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    synth.speak(utterance);
  };

  // Función para reconocimiento de voz
  const handleVoiceInput = () => {
    if (!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setTimeout(handleSend, 500);
    };
    recognition.start();
  };

  return (
    <section className={styles.chatSection}>
      <h2>Asistente de Reciclaje</h2>
      <div className={styles.chatContainer}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${msg.sender === 'user' ? styles.user : styles.bot}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className={styles.inputArea}>
        <input
          type="text"
          placeholder="Escribe tu pregunta..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend}>Enviar</button>
        <button onClick={handleVoiceInput}>🎤</button>
      </div>
    </section>
  );
};

export default Chat;
