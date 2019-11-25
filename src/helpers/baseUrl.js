export const getBaseUrl = (origin) => {
    const baseServerUrl = "http://192.168.0.34:8000/";
    switch (origin) {
        case 'baseUrl':
            return baseServerUrl;
        case 'api':
            return baseServerUrl + 'api/';
        case 'image':
            return baseServerUrl + 'storage/';
        default:
            return baseServerUrl;
    }
}

export default getBaseUrl;