import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '../styles/Dashboard.module.css';
import { fetchWasteData } from '../controllers/dataService';
import WelcomeMessage from './WelcomeMessage';

const Dashboard = () => {
  const [wasteData, setWasteData] = useState([30, 25, 15, 20, 5, 5]);
  const wasteChartRef = useRef(null);
  const monthlyTrendRef = useRef(null);
  const impactChartRef = useRef(null);
  const efficiencyChartRef = useRef(null);
  const wasteChartInstance = useRef(null);

  // Función para actualizar datos (simulación)
  const updateCharts = (newData) => {
    if (wasteChartInstance.current) {
      wasteChartInstance.current.data.datasets[0].data = newData;
      wasteChartInstance.current.update();
    }
  };

  useEffect(() => {
    // Simula obtener datos dinámicos cada 10 segundos
    const interval = setInterval(() => {
      // Por ejemplo, se simulan datos aleatorios
      const newData = wasteData.map(val => Math.floor(val + (Math.random() * 10 - 5)));
      setWasteData(newData);
      updateCharts(newData);
    }, 10000);

    return () => clearInterval(interval);
  }, [wasteData]);

  useEffect(() => {
    // Aquí se puede integrar fetchWasteData para obtener datos externos reales.
    fetchWasteData().then((data) => {
      if (data && data.wasteDistribution) {
        setWasteData(data.wasteDistribution);
        updateCharts(data.wasteDistribution);
      }
    });

    // Gráfico de distribución de residuos (tipo pie)
    const wasteCtx = wasteChartRef.current.getContext('2d');
    wasteChartInstance.current = new Chart(wasteCtx, {
      type: 'pie',
      data: {
        labels: ['Plástico', 'Papel', 'Vidrio', 'Orgánico', 'Metal', 'No Reciclable'],
        datasets: [
          {
            data: wasteData,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    // Configuración de otros gráficos (se omite actualización dinámica por simplicidad)
    const trendCtx = monthlyTrendRef.current.getContext('2d');
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Residuos Reciclables (kg)',
            data: [65, 70, 80, 81, 90, 95],
            borderColor: '#f05000',
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    const impactCtx = impactChartRef.current.getContext('2d');
    new Chart(impactCtx, {
      type: 'bar',
      data: {
        labels: ['CO2 Evitado', 'Agua Ahorrada', 'Energía Conservada'],
        datasets: [
          {
            label: 'Impacto Ambiental',
            data: [120, 80, 150],
            backgroundColor: '#2196F3',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
      },
    });

    const efficiencyCtx = efficiencyChartRef.current.getContext('2d');
    new Chart(efficiencyCtx, {
      type: 'doughnut',
      data: {
        labels: ['Correctamente Clasificado', 'Error'],
        datasets: [
          {
            data: [95, 5],
            backgroundColor: ['#f05000', '#FF5722'],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }, []);

  return (
    <section className={styles.dashboardSection}>
      <h2>Dashboard de Métricas</h2>
      <p>Información detallada sobre clasificación de residuos en tiempo real</p>
      {/* Mensaje de bienvenida animado */}
      <WelcomeMessage />
      <div className={styles.dashboardGrid}>
        <div className={styles.metricCard}>
          <h3>Distribución de Residuos</h3>
          <p>Clasificación por categorías</p>
          <div className={styles.chartContainer}>
            <canvas ref={wasteChartRef}></canvas>
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3>Tendencia Mensual</h3>
          <p>Evolución de residuos recolectados</p>
          <div className={styles.chartContainer}>
            <canvas ref={monthlyTrendRef}></canvas>
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3>Impacto Ambiental</h3>
          <p>Reducción de huella de carbono</p>
          <div className={styles.chartContainer}>
            <canvas ref={impactChartRef}></canvas>
          </div>
        </div>
        <div className={styles.metricCard}>
          <h3>Eficiencia del Sistema</h3>
          <p>Precisión de clasificación</p>
          <div className={styles.chartContainer}>
            <canvas ref={efficiencyChartRef}></canvas>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
