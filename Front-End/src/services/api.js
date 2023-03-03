const BASE_URL = 'https://example.com/api'; // replace with your API endpoint URL

async function postData(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

async function getData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`);
  return response.json();
}

async function putData(endpoint, data) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
}

async function deleteData(endpoint) {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: 'DELETE'
  });
  return response.json();
}

export { postData, getData, putData, deleteData };
