class SequenceElement {
    constructor(number, age) {
        this.number = number;
        this.age = age;
    }

    resetAge(age) {
        this.age = age;
    }

    toString() {
        return `{ Number=${this.number} }`;
    }
}

class Block {
    constructor(wordsPerBlock) {
        this.sequences = new Array(wordsPerBlock).fill(null);
        this.currentIndex = 0;
    }

    addElement(element) {
        if (this.currentIndex < this.sequences.length) {
            this.sequences[this.currentIndex++] = element;
            console.log(`Added element ${element} to block.`);
            return true;
        } else {
            return false;
        }
    }

    replaceElement(element) {
        let indexWithHighestAge = -1;
        let highestAge = -1;

        for (let i = 0; i < this.sequences.length; i++) {
            if (this.sequences[i] && this.sequences[i].age > highestAge) {
                highestAge = this.sequences[i].age;
                indexWithHighestAge = i;
            }
        }

        if (indexWithHighestAge !== -1) {
            console.log(`Replacing element ${this.sequences[indexWithHighestAge]} with ${element}`);
            this.sequences[indexWithHighestAge] = element;
            return true;
        }
        return false;
    }

    getSequences() {
        return this.sequences;
    }

    toString() {
        return `[${this.sequences.map(seq => (seq ? `{ Number=${seq.number} }` : 'null')).join(', ')}]`;
    }
}

class Set {
    constructor(setSize, wordsPerBlock) {
        this.blocks = Array.from({ length: setSize }, () => new Block(wordsPerBlock));
    }

    addElement(element) {
        console.log(`Attempting to add element ${element} to the set.`);

        for (let block of this.blocks) {
            for (let i = 0; i < block.getSequences().length; i++) {
                let seq = block.getSequences()[i];
                if (seq && seq.number === element.number) {
                    console.log(`Replacing element ${seq} with ${element}`);
                    block.getSequences()[i] = element;
                    return true; // Hit
                }
            }
        }

        for (let block of this.blocks) {
            if (block.addElement(element)) {
                return false; // Miss
            }
        }

        let blockWithHighestAge = null;
        let highestAge = -1;

        for (let block of this.blocks) {
            for (let seq of block.getSequences()) {
                if (seq && seq.age > highestAge) {
                    highestAge = seq.age;
                    blockWithHighestAge = block;
                }
            }
        }

        if (blockWithHighestAge) {
            blockWithHighestAge.replaceElement(element);
            return false; // Miss
        }

        return false; // Should never reach here
    }

    getBlocks() {
        return this.blocks;
    }

    toString() {
        return this.blocks.map((block, index) => `Block ${index}: ${block.toString()}`).join('\n');
    }
}

class CacheSimulation {
    constructor(numberOfSets, setSize, wordsPerBlock) {
        this.cacheSets = Array.from({ length: numberOfSets }, () => new Set(setSize, wordsPerBlock));
        this.hitCounter = 0;
        this.missCounter = 0;
        this.wordsPerBlock = wordsPerBlock;
    }

    distributeSequence(sequence) {
        sequence.forEach((number, age) => {
            let element = new SequenceElement(number, age);
            console.log(`Distributing element ${element}`);

            let setIndex = number % this.cacheSets.length;
            console.log(`Element ${number} maps to Set ${setIndex}`);

            let isHit = this.cacheSets[setIndex].addElement(element);
            if (isHit) {
                this.hitCounter++;
                console.log(`Hit! Total hits: ${this.hitCounter}`);
            } else {
                this.missCounter++;
                console.log(`Miss! Total misses: ${this.missCounter}`);
            }

            console.log('Current state of cache sets:');
            this.printCache();
        });
    }

    printCache() {
        this.cacheSets.forEach((cacheSet, index) => {
            console.log(`Cache Set ${index + 1}:`);
            console.log(cacheSet.toString());
        });
    }

    printStatistics() {
        let total = this.hitCounter + this.missCounter;
        let hitRate = this.hitCounter / total;
        let missRate = this.missCounter / total;

        let missPenalty = 1 + (this.wordsPerBlock * 10) + 1;
        let averageAccessTime = (hitRate * 1) + (missRate * missPenalty);
        let totalAccessTime = (this.hitCounter * this.wordsPerBlock * 1) + (this.missCounter * this.wordsPerBlock * 11) + (this.missCounter * 1);

        console.log(`Hit Rate: ${hitRate}`);
        console.log(`Miss Rate: ${missRate}`);
        console.log(`Miss Penalty: 1 + (${this.wordsPerBlock} * 10) + 1 = ${missPenalty} ns`);
        console.log(`Average Access Time: (${hitRate} * 1) + (${missRate} * ${missPenalty}) = ${averageAccessTime} ns`);
        console.log(`Total Access Time: (${this.hitCounter} * ${this.wordsPerBlock} * 1) + (${this.missCounter} * ${this.wordsPerBlock} * 11) + (${this.missCounter} * 1) = ${totalAccessTime} ns`);

        return {
            hitRate,
            missRate,
            missPenalty,
            averageAccessTime,
            totalAccessTime
        };
    }

    generateSnapshot() {
        return this.cacheSets.map((cacheSet, index) => `Cache Set ${index + 1}:\n${cacheSet.toString()}`).join('\n');
    }
}

// Variables for form inputs
const blockSizeInput = document.querySelector('input[name="block_size"]');
const setSizeInput = document.querySelector('input[name="set_size"]');
const mmMemorySizeInput = document.querySelector('input[name="mm_memory_size"]');
const cacheMemorySizeInput = document.querySelector('input[name="cache_memory_size"]');
const wordSizeInput = document.querySelector('input[name="word_size"]');

// Radio buttons for MM Mode
const mmWordMode = document.getElementById('mmWord');
const mmBlockMode = document.getElementById('mmBlock');

// Radio buttons for Cache memory Mode
const cmWordMode = document.getElementById('cmWord');
const cmBlockMode = document.getElementById('cmBlock');

// Sequence input
const sequenceInput = document.getElementById('sequence-input');

// Output fields
const cacheHitsOutput = document.getElementById('cache-hits');
const cacheMissesOutput = document.getElementById('cache-misses');
const missPenaltyOutput = document.getElementById('miss-penalty');
const averageAccessOutput = document.getElementById('average-access');
const snapshotOutput = document.getElementById('snapshot');
const totalAccessOutput = document.getElementById('total-access');

// Export button
const exportButton = document.getElementById('export-button');

// Function to handle form submission or any actions
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cache-sim-form');
    const sequenceInput = document.getElementById('sequence-input');
    const randomRadio = document.getElementById('showRandom');
    const manualRadio = document.getElementById('showManual');

    // Input validation for numbers only
    form.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    // Enable/disable sequence input based on selected mode
    randomRadio.addEventListener('change', function() {
        if (this.checked) {
            sequenceInput.disabled = true;
            sequenceInput.value = ''; // Clear the input field

            // Generate a random sequence and display it in the textarea
            let randomSequence = [];
            for (let i = 0; i < 12; i++) {
                randomSequence.push(Math.floor(Math.random() * 100));
            }
            sequenceInput.value = randomSequence.join(', ');
        }
    });

    manualRadio.addEventListener('change', function() {
        if (this.checked) {
            sequenceInput.disabled = false;
            sequenceInput.value = ''; // Clear the input field
        }
    });

    // Initial state: random is selected, sequence input is disabled and populated with random values
    if (randomRadio.checked) {
        let randomSequence = [];
        for (let i = 0; i < 12; i++) {
            randomSequence.push(Math.floor(Math.random() * 100));
        }
        sequenceInput.value = randomSequence.join(', ');
    } else {
        sequenceInput.disabled = randomRadio.checked;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the input values
        const blockSize = Number(blockSizeInput.value);
        const setSize = Number(setSizeInput.value);
        const wordSize = Number(wordSizeInput.value);
        const cacheMemorySize = Number(cacheMemorySizeInput.value);
        const mmMemorySize = Number(mmMemorySizeInput.value);

        // Validate that required fields are filled out
        if (!blockSize || !setSize || !wordSize) {
            alert("Please ensure that block size, set size, and word size are all filled out.");
            return;
        }

        // Validate sequence length against MM Memory Size if word mode is selected
        let sequenceArray = sequenceInput.value.split(/[\s,]+/).map(Number);
        if (mmWordMode.checked && sequenceArray.length !== mmMemorySize) {
            alert(`Error: The number of sequence elements (${sequenceArray.length}) does not match the specified MM Memory Size (${mmMemorySize}).`);
            return;
        }

        // Validate number of blocks in sequence against MM Memory Size if block mode is selected
        if (mmBlockMode.checked) {
            const numberOfBlocks = Math.ceil(sequenceArray.length / wordSize);
            if (numberOfBlocks !== mmMemorySize) {
                alert(`Error: The number of blocks (${numberOfBlocks}) calculated from the sequence does not match the specified MM Memory Size (${mmMemorySize}).`);
                return;
            }
        }

        // Validate cache memory size if block mode is selected for cache memory
        if (cacheMemorySize && cmBlockMode.checked) {
            const calculatedCacheBlocks = blockSize * setSize;
            if (calculatedCacheBlocks !== cacheMemorySize) {
                alert(`Error: Cache memory size (${cacheMemorySize} blocks) does not match the product of block size (${blockSize}) and set size (${setSize}), which is ${calculatedCacheBlocks} blocks. Please adjust the values.`);
                return;
            }
        }

        // Check if cache memory size is provided and in word mode
        if (cacheMemorySize && cmWordMode.checked) {
            const calculatedCacheSize = blockSize * setSize * wordSize;

            if (calculatedCacheSize !== cacheMemorySize) {
                alert(`Error: Cache memory size (${cacheMemorySize} words) does not match the product of block size, set size, and word size (${calculatedCacheSize} words). Please adjust the values.`);
                return;
            }
        }

        if (manualRadio.checked) {
            sequenceArray = sequenceInput.value.split(/[\s,]+/).map(Number);
        } else {
            // Use the random sequence already displayed in the textarea
            sequenceArray = sequenceInput.value.split(/[\s,]+/).map(Number);
        }

        // Initialize the Cache Simulation
        const cacheSimulation = new CacheSimulation(setSize, blockSize, wordSize);

        // Distribute the sequence
        cacheSimulation.distributeSequence(sequenceArray);

        // Print the statistics
        const stats = cacheSimulation.printStatistics();

        // Update the output fields
        cacheHitsOutput.value = cacheSimulation.hitCounter;
        cacheMissesOutput.value = cacheSimulation.missCounter;
        missPenaltyOutput.value = stats.missPenalty;
        averageAccessOutput.value = stats.averageAccessTime;
        totalAccessOutput.value = stats.totalAccessTime;

        // Update the snapshot area
        snapshotOutput.value = cacheSimulation.generateSnapshot();
    });

    exportButton.addEventListener('click', function() {
        const snapshotContent = snapshotOutput.value;
        const blob = new Blob([snapshotContent], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = 'snapshot.txt';
        anchor.click();
        URL.revokeObjectURL(anchor.href);
    });
});
