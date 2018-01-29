**Performance results**

Run on a MacBook Pro (Late 2013) 2,8 GHz Intel Core i7.

```
dataflow for 1000000 source events
-----------------------------------------------
cb-basics     6.21 op/s ±  0.97%   (34 samples)
xstream       3.19 op/s ±  0.82%   (20 samples)
most         14.21 op/s ±  1.55%   (66 samples)
rx 5          2.02 op/s ±  4.78%   (15 samples)
rx 4          0.30 op/s ±  7.72%    (6 samples)
bacon         0.30 op/s ±  1.39%    (6 samples)
-----------------------------------------------
```

On micro benchmarks (such as filter-map-fusion, combine, fold), cb-basics fairs worse than xstream and rx 5, but in the same order of magnitude as xstream. The dataflow benchmark (above) is more realistically matching a real use case.
