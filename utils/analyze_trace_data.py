import json
import numpy as np

with open("part4/traces-4.1.json", "r") as f:
    # Load contents from file as JSON data
    data = json.loads(f.read())

    # Convert 2D array into Numpy for data processing
    traces = np.array(data["traces"])
    
    # Labels are only available with the automation script.
    # Use the line below in part 2.2 onward to access them.
    # labels = data["labels"]

# Example data analysis
print('Mean: ', np.mean(traces))
print('Median: ', np.median(traces))
print('Standard Deviation: ', np.std(traces))
print('Variance: ', np.var(traces))
