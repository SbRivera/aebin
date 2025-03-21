// src/controllers/dataService.js
export const fetchWasteData = async () => {
    try {
      const response = await fetch('/data.json');
      if (!response.ok) throw new Error('Error al obtener datos');
      return await response.json();
    } catch (error) {
      console.error('fetchWasteData:', error);
      return null;
    }
  };
  