// variables for form inputs
const blockSizeInput = document.querySelector('input[name="block_size"]');
const setSizeInput = document.querySelector('input[name="set_size"]');
const mmMemorySizeInput = document.querySelector('input[name="mm_memory_size"]');
const cacheMemorySizeInput = document.querySelector('input[name="cache_memory_size"]');
const wordSizeInput = document.querySelector('input[name="word_size"]');

// radio buttons for MM Mode
const mmWordMode = document.getElementById('mmWord');
const mmBlockMode = document.getElementById('mmBlock');

// radio buttons for Cache memory Mode
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

// Function to handle export functionality
exportButton.addEventListener('click', function() {
    // add code
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
        }
    });

    manualRadio.addEventListener('change', function() {
        if (this.checked) {
            sequenceInput.disabled = false;
        }
    });

    // Initial state: random is selected, sequence input is disabled
    sequenceInput.disabled = randomRadio.checked;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the input values
        const blockSize = document.querySelector('input[name="block_size"]').value;
        const setSize = document.querySelector('input[name="set_size"]').value;
        const sequenceInputValue = sequenceInput.value;
        const wordSize = document.querySelector('input[name="word_size"]').value;
        const mmMemorySize = document.querySelector('input[name="mm_memory_size"]').value;
        const cacheMemorySize = document.querySelector('input[name="cache_memory_size"]').value;

        let sequenceArray = [];
        if (manualRadio.checked) {
            sequenceArray = sequenceInputValue.split(/[\s,]+/).map(Number);
        }
        //TODO:
        // Process the inputs and compute the results (placeholder logic)
        const cacheHits = Math.floor(Math.random() * 100);
        const cacheMisses = Math.floor(Math.random() * 100);
        const missPenalty = Math.floor(Math.random() * 100);
        const averageAccess = Math.floor(Math.random() * 100);
        const totalAccess = Math.floor(Math.random() * 100);

        // Update the output fields
        document.getElementById('cache-hits').value = cacheHits;
        document.getElementById('cache-misses').value = cacheMisses;
        document.getElementById('miss-penalty').value = missPenalty;
        document.getElementById('average-access').value = averageAccess;
        document.getElementById('total-access').value = totalAccess;

        // Update the snapshot area
        const snapshotText = `
Block Size: ${blockSize}
Set Size: ${setSize}
Sequence Input: ${sequenceArray.join(', ')}
Word Size: ${wordSize}
MM Memory Size: ${mmMemorySize}
Cache Memory Size: ${cacheMemorySize}
Cache Hits: ${cacheHits}
Cache Misses: ${cacheMisses}
Miss Penalty: ${missPenalty}
Average Memory Access Time: ${averageAccess}
Total Memory Access Time: ${totalAccess}
        `;
        document.getElementById('snapshot').value = snapshotText;
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
});
