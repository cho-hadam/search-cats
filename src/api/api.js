const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async (keyword) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    if (res.status === 200) {
      return res.json();
    } else {
      console.error(`${res} Error: ${res.statusText}`);
    }
  },
  fetchCatDetails: async (id) => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    if (res.status === 200) {
      return res.json();
    } else {
      console.error(`${res} Error: ${res.statusText}`);
    }
  },
  fetchRandomCats: async () => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    if (res.status === 200) {
      return res.json();
    } else {
      console.error(`${res} Error: ${res.statusText}`);
    }
  },
};

export default api;
