# CSARCH2 Cache simulator (Block-set-associative / MRU
### Gomez, Dominic Joel ; Parker, Peter B. ; Togado, Dalrianne Francesca

### Cache System Specifications

---
- Input: Block size, set size, MM memory size (accept both blocks and words), cache
  memory size (accept both blocks and words), program flow to be simulated (accept both
  blocks and words) and other parameters deemed needed.

- Output: number of cache hits, number of cache miss, miss penalty, average memory
  access time, total memory access time, snapshot of the cache memory. With option to
  output result in text file.
- 

--- 
Screenshot of program outputs
Testcases that will cover the specifications (Normal, special case, different inputs)
1st Test case:
Cache has 4 blocks, set size is 2 blocks, block size is 2 words
Input: 1, 7, 5, 0, 2, 1, 5, 6, 5, 2, 2, 0
Output:
1. Cache Hits: 5/12 = 0.42
2. Cache Miss: 7/12 = 
3. Miss Penalty: 1ns + 20ns + 1 ns = 22ns
4. Average Memory Access Time: 0.42 * 1ns + 0.58 * 22ns = 13.25ns
5. Total Memory Access Time: 5*2*2ns + 7*2*11ns + 7*1ns = 164ns + 7ns = 171ns
6. Snapshot of cache memory:
| SET | BLOCK 0 | BLOCK 1 |
|  0  |    0    |    2    |
|  1  |    1    |    5    |
TODO: ADD MORE TEST CASES

    TODO: Documentation
    GitHub link of Application Repository (source code, readme file/user’s manual,
    documentation and analysis write-up, short video demonstration).
     Important:
    o Make sure I can access the above links. Otherwise, your score will be 0.0.
    o Readme/Documentation write-up should include screenshot/s of the program output/s (all
    possible test cases that will cover the specifications (normal, special case, different
    inputs, etc.)

    


