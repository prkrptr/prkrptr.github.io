# Cache simulator (Block-set-associative / MRU
### Gomez, Dominic Joel ; Parker, Peter B. ; Togado, Dalrianne Francesca
### CSARCH2 - S13
### Cache System Specifications

---
### Input:
- [x] Block size, 
- [x] set size, 
- [x] MM memory size (accept both blocks and words), 
- [x] Cache memory size (accept both blocks and words)
- [ ] Program flow to be simulated (accept both blocks and words) and other parameters deemed needed.

### Output:
- [x] number of cache hits
- [x] number of cache miss
- [x] miss penalty
- [x] average memory
- [x] access time
- [x] total memory access time
- [x] snapshot of the cache memory.
- [x] With option to output result in text file.


--- 
TODO: Screenshot of program outputs
Testcases that will cover the specifications (Normal, special case, different inputs)
1st Test case:
Cache has 4 blocks, set size is 2 blocks, block size is 2 words
Input: 1, 7, 5, 0, 2, 1, 5, 6, 5, 2, 2, 0
Output:
1. Cache Hits: 5/12 = 0.42
2. Cache Miss: 7/12 = 
3. Miss Penalty: 1ns + 20ns + 1 ns = 22ns
4. Average Memory Access Time: 0.42 * 1ns + 0.58 * 22ns = 13.25ns
5. Total Memory Access Time: 5*2*1ns + 7*2*11ns + 7*1ns = 164ns + 7ns = 171ns
6. Snapshot of cache memory:

| SET | BLOCK (0) | BLOCK (1) |
|-----|----------|-----------|
| 0   | 0        | 2         |
| 1   | 1        | 5         |
- TODO: ADD MORE TEST CASES

NOTES/ISSUES:
- can increase block size whenever ( and this increases the miss penalty
ave and total memo access time) (idk if this is correct or no)
- When main memory size or cache memory size is in word mode, 
  - i assumed it had to be converted into blocks so words * (1 block / block size)
    - kindly confirm


TODO: Documentation 
GitHub link of Application Repository (source code, readme file/user’s manual,
documentation and analysis write-up, short video demonstration).
 Important:
o Make sure I can access the above links. Otherwise, your score will be 0.0.
o Readme/Documentation write-up should include screenshot/s of the program output/s (all
possible test cases that will cover the specifications (normal, special case, different
inputs, etc.)

    


