// Duration of your trace, in milliseconds
let TRACE_LENGTH;

// Array of length TRACE_LENGTH with your trace's values
let T;

// Value of performance.now() when you started recording your trace
let start;

function record() {
  // Create empty array for saving trace values
  T = new Array(TRACE_LENGTH);

  // Fill array with -1 so we can be sure memory is allocated
  T.fill(-1, 0, T.length);

  // Save start timestamp
  start = performance.now();

  // Define the cache line size in bytes
  let cacheLineSizeBytes = 128;

  // Calculate the number of addresses to cover the entire cache line
  let N = cacheLineSizeBytes / 4;

  // Define the interval length P (in milliseconds)
  let P = 5; // Adjust P as needed

  // Calculate the number of intervals
  let intervals = Math.ceil(5000 / P);

  // Initialize throughput array to store counts of traversals
  T = new Array(intervals).fill(0);

  // Perform cache-occupancy attack within each interval
  for (let i = 0; i < intervals; i++) {
    // Record start time for the current interval
    let intervalStartTime = performance.now();

    let traversals = 0;

    // Repeat memory accesses until the current interval ends
    while (performance.now() - intervalStartTime < P) {
      // Simulate memory accesses for all N addresses
      for (let j = 0; j < N; j++) {
        let value = j;
      }
      // Count each traversal of the full buffer
      traversals++;
    }

    // Store the number of traversals in the throughput array for the current interval
    T[i] = traversals;
  }

  // Send result to main thread
  postMessage(JSON.stringify(T));
}

// DO NOT MODIFY BELOW THIS LINE -- PROVIDED BY COURSE STAFF
self.onmessage = (e) => {
  if (e.data.type === "start") {
    TRACE_LENGTH = e.data.trace_length;
    setTimeout(record, 0);
  }
};
