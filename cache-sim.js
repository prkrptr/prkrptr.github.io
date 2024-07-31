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
    constructor() {
        this.element = null;
    }

    addElement(element) {
        if (this.element === null) {
            this.element = element;
            console.log(`Added element ${element} to block.`);
            return true;
        } else {
            return false;
        }
    }

    replaceElement(element) {
        console.log(`Replacing element ${this.element} with ${element}`);
        this.element = element;
        return true;
    }

    getElement() {
        return this.element;
    }

    toString() {
        return this.element ? `{ Number=${this.element.number} }` : 'null';
    }
}

class Set {
    constructor(setSize) {
        this.blocks = Array.from({ length: setSize }, () => new Block());
    }

    addElement(element) {
        console.log(`Attempting to add element ${element} to the set.`);

        for (let block of this.blocks) {
            let existingElement = block.getElement();
            if (existingElement && existingElement.number === element.number) {
                console.log(`Replacing element ${existingElement} with ${element}`);
                block.replaceElement(element);
                return true; // Hit
            }
        }

        for (let block of this.blocks) {
            if (block.addElement(element)) {
                return false; // Miss
            }
        }

        // If all blocks are full, replace the oldest element
        let oldestBlock = this.blocks.reduce((oldest, current) =>
            (current.getElement() && (!oldest.getElement() || current.getElement().age > oldest.getElement().age)) ? current : oldest
        );
        oldestBlock.replaceElement(element);
        return false; // Miss
    }

    getBlocks() {
        return this.blocks;
    }

    toString() {
        return this.blocks.map((block, index) =>
            `Block ${index}: ${block.getElement() ?
                `{ Number=${block.getElement().number}, Age=${block.getElement().age} }` :
                'null'}`
        ).join(', ');
    }
}

class CacheSimulation {
    constructor(cacheMemorySize, setSize, blockSize) {
        const numberofSets = cacheMemorySize / setSize;
        this.cacheSets = Array.from({ length: numberofSets }, () => new Set(setSize));
        this.hitCounter = 0;
        this.missCounter = 0;
        this.wordsPerBlock = blockSize;
        this.detailedLog = [];
    }

    distributeSequence(sequence) {
        sequence.forEach((number, age) => {
            let element = new SequenceElement(number, age);
            this.detailedLog.push(`Processing element ${element} (Age: ${age})`);

            let setIndex = number % this.cacheSets.length;
            this.detailedLog.push(`Element ${number} maps to Set ${setIndex}`);

            let isHit = this.cacheSets[setIndex].addElement(element);
            if (isHit) {
                this.hitCounter++;
                this.detailedLog.push(`Hit! Total hits: ${this.hitCounter}`);
            } else {
                this.missCounter++;
                this.detailedLog.push(`Miss! Total misses: ${this.missCounter}`);
            }

            this.detailedLog.push('Current state of cache:');
            this.detailedLog.push(this.getCacheState());
            this.detailedLog.push('-------------------');
        });
    }

    getCacheState() {
        return this.cacheSets.map((cacheSet, index) =>
            `Cache Set ${index}:\n${cacheSet.toString()}`
        ).join('\n');
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
        const stats = this.printStatistics();

        let snapshot = `Detailed Cache Operations:\n`;
        snapshot += this.detailedLog.join('\n');

        snapshot += `\n\nFinal Cache State:\n`;
        snapshot += this.getCacheState();

        snapshot += `\n\nStatistics:\n`;
        snapshot += `Number of Cache Hits: ${this.hitCounter}\n`;
        snapshot += `Number of Cache Misses: ${this.missCounter}\n`;
        snapshot += `Miss Penalty: ${stats.missPenalty} ns\n`;
        snapshot += `Average Memory Access Time: ${stats.averageAccessTime} ns\n`;
        snapshot += `Total Memory Access Time: ${stats.totalAccessTime} ns\n`;

        return snapshot;
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
    const randomRadio = document.getElementById('showRandom');  // Input Sequence
    const manualRadio = document.getElementById('showManual');  // Input Sequence
    const mmMemorySizeInput = document.querySelector('input[name="mm_memory_size"]');
    const cacheMemorySizeInput = document.querySelector('input[name="cache_memory_size"]');
    const blockSizeInput = document.querySelector('input[name="block_size"]');
    const mmWordMode = document.getElementById('mmWord');
    const mmBlockMode = document.getElementById('mmBlock');

    // Input validation for numbers only
    form.querySelectorAll('input[type="text"]').forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    });

    const generateRandomSequence = (size) => {
        let randomSequence = [];
        for (let i = 0; i < size; i++) {
            randomSequence.push(Math.floor(Math.random() * 100));
        }
        sequenceInput.value = randomSequence.join(', ');
    };

    const updateRandomSequence = () => {
        const mmMemorySize = Number(mmMemorySizeInput.value);
        const blockSize = Number(blockSizeInput.value);
        console.log('MM Memory Size:', mmMemorySize);
        console.log('Block Size:', blockSize);
        console.log('MM Word Mode:', mmWordMode.checked);
        console.log('MM Block Mode:', mmBlockMode.checked);
        if (mmWordMode.checked) {
            generateRandomSequence(mmMemorySize/ blockSize);
        } else if (mmBlockMode.checked) {
            const sequenceLength = mmMemorySize;
            generateRandomSequence(sequenceLength);
        }
    };

    // Enable/disable sequence input based on selected mode
    randomRadio.addEventListener('change', function() {
        if (this.checked) {
            sequenceInput.disabled = true;
            sequenceInput.value = ''; // Clear the input field
            updateRandomSequence();
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
        updateRandomSequence();
    } else {
        sequenceInput.disabled = randomRadio.checked;
    }

    // Update the form submission event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the input values
        const blockSize = Number(document.querySelector('input[name="block_size"]').value);
        const setSize = Number(document.querySelector('input[name="set_size"]').value);
        let cacheMemorySize = Number(cacheMemorySizeInput.value);
        const mmMemorySize = Number(mmMemorySizeInput.value);

        // Validate that required fields are filled out
        if (!blockSize || !setSize || !mmMemorySize || !cacheMemorySize) {
            alert("Please ensure that block size, set size, main memory size, and cache memory size are all filled out.");
            return;
        }

        // Validate cache memory size
        if (cacheMemorySize % setSize !== 0 && cmBlockMode.checked) {
            alert(`Error: Cache memory size (${cacheMemorySize} blocks) must be divisible by set size (${setSize} blocks).`);
            return;
        }

        const numberOfSets = cacheMemorySize / setSize;

        // Validate sequence length against MM Memory Size if word mode is selected
        let sequenceArray = sequenceInput.value.split(/[\s,]+/).map(Number);
        let specifiedMMSize = mmMemorySize/blockSize;
        if (mmWordMode.checked && sequenceArray.length !== specifiedMMSize) {
            alert(`Error: The number of sequence elements (${sequenceArray.length}) does not match the specified MM Memory Size (${specifiedMMSize}) word/s.`);
            return;
        }

        // Validate number of blocks in sequence against MM Memory Size if block mode is selected
        if (mmBlockMode.checked) {
            const numberOfBlocks = Math.ceil(sequenceArray.length);
            if (numberOfBlocks !== mmMemorySize) {
                alert(`Error: The number of blocks (${numberOfBlocks}) calculated from the sequence does not match the specified MM Memory Size (${mmMemorySize}).`);
                return;
            }
        }

        // // Validate cache memory size if block mode is selected for cache memory
        // if (cacheMemorySize && cmBlockMode.checked) {
        //     const calculatedCacheBlocks = blockSize * setSize;
        //     if (calculatedCacheBlocks !== cacheMemorySize) {
        //         alert(`Error: Cache memory size (${cacheMemorySize} blocks) does not match the product of block size (${blockSize}) and set size (${setSize}), which is ${calculatedCacheBlocks} blocks. Please adjust the values.`);
        //         return;
        //     }
        // }

        // Check if cache memory size is provided and in word mode
        if (cacheMemorySize && cmWordMode.checked) {
            const calculatedCacheSize = cacheMemorySize / blockSize; // Converts words to blocks
            // IDK if tama to

            if (calculatedCacheSize % setSize !== 0) {
                alert(`Error: Cache memory size (${cacheMemorySize} words) =>  (${calculatedCacheSize} blocks) must be divisible by set size (${setSize} blocks).`);
                return;
            }
            cacheMemorySize = calculatedCacheSize;
            // if (calculatedCacheSize !== cacheMemorySize) {
            //     alert(`Error: Cache memory size (${cacheMemorySize} words) does not match the product of block size, set size, (${calculatedCacheSize} words). Please adjust the values.`);
            //     return;
            // }
        }

        if (manualRadio.checked) {
            sequenceArray = sequenceInput.value.split(/[\s,]+/).map(Number);
        } else {
            // Use the random sequence already displayed in the textarea
            sequenceArray = sequenceInput.value.split(/[\s,]+/).map(Number);
        }

        // Initialize the Cache Simulation
        const cacheSimulation = new CacheSimulation(cacheMemorySize, setSize, blockSize);

        // Distribute the sequence
        cacheSimulation.distributeSequence(sequenceArray);

        // Print the statistics
        const stats = cacheSimulation.printStatistics();

        // Update the output fields
        document.getElementById('cache-hits').value = cacheSimulation.hitCounter;
        document.getElementById('cache-misses').value = cacheSimulation.missCounter;
        document.getElementById('miss-penalty').value = stats.missPenalty;
        document.getElementById('average-access').value = stats.averageAccessTime;
        document.getElementById('total-access').value = stats.totalAccessTime;

        // Update the snapshot area
        document.getElementById('snapshot').value = cacheSimulation.generateSnapshot();

        // Generate and display the cache memory grid
        generateCacheGrid(cacheSimulation.cacheSets);
    });

    document.getElementById('export-button').addEventListener('click', function() {
        const snapshotContent = document.getElementById('snapshot').value;
        const blob = new Blob([snapshotContent], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(blob);
        anchor.download = 'snapshot.txt';
        anchor.click();
        URL.revokeObjectURL(anchor.href);
    });

    // Update sequence when MM memory size or word size changes
    mmMemorySizeInput.addEventListener('input', function() {
        if (randomRadio.checked) {
            updateRandomSequence();
        }
    });
    // Update sequence when MM memory size or word size changes
    blockSizeInput.addEventListener('input', function() {
        if (randomRadio.checked) {
            updateRandomSequence();
        }
    });


    // Update sequence when MM memory mode changes
    mmWordMode.addEventListener('change', function() {
        if (randomRadio.checked) {
            updateRandomSequence();
        }
    });

    mmBlockMode.addEventListener('change', function() {
        if (randomRadio.checked) {
            updateRandomSequence();
        }
    });
});

function generateCacheGrid(cacheSets) {
    const gridContainer = document.getElementById('cache-memory-grid');
    gridContainer.innerHTML = '';

    const headerRow = document.createElement('div');
    headerRow.className = 'cache-row header-row';
    headerRow.innerHTML = '<div class="set-label-block">Set</div>';

    const blocksPerSet = cacheSets[0].getBlocks().length;
    for (let i = 0; i < blocksPerSet; i++) {
        headerRow.innerHTML += `<div class="block-header">Block ${i}</div>`;
    }
    gridContainer.appendChild(headerRow);

    cacheSets.forEach((cacheSet, setIndex) => {
        const setRow = document.createElement('div');
        setRow.className = 'cache-row';

        const setLabelBlock = document.createElement('div');
        setLabelBlock.className = 'set-label-block';
        setLabelBlock.textContent = setIndex;
        setRow.appendChild(setLabelBlock);

        cacheSet.getBlocks().forEach((block) => {
            const blockDiv = document.createElement('div');
            blockDiv.className = 'cache-block';

            const element = block.getElement();
            blockDiv.textContent = element ? element.toString() : 'null';

            setRow.appendChild(blockDiv);
        });

        gridContainer.appendChild(setRow);
    });
}