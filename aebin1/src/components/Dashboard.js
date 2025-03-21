import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from '../styles/Dashboard.module.css';
import { fetchWasteData } from '../controllers/dataService';

const Dashboard = () => {
  const wasteChartRef = useRef(null);
  const monthlyTrendRef = useRef(null);
  const impactChartRef = useRef(null);
  const efficiencyChartRef = useRef(null);

  useEffect(() => {
    // Ejemplo: podrías usar fetchWasteData para obtener datos externos
    fetchWasteData().then((data) => {
      console.log('Datos externos:', data);
      // Procesa y actualiza tus gráficos aquí si fuera necesario
    });

    // Distribución de residuos (gráfico pie)
    const wasteCtx = wasteChartRef.current.getContext('2d');
    new Chart(wasteCtx, {
      type: 'pie',
      data: {
        labels: ['Plástico', 'Papel', 'Vidrio', 'Orgánico', 'Metal', 'No Reciclable'],
        datasets: [
          {
            data: [30, 25, 15, 20, 5, 5],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#C9CBCF'],
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    // Tendencia mensual (gráfico de línea)
    const trendCtx = monthlyTrendRef.current.getContext('2d');
    new Chart(trendCtx, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Residuos Reciclables (kg)',
            data: [65, 70, 80, 81, 90, 95],
            borderColor: '#4CAF50',
            tension: 0.1,
            fill: false,
          },
        ],
      },
      options: { responsive: true, maintainAspectRatio: false },
    });

    // Impacto ambiental (gráfico de barras horizontal)
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

    // Eficiencia del sistema (gráfico doughnut)
    const efficiencyCtx = efficiencyChartRef.current.getContext('2d');
    new Chart(efficiencyCtx, {
      type: 'doughnut',
      data: {
        labels: ['Correctamente Clasificado', 'Error'],
        datasets: [
          {
            data: [95, 5],
            backgroundColor: ['#4CAF50', '#FF5722'],
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
