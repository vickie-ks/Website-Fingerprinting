const runs = 10;

function measureOneLine() {
  const LINE_SIZE = 128; // MAC cache line size
  let result = [];

  // Fill with -1 to ensure allocation
  const M = new Array(runs * LINE_SIZE).fill(-1);

  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    let val = M[i * LINE_SIZE];
    const end = performance.now();

    result.push(end - start);
  }

  return result;
}

function measureNLines() {
  const CACHE_LINE_SIZE_BYTES = 128; // MAC cache line size
  const maxCacheLines = 10000000; // Maximum number of cache lines to access
  const result = [];

  
  for (let N = 1; N <= maxCacheLines; N *= 10) {
    const start = performance.now()
    for (let j = 0; j < N; j++) {
      measureOneLine()
    }
    const end = performance.now();
    result.push(end - start);
  }
  
  return result;
}

document.getElementById(
  "exercise1-values"
).innerText = `1 Cache Line: [${measureOneLine().join(", ")}]`;

document.getElementById(
  "exercise2-values"
).innerText = `N Cache Lines: [${measureNLines().join(", ")}]`;