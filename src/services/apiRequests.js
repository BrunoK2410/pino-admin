class ApiRequests {
  getData(type, signal) {
    return fetch(
      `https://pino-nmpb-default-rtdb.europe-west1.firebasedatabase.app/${type}.json`,
      {
        method: "GET",
        signal: signal,
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        const result = [];
        for (const key in data) {
          result.push({ id: key, ...data[key] });
        }
        return result.sort((a, b) => {
          const dateA = new Date(a["timestamp"]);
          const dateB = new Date(b["timestamp"]);
          return dateB - dateA;
        });
      });
  }

  addNew(type, data, signal) {
    const token = localStorage.getItem("token");

    return fetch(
      `https://pino-nmpb-default-rtdb.europe-west1.firebasedatabase.app/${type}.json?auth=` +
        token,
      {
        method: "POST",
        signal: signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  update(type, id, data, signal) {
    const token = localStorage.getItem("token");

    return fetch(
      `https://pino-nmpb-default-rtdb.europe-west1.firebasedatabase.app/${type}/${id}.json?auth=` +
        token,
      {
        method: "PUT",
        signal: signal,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

  delete(type, id) {
    const token = localStorage.getItem("token");

    return fetch(
      `https://pino-nmpb-default-rtdb.europe-west1.firebasedatabase.app/${type}/${id}.json?auth=` +
        token,
      {
        method: "DELETE",
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }
}

export default new ApiRequests();
