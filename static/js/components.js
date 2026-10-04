// Component Management

let allComponents = [];

// Fetch components from API
async function loadComponents() {
    try {
        const response = await fetch('/api/components');
        const data = await response.json();
        allComponents = data.components;
        
        // Add components to scene
        allComponents.forEach(component => {
            if (spectrosceneInstance) {
                spectrosceneInstance.addComponent(component);
            }
        });
        
        // Populate UI lists
        populateComponentLists();
        
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

function populateComponentLists() {
    const internalList = document.getElementById('internal-list');
    const externalList = document.getElementById('external-list');
    const allList = document.getElementById('all-list');
    
    internalList.innerHTML = '';
    externalList.innerHTML = '';
    allList.innerHTML = '';
    
    allComponents.forEach(component => {
        const item = createComponentItem(component);
        allList.appendChild(item);
        
        if (component.category === 'internal') {
            internalList.appendChild(createComponentItem(component));
        } else {
            externalList.appendChild(createComponentItem(component));
        }
    });
}

function createComponentItem(component) {
    const item = document.createElement('div');
    item.className = 'component-item';
    item.innerHTML = `
        <div class="component-color" style="background-color: ${component.color};"></div>
        <div class="component-name">${component.name}</div>
    `;
    
    item.addEventListener('click', () => {
        selectComponent(component);
        updateActiveItem(component.id);
    });
    
    return item;
}

function selectComponent(component) {
    const detailName = document.getElementById('detail-name');
    const detailDescription = document.getElementById('detail-description');
    
    detailName.textContent = component.name;
    detailDescription.innerHTML = `
        <p>${component.description}</p>
        <div class="component-category ${component.category}">${component.category.charAt(0).toUpperCase() + component.category.slice(1)}</div>
    `;
    
    if (spectrosceneInstance) {
        spectrosceneInstance.highlightComponent(component.id);
    }
}

function updateActiveItem(componentId) {
    document.querySelectorAll('.component-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeItems = document.querySelectorAll(`.component-item`);
    activeItems.forEach(item => {
        const name = item.querySelector('.component-name').textContent;
        const component = allComponents.find(c => c.name === name);
        if (component && component.id === componentId) {
            item.classList.add('active');
        }
    });
}

// Load components when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}
