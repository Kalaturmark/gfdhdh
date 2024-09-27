import React, { useState } from 'react';


function ColorItem({ color, onEdit, onDelete }) {
    const itemStyle = {
        backgroundColor: color.code,
        padding: '10px',
        margin: '5px',
        color: '#fff',
        textAlign: 'center',
    };

    return (
        <div style={itemStyle}>
            <p>{color.name}</p>
            <button onClick={() => onEdit(color)}>Edit</button>
            <button onClick={() => onDelete(color.id)}>Delete</button>
        </div>
    );
}

function App() {
    const [colors, setColors] = useState([]);
    const [colorName, setColorName] = useState('');
    const [colorCode, setColorCode] = useState('');
    const [editingColor, setEditingColor] = useState(null);

    const addColor = () => {
        if (colorName && colorCode) {
            const newColor = {
                id: Date.now(),
                name: colorName,
                code: colorCode,
            };
            setColors([...colors, newColor]);
            setColorName('');
            setColorCode('');
        }
    };
    
    const updateColor = () => {
        setColors(colors.map(color =>
            color.id === editingColor.id
                ? { ...color, name: colorName, code: colorCode }
                : color
        ));
        setEditingColor(null);
        setColorName('');
        setColorCode('');
    };
    
    const deleteColor = (id) => {
        setColors(colors.filter(color => color.id !== id));
    };
    
    const editColor = (color) => {
        setEditingColor(color);
        setColorName(color.name);
        setColorCode(color.code);
    };

    return (
        <div>
            <h1>Colors</h1>
            <input
                type="text"
                placeholder="Color Name"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Color Code"
                value={colorCode}
                onChange={(e) => setColorCode(e.target.value)}
            />
            <button onClick={editingColor ? updateColor : addColor}>
                {editingColor ? 'Update Color' : 'Add Color'}
            </button>

            <div>
                {colors.map(color => (
                    <ColorItem
                        key={color.id}
                        color={color}
                        onEdit={editColor}
                        onDelete={deleteColor}
                    />
                ))}
            </div>
        </div>
    );
}


export default App;
