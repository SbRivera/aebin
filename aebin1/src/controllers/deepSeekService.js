// src/controllers/deepSeekService.js
export const queryDeepSeek = async (question) => {
    try {
      const response = await fetch('https://api.deepseek.com/v1/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir tu API key si es necesario
          // 'Authorization': 'Bearer TU_API_KEY'
        },
        body: JSON.stringify({ question })
      });
      if (!response.ok) throw new Error('Error en la consulta a DeepSeek');
      const data = await response.json();
      // Supongamos que la respuesta viene en data.answer
      return data.answer || 'Lo siento, no pude encontrar una respuesta.';
    } catch (error) {
      console.error('DeepSeek error:', error);
      return 'Ocurrió un error consultando la API de DeepSeek.';
    }
  };
  