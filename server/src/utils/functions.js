export const isUsernameValid =(str)=> {
    return /^[a-zA-Z0-9_]+$/.test(str);
  }

  export const generateRandomPassword = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}