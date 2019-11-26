import axios from 'axios';
import getBaseApi from '../helpers/baseUrl';

/* Endereços para cada emulador/simulador:
** Genymotion:              http://10.0.3.2:3333/
** Emulador Android Studio: http://10.0.2.2:3333/
** Simulador IOS:           http://localhost:3333/
192.168.1.5
192.168.0.34
192.168.43.125
*/
const api = axios.create({
    baseURL: getBaseApi('api'),
});

export default api;
