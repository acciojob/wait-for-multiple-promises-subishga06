const output = document.getElementById("output");

// Function to create a promise with random delay between 1–3 seconds
function createPromise(num) {
  const delay = Math.random() * 2 + 1; // 1–3 seconds

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: `Promise ${num}`,
        time: delay,
      });
    }, delay * 1000);
  });
}

// Create the three promises
const p1 = createPromise(1);
const p2 = createPromise(2);
const p3 = createPromise(3);

// Start time
const start = performance.now();

// Wait for all promises to resolve
Promise.all([p1, p2, p3]).then((results) => {
  const end = performance.now();

  // Total time = time the longest promise took
  const totalTime = (end - start) / 1000;

  // Remove loading row
  const loadingRow = document.getElementById("loading");
  if (loadingRow) loadingRow.remove();

  // Add each resolved promise row
  results.forEach((res) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${res.name}</td>
      <td>${res.time.toFixed(3)}</td>
    `;
    output.appendChild(row);
  });

  // Add total row
  const totalRow = document.createElement("tr");
  totalRow.innerHTML = `
    <td>Total</td>
    <td>${totalTime.toFixed(3)}</td>
  `;
  output.appendChild(totalRow);
});
