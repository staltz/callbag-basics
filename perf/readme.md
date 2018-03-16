## Performance results

Run on a MacBook Pro (Late 2013) 2,8 GHz Intel Core i7, node `v8.9.4`. These are **micro**benchmarks, except for the `dataflow` benchmark which more realistically reflects an application with streams.

### dataflow

```
dataflow for 1000000 source events
-----------------------------------------------
cb-basics     6.53 op/s ±  3.68%   (35 samples)
xstream       3.71 op/s ±  4.02%   (22 samples)
most         13.06 op/s ±  1.84%   (62 samples)
rx 5          4.17 op/s ±  5.74%   (24 samples)
rx 4          0.33 op/s ±  1.72%    (6 samples)
bacon         0.57 op/s ±  3.16%    (7 samples)
-----------------------------------------------
```

### merge

```
merge 100000 x 10 streams
-----------------------------------------------
cb-basics    30.36 op/s ±  1.48%   (70 samples)
xstream      24.44 op/s ±  2.19%   (59 samples)
most        134.42 op/s ± 19.27%   (60 samples)
rx 5         22.99 op/s ±  2.38%   (57 samples)
rx 4          0.99 op/s ±  2.81%   (10 samples)
kefir        12.46 op/s ±  2.06%   (60 samples)
bacon         1.19 op/s ±  3.71%   (10 samples)
lodash       18.08 op/s ±  2.27%   (35 samples)
Array        38.14 op/s ±  3.48%   (52 samples)
-----------------------------------------------
```

## combine

```
combine(add3) -> filter 500000 x 3 integers
-----------------------------------------------
cb-basics    21.09 op/s ±  1.45%   (52 samples)
xstream      27.23 op/s ±  2.04%   (65 samples)
most         62.86 op/s ±  0.86%   (72 samples)
rx 5         32.06 op/s ±  3.04%   (74 samples)
-----------------------------------------------
```

## filter-map-reduce

```
filter -> map -> reduce 1000000 integers
-----------------------------------------------
cb-basics    33.45 op/s ±  0.80%   (55 samples)
xstream      16.16 op/s ±  1.40%   (42 samples)
most        368.43 op/s ±  1.64%   (83 samples)
rx 5         18.59 op/s ±  2.25%   (47 samples)
rx 4          1.14 op/s ±  1.10%   (10 samples)
kefir        10.31 op/s ±  1.62%   (52 samples)
bacon         1.14 op/s ±  5.43%   (10 samples)
highland      6.21 op/s ±  2.99%   (33 samples)
lodash       17.63 op/s ±  2.57%   (33 samples)
Array         4.28 op/s ±  3.50%   (15 samples)
-----------------------------------------------
```

## fold

```
scan -> reduce 1000000 integers
-----------------------------------------------
cb-basics    20.43 op/s ±  1.70%   (51 samples)
xstream      14.23 op/s ±  1.57%   (67 samples)
most        300.40 op/s ±  0.62%   (84 samples)
rx 5         16.02 op/s ±  2.20%   (75 samples)
rx 4          1.11 op/s ±  1.70%   (10 samples)
kefir        13.67 op/s ± 11.26%   (68 samples)
bacon         0.76 op/s ± 12.50%    (8 samples)
highland      6.73 op/s ±  2.29%   (36 samples)
lodash        6.70 op/s ± 10.24%   (21 samples)
Array         2.55 op/s ±  1.43%   (11 samples)
-----------------------------------------------
```


## filter-map-fusion

```
filter -> map -> fusion 1000000 integers
-----------------------------------------------
cb-basics    19.74 op/s ±  1.65%   (49 samples)
xstream      21.93 op/s ±  1.81%   (54 samples)
most         88.61 op/s ±  1.24%   (79 samples)
rx 5         23.85 op/s ±  1.31%   (58 samples)
rx 4          0.93 op/s ±  1.80%    (9 samples)
kefir         7.26 op/s ±  2.07%   (39 samples)
bacon         0.90 op/s ±  3.71%    (9 samples)
highland      3.46 op/s ±  2.51%   (21 samples)
lodash       12.49 op/s ±  2.96%   (35 samples)
Array         1.27 op/s ±  1.91%    (8 samples)
-----------------------------------------------
```
