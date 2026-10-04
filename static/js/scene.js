// Three.js Scene Setup for Spectrophotometer 3D Viewer

class SpectrophotometerScene {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f5);
        
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.clientWidth / this.container.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 8);
        
        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.container.appendChild(this.renderer.domElement);
        
        // Controls setup
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 2;
        
        // Lighting
        this.setupLighting();
        
        // Component groups
        this.componentMeshes = new Map();
        this.internalGroup = new THREE.Group();
        this.externalGroup = new THREE.Group();
        this.scene.add(this.internalGroup);
        this.scene.add(this.externalGroup);
        
        // Animation loop
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point light
        const pointLight = new THREE.PointLight(0xffffff, 0.5);
        pointLight.position.set(-5, 5, 5);
        this.scene.add(pointLight);
    }
    
    addComponent(component) {
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshStandardMaterial({
            color: component.color,
            metalness: 0.6,
            roughness: 0.4
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(component.position.x, component.position.y, component.position.z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.userData = { component };
        
        // Add to appropriate group
        if (component.category === 'internal') {
            this.internalGroup.add(mesh);
        } else {
            this.externalGroup.add(mesh);
        }
        
        // Store reference
        this.componentMeshes.set(component.id, mesh);
    }
    
    addLabel(component) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 256;
        canvas.height = 128;
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#333';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(component.name, canvas.width / 2, 40);
        
        ctx.font = '16px Arial';
        ctx.fillStyle = '#666';
        const words = component.description.split(' ');
        let line = '';
        let y = 70;
        
        for (let word of words) {
            if (ctx.measureText(line + word).width > 230) {
                ctx.fillText(line, canvas.width / 2, y);
                line = word;
                y += 25;
            } else {
                line += (line ? ' ' : '') + word;
            }
        }
        ctx.fillText(line, canvas.width / 2, y);
        
        const texture = new THREE.CanvasTexture(canvas);
        const geometry = new THREE.PlaneGeometry(4, 2);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const label = new THREE.Mesh(geometry, material);
        
        const pos = component.position;
        label.position.set(pos.x, pos.y + 1.5, pos.z);
        label.userData = { isLabel: true };
        
        this.scene.add(label);
    }
    
    showInternalOnly() {
        this.internalGroup.visible = true;
        this.externalGroup.visible = false;
    }
    
    showExternalOnly() {
        this.internalGroup.visible = false;
        this.externalGroup.visible = true;
    }
    
    showAll() {
        this.internalGroup.visible = true;
        this.externalGroup.visible = true;
    }
    
    highlightComponent(componentId) {
        // Reset all materials
        this.componentMeshes.forEach((mesh) => {
            mesh.material.emissive.setHex(0x000000);
            mesh.material.emissiveIntensity = 0;
        });
        
        // Highlight selected
        if (componentId && this.componentMeshes.has(componentId)) {
            const mesh = this.componentMeshes.get(componentId);
            mesh.material.emissive.setHex(parseInt(mesh.userData.component.color.replace('#', ''), 16));
            mesh.material.emissiveIntensity = 0.5;
        }
    }
    
    toggleAutoRotate(enable) {
        this.controls.autoRotate = enable;
    }
    
    resetView() {
        this.camera.position.set(0, 0, 8);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}

// Create scene instance
let spectrosceneInstance = null;

function initScene() {
    spectrosceneInstance = new SpectrophotometerScene('canvas-container');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScene);
} else {
    initScene();
}
