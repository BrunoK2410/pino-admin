class ApiRequests {
  login(data) {
    return fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEzVslo3fjmyLZm02vAJb0BYHznd03NPc",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    });
  }

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
        const date = type === "news" ? "date" : "timestamp";
        return result.sort((a, b) => {
          const dateA = new Date(a[date]);
          const dateB = new Date(b[date]);
          return dateB - dateA;
        });
      });
  }
}
export default new ApiRequests();
