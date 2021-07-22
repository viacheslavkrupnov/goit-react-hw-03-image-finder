function fetchPixabay(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=21862781-55956ee72f3a06fc28e1330b7&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No response from server`));
  });
}

const api = { fetchPixabay };

export default api;
