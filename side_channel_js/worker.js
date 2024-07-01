// Duration of your trace, in milliseconds
let INTERVAL_LENGTH = 5; // ms
let TRACE_LENGTH = 5000;

// Array of length TRACE_LENGTH with your trace's values
let T;

// Value of performance.now() when you started recording your trace
let start;

function record() {
  console.log("In Recording Mode");

  // Create empty array for saving trace values
  T = new Array(TRACE_LENGTH);

  // Fill array with -1 so we can be sure memory is allocated
  T.fill(-1, 0, T.length);

  const LLC_SIZE = 64; // Set your determined LLC size
  
  const buffer = new Array(LLC_SIZE).fill(0); // Large buffer 

  let index = 0;
  let val = 0;

  // Save start timestamp
  start = performance.now();

  // TODO (Exercise 2-2): Record data for TRACE_LENGTH seconds and save values to T.
  for(i = 0; i< TRACE_LENGTH; i++)  {
      let count = 0;
      const intervalStart = performance.now();
      console.log(count);
      while (performance.now() - intervalStart < INTERVAL_LENGTH) {
          // console.log(performance.now());
          // Access buffer elements (ideally with a stride)
          for (let i = 0; i < buffer.length; i++) { 
              let val = buffer[i];
          }
          count++; 
      }

      T[index++] = count; 
  }
  console.log(T, start, index, TRACE_LENGTH, INTERVAL_LENGTH);
  // Once done recording, send result to main thread
  postMessage(JSON.stringify(T));
}

// DO NOT MODIFY BELOW THIS LINE -- PROVIDED BY COURSE STAFF
self.onmessage = (e) => {
  if (e.data.type === "start") {
    TRACE_LENGTH = e.data.trace_length;
    setTimeout(record, 0);
  }
};