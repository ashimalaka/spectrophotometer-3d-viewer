// UI Event Handlers

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // Control buttons
    const rotateBtn = document.getElementById('rotate-btn');
    const internalBtn = document.getElementById('internal-btn');
    const externalBtn = document.getElementById('external-btn');
    const allBtn = document.getElementById('all-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    rotateBtn.addEventListener('click', () => {
        const isActive = rotateBtn.classList.toggle('active');
        if (spectrosceneInstance) {
            spectrosceneInstance.toggleAutoRotate(isActive);
        }
    });
    
    internalBtn.addEventListener('click', () => {
        setViewMode('internal');
        internalBtn.classList.add('active');
        externalBtn.classList.remove('active');
        allBtn.classList.remove('active');
        if (spectrosceneInstance) {
            spectrosceneInstance.showInternalOnly();
        }
    });
    
    externalBtn.addEventListener('click', () => {
        setViewMode('external');
        externalBtn.classList.add('active');
        internalBtn.classList.remove('active');
        allBtn.classList.remove('active');
        if (spectrosceneInstance) {
            spectrosceneInstance.showExternalOnly();
        }
    });
    
    allBtn.addEventListener('click', () => {
        setViewMode('all');
        allBtn.classList.add('active');
        internalBtn.classList.remove('active');
        externalBtn.classList.remove('active');
        if (spectrosceneInstance) {
            spectrosceneInstance.showAll();
        }
    });
    
    resetBtn.addEventListener('click', () => {
        if (spectrosceneInstance) {
            spectrosceneInstance.resetView();
        }
    });
    
    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.getAttribute('data-tab');
            switchTab(tabName);
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

function setViewMode(mode) {
    // Update tab visibility if needed
    const tabs = document.querySelectorAll('.tab-content');
    
    if (mode === 'internal') {
        switchTab('internal');
    } else if (mode === 'external') {
        switchTab('external');
    } else {
        switchTab('all');
    }
}

function switchTab(tabName) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab
    const selectedTab = document.getElementById(`${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Update tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'r':
            if (spectrosceneInstance) {
                spectrosceneInstance.resetView();
            }
            break;
        case '1':
            if (spectrosceneInstance) {
                spectrosceneInstance.showInternalOnly();
            }
            break;
        case '2':
            if (spectrosceneInstance) {
                spectrosceneInstance.showExternalOnly();
            }
            break;
        case '3':
            if (spectrosceneInstance) {
                spectrosceneInstance.showAll();
            }
            break;
    }
});
