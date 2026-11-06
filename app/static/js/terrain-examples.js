(() => {
  const point = document.querySelector('[data-example="point"]');
  const batch = document.querySelector('[data-example="batch"]');
  const status = document.querySelector("#terrain-request-status");
  const requestUrl = document.querySelector("#terrain-request-url");
  const output = document.querySelector("#terrain-response");
  const requestBody = document.querySelector("#terrain-batch-example");
  let activeRequest;

  async function run(url, options) {
    activeRequest?.abort();
    const controller = new AbortController();
    activeRequest = controller;
    const fullUrl = new URL(url, window.location.href).href;
    requestUrl.firstElementChild.textContent = (options?.method ?? "GET") + " " + fullUrl;
    requestUrl.hidden = false;
    status.textContent = "Requesting elevations…";
    output.hidden = true;
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(fullUrl, { ...options, signal: controller.signal });
      const body = await response.text();
      if (activeRequest !== controller) return;
      status.textContent = response.ok ? "Success: response shown below" : "Failure: HTTP " + response.status + ". Response shown below.";
      try {
        output.textContent = JSON.stringify(JSON.parse(body), null, 2);
      } catch {
        output.textContent = body;
      }
      output.hidden = false;
    } catch {
      if (activeRequest !== controller) return;
      status.textContent = controller.signal.aborted ? "Failure: the request timed out. Try again." : "Failure: could not reach the Terrain API. Try again.";
    } finally {
      clearTimeout(timeout);
    }
  }

  point.addEventListener("click", event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    void run(point.href);
  });
  batch.addEventListener("click", () => void run("/api/v1/elevations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: requestBody.textContent,
  }));
})();
