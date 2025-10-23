async function postJSON(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Quadratic Solver
const quadForm = document.getElementById("quad-form");
const quadResult = document.getElementById("quad-result");

quadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(quadForm);
  const data = Object.fromEntries(fd.entries());
  const res = await postJSON("/api/quadratic", data);
  quadResult.textContent = JSON.stringify(res, null, 2);
  plotQuadratic(parseFloat(data.a), parseFloat(data.b), parseFloat(data.c));
});

// Derivative Calculator
const derivForm = document.getElementById("deriv-form");
const derivResult = document.getElementById("deriv-result");

derivForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(derivForm);
  const res = await postJSON("/api/derivative", Object.fromEntries(fd.entries()));
  derivResult.textContent = `Derivative: ${res.result}`;
  if (window.MathJax) MathJax.typesetPromise();
});

// Plot Quadratic Function
function plotQuadratic(a, b, c) {
  const x = [];
  const y = [];
  for (let i = -10; i <= 10; i += 0.2) {
    x.push(i);
    y.push(a * i * i + b * i + c);
  }
  const trace = { x, y, mode: "lines", name: `y=${a}x²+${b}x+${c}` };
  Plotly.newPlot("plot", [trace], { title: "Quadratic Function" });
}
plotQuadratic(1, -3, 2);
