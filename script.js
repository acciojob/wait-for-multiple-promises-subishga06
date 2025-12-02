const output = document.getElementById("output");

// Add default loading row
output.innerHTML = `
  <tr id="loading-row">
    <td colspan="2" class="text-center">Loading...</td>
  </tr>
`;

// Function to create a promise with random delay
function createPromise(promiseNumber) {
  const delay = Math.random() * 2 + 1; // 1 to 3 seconds

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: `Promise ${promiseNumber}`,
        time: delay
      });
    }, delay * 1000);
  });
}

// Create 3 promises
const p1 = createPromise(1);
const p2 = createPromise(2);
const p3 = createPromise(3);

const startTime = performance.now();

// Resolve all promises
Promise.all([p1, p2, p3]).then((results) => {
  const endTime = performance.now();
  const totalTime = (endTime - startTime) / 1000; // Convert ms → s

  // Remove loading row
  document.getElementById("loading-row").remove();

  // Add results for each promise
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
