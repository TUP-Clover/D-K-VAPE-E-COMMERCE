import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import vape_logo from './images/vape_logo.png';
import Modal from 'react-modal';
import './admin.css';



const Admin = () => {
    const [create_modalIsOpen, setcreate_ModalIsOpen] = useState(false);
    const [updateProductId, setUpdateProductId] = useState(null);
    const closeModal = () => {
        setcreate_ModalIsOpen(false);
        setUpdateProductId(null); // Reset updateProductId
        setNewProduct({});
    };
    const openUpdateModal = (vapeID) => {
        setUpdateProductId(vapeID);
        setcreate_ModalIsOpen(true);
    };
    const openModal = () => {
        setUpdateProductId(null);
        setcreate_ModalIsOpen(true);
    };

    const [activeTab, setActiveTab] = useState('inventory');

    /*------fetching all vape data from database---------- */
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8800/vape");
                setProducts(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllProducts()
    }, [])

    const [inquiries, setInquiries] = useState([]);
    useEffect(() => {
        const fetchAllInquiries = async () => {
            try {
                const response = await axios.get("http://localhost:8800/customer_table");
                setInquiries(response.data);
            } catch (error) {
                console.error('Error fetching inquiries:', error);
            }
        };

        fetchAllInquiries();
    }, []);

    /*--- end code of fetching all vape data from db ---*/

    /* --- code for creating new products from admin side ---*/
    const Navigate = useNavigate()
    const [Product, setNewProduct] = useState({
        brand: '',
        product_name: '',
        flavor: '',
        size: '',
        battery_capacity: '',
        nicotine: '',
        puffs: '',
        coil: '',
        charger: '',
        duration: '',
        price: '',
        image: ''

    });

    // Function to handle creating a product
    const handleCreateProduct = async e => {
        e.preventDefault()
        const formData = new FormData();

        formData.append('brand', Product.brand);
        formData.append('product_name', Product.product_name);
        formData.append('flavor', Product.flavor);
        formData.append('size', Product.size);
        formData.append('battery_capacity', Product.battery_capacity);
        formData.append('nicotine', Product.nicotine);
        formData.append('puffs', Product.puffs);
        formData.append('coil', Product.coil);
        formData.append('charger', Product.charger);
        formData.append('duration', Product.duration);
        formData.append('price', Product.price);
        formData.append('image', Product.image);
        console.log(formData);
        try {
            await axios.post("http://localhost:8800/vape", formData);

            const updatedProducts = await axios.get("http://localhost:8800/vape");
            setProducts(updatedProducts.data); // Update the state with the latest data
            Navigate("/Admin");
        } catch (err) {
            console.log(err)
        }
        closeModal();
    };

    /* --- end of code for creating new products from admin side ---*/

    /* Add a new function to handle image change */
    const handleImageChange = (e) => {
        setNewProduct((prev) => ({ ...prev, image: e.target.files[0] }));
    };


    // Function to handle updating a product
    const handleInputChange = (e) => {
        setNewProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleUpdateProduct = async () => {
        console.log('handleUpdateProduct clicked');
        const formData = new FormData();

        formData.append('brand', Product.brand);
        formData.append('product_name', Product.product_name);
        formData.append('flavor', Product.flavor);
        formData.append('size', Product.size);
        formData.append('battery_capacity', Product.battery_capacity);
        formData.append('nicotine', Product.nicotine);
        formData.append('puffs', Product.puffs);
        formData.append('coil', Product.coil);
        formData.append('charger', Product.charger);
        formData.append('duration', Product.duration);
        formData.append('price', Product.price);
        formData.append('image', Product.image);
        console.log(formData);
        try {

            await axios.put(`http://localhost:8800/vape/${updateProductId}`, formData);
            const updatedProducts = await axios.get("http://localhost:8800/vape");
            setProducts(updatedProducts.data);
            closeModal();
        } catch (err) {
            console.log(err);
        }
    };

    // Function to handle deleting a product 
    const deleteProduct = async (vapeID) => {
        try {
            await axios.delete("http://localhost:8800/vape/" + vapeID)
            window.location.reload()

        } catch (err) {
            console.log(err)
        }
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };


    // Function to render product table
    const renderProductTable = () => {
        return (
            <div className='vape-container'>
                <table id="productTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Brand</th>
                            <th>Product Name</th>
                            <th>Flavor</th>
                            <th>Size</th>
                            <th>BatteryCapacity</th>
                            <th>Nicotine</th>
                            <th>Puffs</th>
                            <th>Coil</th>
                            <th>Charger</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>action</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <>
                                    <tr key={product.vapeID}>
                                        <td>{product.vapeID}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.product_name}</td>
                                        <td>{product.flavor}</td>
                                        <td>{product.size}</td>
                                        <td>{product.battery_capacity}</td>
                                        <td>{product.nicotine}</td>
                                        <td>{product.puffs}</td>
                                        <td>{product.coil}</td>
                                        <td>{product.charger}</td>
                                        <td>{product.duration}</td>
                                        <td>{product.price}</td>
                                        <td><img src={'http://localhost:8800/images/' + product.image} alt='productimg' className='product-img'></img></td>
                                        <td>
                                            <button onClick={() => openUpdateModal(product.vapeID)}>Update</button>
                                        </td>
                                        <td>
                                            <button onClick={() => deleteProduct(product.vapeID)}>Delete </button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}

                    </tbody>

                </table>

            </div>
        );
    };

    // Function to render inquiries table

    const renderInquiriesTable = () => {
        return (
            <table id="inquiriesTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Contact Number</th>
                        <th>Product ID</th>
                    </tr>
                </thead>
                <tbody>
                    {inquiries.map(inquiry => (
                        <tr key={inquiry.id}>
                            <td>{inquiry.id}</td>
                            <td>{inquiry.first_name}</td>
                            <td>{inquiry.last_name}</td>
                            <td>{inquiry.email}</td>
                            <td>{inquiry.address}</td>
                            <td>{inquiry.contact_number}</td>
                            <td>{inquiry.vape_vape_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };


    return (
        <div className='admin'>
            <div id="Vape_Home_products">
                <nav className="Vape_navbar">
                    <ul className="navbar">
                        <div className="vape-hub-logo">
                            <img src={vape_logo} alt="Vape Hub Logo" />
                        </div>

                        <div className="vape_logo_title_products">
                            <h1> D & K's </h1>
                        </div>
                        <div className='products_title'>
                            <h1>Admin Dashboard</h1>
                        </div>
                        <div className='nav-btn'>
                            <li>
                                <button onClick={() => handleTabChange('inventory')} className={activeTab === 'inventory' ? 'active' : ''}>Inventory</button>
                            </li>
                            <li>
                                <button onClick={() => handleTabChange('inquiries')} className={activeTab === 'inquiries' ? 'active' : ''}>Inquiries</button>
                            </li>
                            <li>
                               <li><a href='/login'>Log Out</a></li>
                            </li>
                        </div>
                    </ul>
                </nav>
            </div>

            <div className="admin-container">
                {activeTab === 'inventory' && (
                    <div>
                        <h2>Vape Inventory</h2>
                        {renderProductTable()}
                        <button onClick={openModal}>Create Product</button>
                    </div>
                )}


                {activeTab === 'inquiries' && (
                    <div>
                        <h2>Inquiries Table</h2>
                        {renderInquiriesTable()}
                    </div>
                )}
            </div>

            <Modal
                isOpen={create_modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Create Product Modal"
            >
                {/* Modal content */}
                <div className="create-prod-modal-content">
                    <div className="vape_logo_title_admin">
                        <h1> D & K's </h1>
                    </div>
                    <h2>{updateProductId ? "Update" : "Create"} Product</h2>
                    <form>
                        {/* Input fields for each product attribute */}
                        <label>
                            Brand:
                            <input type="text" name="brand" onChange={handleInputChange} />
                        </label>
                        <label>
                            Product Name:
                            <input type="text" name="product_name" onChange={handleInputChange} />
                        </label>
                        <label>
                            Flavor:
                            <input type="text" name="flavor" onChange={handleInputChange} />
                        </label>
                        <label>
                            Size:
                            <input type="text" name="size" onChange={handleInputChange} />
                        </label>
                        <label>
                            Battery Capacity:
                            <input type="text" name="battery_capacity" onChange={handleInputChange} />
                        </label>
                        <label>
                            Nicotine:
                            <input type="text" name="nicotine" onChange={handleInputChange} />
                        </label>
                        <label>
                            Puffs:
                            <input type="text" name="puffs" onChange={handleInputChange} />
                        </label>
                        <label>
                            Coil:
                            <input type="text" name="coil" onChange={handleInputChange} />
                        </label>
                        <label>
                            Charger:
                            <input type="text" name="charger" onChange={handleInputChange} />
                        </label>
                        <label>
                            Duration:
                            <input type="text" name="duration" onChange={handleInputChange} />
                        </label>
                        <label>
                            Price:
                            <input type="text" name="price" onChange={handleInputChange} />
                        </label>
                        <label className='image-label'>
                            Image:
                            <input type="file" name="image" onChange={handleImageChange} />
                        </label>

                        {/* Button to create the product */}
                        <button type="button" onClick={updateProductId ? handleUpdateProduct : handleCreateProduct}>
                            {updateProductId ? "Update" : "Create"} Product
                        </button>
                        {/* Button to cancel and close the modal */}
                        <button type="button" onClick={closeModal}>Cancel</button>
                    </form>
                </div>
            </Modal>
        </div>

    );
};

export default Admin;
