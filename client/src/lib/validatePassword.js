export const isPasswordValid =(str)=> {
    return /^[a-zA-Z0-9_]+$/.test(str);
  }
