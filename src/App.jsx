import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://product-inventory-w15e.onrender.com";

const App = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stockQuantity: '',
        description: '',
    });
    const [editId, setEditId] = useState(null);

   
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const response = await axios.get(API_URL);
        setProducts(response.data);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (editId) {
          await axios.put(`${API_URL}/${editId}`, formData);
      } else {
          await axios.post(API_URL, formData);
      }
      setFormData({ name: '', category: '', price: '', stockQuantity: '', description: '' });
      setEditId(null);
      fetchProducts();
  };
  

    const handleEdit = (product) => {
        setFormData(product);
        setEditId(product.id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        fetchProducts();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="container">
            <h1 className='text-danger'>Product Inventory System</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                />
                <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    type="number"
                    placeholder="Price"
                    required
                />
                <input
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    type="number"
                    placeholder="Stock Quantity"
                    required
                />
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                ></textarea>
                <button type="submit" className='bg-success'>{editId ? "Update" : "Add"}</button>
            </form>

            <table border="1" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Stock Quantity</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td>
                            <td>{product.stockQuantity}</td>
                            <td>{product.description}</td>
                            <td>
                                <button onClick={() => handleEdit(product)} className='bg-primary'>Edit</button>
                                <button onClick={() => handleDelete(product.id)} className='bg-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default App;
