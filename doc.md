# Website Fingerprinting
## ~ Warm-up

![warmup](/public/warmup.png)

- **Calculate LINE SIZE:** LINE SIZE = CACHE LINE SIZE BYTES / 4 = 128 / 4 = 32
- **Loop Iterations:**
  - log10(maxCacheLines) / log10(10)
  - log10(10,000,000) / log10(10)
  - ≈ 7
- **Calculate Total Cache Accesses:**
  - (1 * LINE SIZE) + (10 * LINE SIZE) + ... + (maxCacheLines * LINE SIZE)
  - LINE SIZE * (1 + 10 + 100 + ... + maxCacheLines)
  - ≈ LINE SIZE * Sum of powers of 10
  - ≈ 32 * 111,111,110.8888889
  - ≈ 3555555548.44

---

## ~ Side Channel Attacks with JavaScript
#### 1. Trace Collection Method:

- **Trace 1: Do Nothing During Collection**
  - This trace reflects the system’s behavior when no deliberate activity is performed during the collection process. It serves as a baseline or reference point for comparison with traces collected under different conditions.
- **Trace 2: Adding Random System Activity (Moving the Mouse)**
  - In this trace, random system activity is introduced by moving the mouse during the collection process. This additional activity alters the system’s resource utilization and behavior, potentially affecting performance metrics such as CPU usage, disk I/O, and memory allocation. The trace captures the impact of this random activity on system behavior.
- **Trace 3: Opening nytimes.com in a New Window**
  - This trace reflects the system’s response to a specific event: opening the nytimes.com website in a new browser window. Such an action triggers network activity, browser rendering, JavaScript execution, and potential interactions with browser extensions or plugins. The trace provides insight into how the system handles web browsing activities and the associated resource consumption.

### 2. Important Parameters:

- **Trace Collection Method:**
  - The program measures the number of traversals through a predefined set of memory addresses within each interval. It records how many times these addresses are accessed during each interval.
  - The program calculates the number of memory accesses that fit into a cache line and then repeats these accesses until the current interval ends.

- **Parameters:**
  - TRACE LENGTH: The duration of the trace, in milliseconds. This variable is initialized when the program receives a message from the main thread indicating the length of the trace.
  - T: Array to store the trace values. It’s initially set to undefined and later overwritten to store the number of traversals through memory addresses during each interval.
  - start: Timestamp of when the trace recording starts. cacheLineSizeBytes: Size of the cache line in bytes. It’s set to 128 bytes.
  - N: Number of memory addresses needed to fill the cache line. Calculated as the cache line size divided by 4 bytes (assuming each address occupies 4 bytes).
  - P: Length of each interval in milliseconds. This determines how long the program measures memory accesses within each interval.
  - intervals: Number of intervals calculated based on the total duration of the trace (TRACE LENGTH) and the interval length (P).

- **Memory Access Simulation:**
  - Within each interval, the program simulates memory accesses for all N addresses. It repeats this process until the interval ends.
  - Each time all N addresses are accessed, it counts it as a traversal.
  - The count of traversals for each interval is stored in the T array.

- **Trace Output:**
  - After completing the trace collection, the program sends the resulting array (T) to the main thread using postMessage().

![web-fingerprinting](/public/web-fingerprinting.png)

The analyzed simple statistics (mean, median, etc.) on the traces from google.com and nytimes.com are:

- **Mean:** 31505.032
- **Median:** 31685.0
- **Standard Deviation:** 2180.5242863187746
- **Variance:** 4754686.163226001

The python file used here is `analyze trace data.py`

![lab-1](/public/lab-1.png)

---

## ~ Root Cause Analysis

![lab-2](/public/lab-2.png)

- Comparing the accuracy numbers between Part 2 and Part 3, we see a decrease in accuracy in Part 3. In Part 2, the overall accuracy was 0.83, whereas in Part 3, it decreased to 0.80.
- As for whether the "cache-occupancy" attack actually exploits a cache side-channel, Since the memory accesses were removed in Part 3, it’s unlikely that the attack directly exploits a cache side-channel. Cache side-channel attacks typically involve exploiting timing or other variations in cache access patterns to infer sensitive information. Since memory accesses, which are often associated with cache side-channel attacks, were removed, it’s logical to assume that the attack does not rely on a cache side-channel.
- A possible root cause of the decreased accuracy in Part 3 could be the removal of memory accesses. Memory accesses can provide additional information about the behavior of the target websites and their resource usage patterns, which could contribute to more accurate website fingerprinting. By removing memory accesses, the attack may lose valuable information necessary for accurately distinguishing between websites based on cache occupancy patterns alone.

---

## ~ Bypassing Mitigations

![lab-3](/public/lab-3.png)

- In Part 2, the overall accuracy was 0.83, whereas in Part 4, it decreased to 0.67. So, the accuracy decreased by 0.16 in Part 4 compared to Part 2.
- Noise injection as a countermeasure appears to be effective in reducing the accuracy of the attack. By adding noise to the system, it becomes more challenging for the attacker to accurately recover the original signal, leading to a decrease in accuracy of the website fingerprinting attack.
- To defeat this countermeasure, attackers might employ more sophisticated techniques to filter out the added noise and extract the underlying signal. This could involve advanced machine learning algorithms that are robust to noise or developing new attack strategies that exploit vulnerabilities in the noise injection mechanism itself. Additionally, attackers might explore alternative sources of information or features that are less affected by the injected noise, allowing them to still differentiate between websites effectively.

### Discussion:

To enhance the attacker’s capabilities and potentially overcome the noise injection countermeasure, I propose the following changes:

- **Use Advanced Algorithms:** Employ robust machine learning algorithms like Gradient Boosting Machines (GBM), XGBoost, or deep learning models such as CNNs or RNNs with attention mechanisms.
- **Feature Engineering:** Engineer features that are less affected by noise, such as relative changes in cache occupancy over time or frequency-domain features extracted using Fourier Transform or Wavelet Transform.
- **Adversarial Training:** Augment training data with adversarially crafted examples to improve model robustness to noise and adversarial perturbations.
- **Ensemble Learning:** Combine predictions from multiple models trained on different subsets of data or using different algorithms to improve robustness and generalization.

These changes should help the attacker overcome noise injection by improving the model’s ability to handle noisy data, adapt to unseen scenarios, and capture complex relationships in the data.

### Exploration:

![lab-4](/public/lab-4.png)

In my exploration, I ventured into tweaking parameters within Python code, such as "trace length." Though I must admit, my proficiency in implementing machine learning or deep learning techniques is still a work in progress. Despite my limited expertise, I diligently experimented with these adjustments. However, the outcomes unfortunately did not yield significant improvements.

---

