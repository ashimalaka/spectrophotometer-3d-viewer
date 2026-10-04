from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)

# Load component data
with open('data/components.json', 'r') as f:
    components_data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/components')
def get_components():
    """Get all spectrophotometer components"""
    return jsonify(components_data)

@app.route('/api/components/<component_id>')
def get_component(component_id):
    """Get a specific component by ID"""
    for component in components_data['components']:
        if component['id'] == component_id:
            return jsonify(component)
    return jsonify({'error': 'Component not found'}), 404

@app.route('/api/components/category/<category>')
def get_components_by_category(category):
    """Get components by category (internal/external)"""
    filtered = [c for c in components_data['components'] if c['category'] == category]
    return jsonify({'components': filtered})


def run_server():
    host = os.environ.get('HOST', '0.0.0.0')
    port = int(os.environ.get('PORT', '5000'))
    debug = os.environ.get('FLASK_DEBUG', '0').lower() in ('1', 'true', 'yes')
    app.run(host=host, port=port, debug=debug, use_reloader=debug)


if __name__ == '__main__':
    run_server()
