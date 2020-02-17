const API_URL = "http://localhost:4000";

export const listEntrys = async () => {
  const res = await fetch(`${API_URL}/log`);
  return res.json();
};

export const createEntry = async entry => {
  const res = await fetch(`${API_URL}/log`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(entry)
  });
  return res.json();
};
