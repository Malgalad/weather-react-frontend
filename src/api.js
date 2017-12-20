export function getJSON(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then(json => Promise.reject(json));
      }
    });
}
