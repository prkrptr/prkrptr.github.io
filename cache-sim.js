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
    // add code
});

// Function to handle export functionality
exportButton.addEventListener('click', function() {
    // add code 
});