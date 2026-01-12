# Dijkstra Pathfinding Visualizer (Web Application)

An interactive **web-based pathfinding visualizer** built using **Python (Flask)** that demonstrates **Dijkstra’s shortest path algorithm** on a grid.  
The application allows users to place start and end nodes, draw obstacles, enable/disable diagonal movement, and visualize how the algorithm explores nodes and finds the shortest path.

---

## 🚀 Features

- Interactive grid-based environment
- Start and End node selection
- Click-and-drag wall (obstacle) creation
- Real-time visualization of:
  - Visited nodes (Blue)
  - Shortest path (Yellow)
- Optional diagonal movement (ON / OFF toggle)
- Prevents diagonal corner-cutting
- Python-based backend algorithm (Flask)
- Browser-based visualization using HTML Canvas

---

## 🛠 Tech Stack

### Backend
- Python
- Flask
- Dijkstra’s Algorithm

### Frontend
- HTML
- CSS
- JavaScript
- HTML5 Canvas

---

## 📂 Project Structure

dijkstra-pathfinding-visualizer/
│
├── app.py # Flask backend
├── dijkstra.py # Dijkstra algorithm (Python)
├── requirements.txt
├── README.md
│
├── templates/
│ └── index.html # Web UI
│
└── static/
├── script.js # Canvas logic & animations
└── style.css # Styling

🧠 Algorithm Details

Uses Dijkstra’s Algorithm
Supports:
  4-directional movement (default)
  8-directional movement (optional)
Movement cost: 
  Straight: 1
  Diagonal: √2
Corner-cutting prevention implemented
