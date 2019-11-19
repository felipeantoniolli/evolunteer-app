import axios from 'axios';

/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
192.168.1.5
192.168.0.34
*/
const api = axios.create({
  baseURL: 'http://192.168.1.5:8000/api',
});

export default api;