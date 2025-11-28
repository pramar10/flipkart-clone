const api = process.env.REACT_APP_API_URL;
export const generatePublicUrl = (fileName) => `${api}/public/${fileName}`;
