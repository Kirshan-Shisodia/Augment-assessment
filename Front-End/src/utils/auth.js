import { postData } from './api';

async function login(email, password) {
  const user = { email, password };
  const response = await postData('login', user);
  return response;
}

async function signup(name, email, phone, password) {
  const user = { name, email, phone, password };
  const response = await postData('signup', user);
  return response;
}

export { login, signup };
