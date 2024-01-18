import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios'
import './Products.css'
import './BuyNowModal.css'
import vape_logo from './images/vape_logo.png';

const Products = () => {
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

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    address: "",
    vape_vape_id: "",

  })

  const [currentSection, setCurrentSection] = useState('Black');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleNavigationClick = (section) => {
    setCurrentSection(section);
  };

  function openBuyNowModal(vapeID) {
    setIsModalOpen(true);
    setSelectedProduct(vapeID)
  }

  function closeBuyNowModal() {
    setSelectedProduct(null)
    setIsModalOpen(false)
  }

  const submitPurchase = async (vapeID) => {
    const valEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valContact = /^\d{11}$/;

    if (formData.first_name !== "" && formData.last_name !== "" && formData.email !== "" &&
      formData.contact_number !== "" && formData.address !== "") {
      alert("Thank you for Inquiring, Inquiry sent!");

      if (formData.vape_vape_id === "") {
        formData.vape_vape_id = vapeID;
      }

      console.log(formData)

      try {
        await axios.post(`http://localhost:8800/customer_table`, formData)
      } catch (err) {
        console.log(err)
      }
    } else if (!valEmail.test(formData.email)) {
      alert("invalid email")
    } else if (!valContact.test(formData.contact_number)) {
      alert("invalid contact number")
    } else {
      alert("Please fill out the form first")
    }

    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      contact_number: "",
      address: "",
      vape_vape_id: "",
    })

    closeBuyNowModal();
  }

  return (
    <div className='Products'>
      <div className='sections'>
        <div className="announcement-bar">
          <div className="announcement-content">
            <span>THIS WEBSITE IS FOR 18 AND ABOVE ONLY.</span>
            <span>THIS WEBSITE IS FOR 18 AND ABOVE ONLY.</span>
            <span>THIS WEBSITE IS FOR 18 AND ABOVE ONLY.</span>
            <span>THIS WEBSITE IS FOR 18 AND ABOVE ONLY.</span>
            <span>THIS WEBSITE IS FOR 18 AND ABOVE ONLY.</span>
            <span>THIS WEBSITE IS FOR 18 AND ABOVE ONLY.</span>
            <span>THIS WEBSITE IS FOR 18 AND ABOVE ONLY.</span>
            <span>THIS WEBSITE IS FOR 18 AND ABOVE ONLY.</span>
          </div>
        </div>
      </div>

      <div id="Vape_Home_products">
        <nav className="Vape_navbar">
          <ul className="navbar">
            <div className="vape-hub-logo">
              <img src={vape_logo} alt="Vape Hub Logo" />
            </div>

            <div className="vape_logo_title_products">
              <h1> D & K's </h1>
              <span>Vape Hub</span>

            </div>
            <div className='products_title'>
              <h1>Available Products</h1>
              <span>Stocks may vary</span>
            </div>

            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <a href="#Vape_ContactUs">Contacts</a>
            </li>
          </ul>
        </nav>
      </div>

      <section id='section-container'>

        <section id='Black' className={` Vape_Home_products ${currentSection === 'Black' ? 'active' : ''}`}>
          <div className='products_nav'>
            <ul className='brnd-nav'>
              <li className="brand_nav"> <a href='#Black' onClick={() => handleNavigationClick('Black')} className={currentSection === 'Black' ? 'active' : ''}><h4>Black</h4></a></li>
              <li className="brand_nav"> <a href='#Flava' onClick={() => handleNavigationClick('Flava')} className={currentSection === 'Flava' ? 'active' : ''}><h4>Flava</h4></a></li>
              <li className="brand_nav"> <a href='#Chillax' onClick={() => handleNavigationClick('Chillax')} className={currentSection === 'Chillax' ? 'active' : ''}><h4>Chillax</h4></a></li>
            </ul>
          </div>

          <div className='container-black'>
            {products
              .filter((product) => product.brand.startsWith('Black'))
              .map((product) => (
                <div key={product.vapeID} className='box'>
                  <div className='box-column'>
                    <div className='box-item'>
                      <div className='box-image'>
                        <img src={'http://localhost:8800/images/' + product.image} alt='Vape Product' />
                      </div>
                      <div className='box-info'>
                        <h3 className='box-title'>{product.product_name}</h3>
                        <p className='box-description'>{product.flavor}</p>
                        <p className='box-description'>{product.puffs} puffs</p>
                        <span className='box-price'>₱{product.price}</span>
                        <button onClick={() => openBuyNowModal(product)} className='box-link'>
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section id='Flava' className={`Vape_Home_products ${currentSection === 'Flava' ? 'active' : ''}`}>
          <div className='products_nav'>
            <ul className='brnd-nav'>
              <li className="brand_nav"> <a href='#Black' onClick={() => handleNavigationClick('Black')} className={currentSection === 'Black' ? 'active' : ''}><h4>Black</h4></a></li>
              <li className="brand_nav"> <a href='#Flava' onClick={() => handleNavigationClick('Flava')} className={currentSection === 'Flava' ? 'active' : ''}><h4>Flava</h4></a></li>
              <li className="brand_nav"> <a href='#Chillax' onClick={() => handleNavigationClick('Chillax')} className={currentSection === 'Chillax' ? 'active' : ''}><h4>Chillax</h4></a></li>
            </ul>
          </div>

          <div className='container-flava'>
            {products
              .filter((product) => product.brand.startsWith('Flava'))
              .map((product) => (
                <div key={product.vapeID} className='box'>
                  <div className='box-column'>
                    <div className='box-item'>
                      <div className='box-image'>
                        <img src={'http://localhost:8800/images/' + product.image} alt='Vape Product' />
                      </div>
                      <div className='box-info'>
                        <h3 className='box-title'>{product.product_name}</h3>
                        <p className='box-description'>{product.flavor}</p>
                        <p className='box-description'>{product.puffs} puffs</p>
                        <span className='box-price'>₱{product.price}</span>
                        <button onClick={() => openBuyNowModal(product)} className='box-link'>
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section id='Chillax' className={`Vape_Home_products ${currentSection === 'Chillax' ? 'active' : ''}`}>
          <div className='products_nav'>
            <ul className='brnd-nav'>
              <li className="brand_nav"> <a href='#Black' onClick={() => handleNavigationClick('Black')} className={currentSection === 'Black' ? 'active' : ''}><h4>Black</h4></a></li>
              <li className="brand_nav"> <a href='#Flava' onClick={() => handleNavigationClick('Flava')} className={currentSection === 'Flava' ? 'active' : ''}><h4>Flava</h4></a></li>
              <li className="brand_nav"> <a href='#Chillax' onClick={() => handleNavigationClick('Chillax')} className={currentSection === 'Chillax' ? 'active' : ''}><h4>Chillax</h4></a></li>
            </ul>
          </div>

          <div className='container-chillax'>
            {products
              .filter((product) => product.brand.startsWith('Chillax'))
              .map((product) => (
                <div key={product.vapeID} className='box'>
                  <div className='box-column'>
                    <div className='box-item'>
                      <div className='box-image'>
                        <img src={'http://localhost:8800/images/' + product.image} alt='Vape Product' />
                      </div>
                      <div className='box-info'>
                        <h3 className='box-title'>{product.product_name}</h3>
                        <p className='box-description'>{product.flavor}</p>
                        <p className='box-description'>{product.puffs} puffs</p>
                        <span className='box-price'>₱{product.price}</span>
                        <button onClick={() => openBuyNowModal(product)} className='box-link'>
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

        </section>

      </section>

      <div id="Vape_ContactUs">
        <div className='Contacts_container'>
          <div className='Contacts_content'>

            <div className="Contacts_logo">
              <p>Contact us: D&KVapehub@gmail.com</p>
              <div className="social-icons">
                <a href='https://www.facebook.com'><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 512 512"><path fill="#0a7392" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
                  <p>Facebook</p></a>
                <a href='https://www.instagram.com'><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path fill="#0a7392" d="M194.4 211.7a53.3 53.3 0 1 0 59.3 88.7 53.3 53.3 0 1 0 -59.3-88.7zm142.3-68.4c-5.2-5.2-11.5-9.3-18.4-12c-18.1-7.1-57.6-6.8-83.1-6.5c-4.1 0-7.9 .1-11.2 .1c-3.3 0-7.2 0-11.4-.1c-25.5-.3-64.8-.7-82.9 6.5c-6.9 2.7-13.1 6.8-18.4 12s-9.3 11.5-12 18.4c-7.1 18.1-6.7 57.7-6.5 83.2c0 4.1 .1 7.9 .1 11.1s0 7-.1 11.1c-.2 25.5-.6 65.1 6.5 83.2c2.7 6.9 6.8 13.1 12 18.4s11.5 9.3 18.4 12c18.1 7.1 57.6 6.8 83.1 6.5c4.1 0 7.9-.1 11.2-.1c3.3 0 7.2 0 11.4 .1c25.5 .3 64.8 .7 82.9-6.5c6.9-2.7 13.1-6.8 18.4-12s9.3-11.5 12-18.4c7.2-18 6.8-57.4 6.5-83c0-4.2-.1-8.1-.1-11.4s0-7.1 .1-11.4c.3-25.5 .7-64.9-6.5-83l0 0c-2.7-6.9-6.8-13.1-12-18.4zm-67.1 44.5A82 82 0 1 1 178.4 324.2a82 82 0 1 1 91.1-136.4zm29.2-1.3c-3.1-2.1-5.6-5.1-7.1-8.6s-1.8-7.3-1.1-11.1s2.6-7.1 5.2-9.8s6.1-4.5 9.8-5.2s7.6-.4 11.1 1.1s6.5 3.9 8.6 7s3.2 6.8 3.2 10.6c0 2.5-.5 5-1.4 7.3s-2.4 4.4-4.1 6.2s-3.9 3.2-6.2 4.2s-4.8 1.5-7.3 1.5l0 0c-3.8 0-7.5-1.1-10.6-3.2zM448 96c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96zM357 389c-18.7 18.7-41.4 24.6-67 25.9c-26.4 1.5-105.6 1.5-132 0c-25.6-1.3-48.3-7.2-67-25.9s-24.6-41.4-25.8-67c-1.5-26.4-1.5-105.6 0-132c1.3-25.6 7.1-48.3 25.8-67s41.5-24.6 67-25.8c26.4-1.5 105.6-1.5 132 0c25.6 1.3 48.3 7.1 67 25.8s24.6 41.4 25.8 67c1.5 26.3 1.5 105.4 0 131.9c-1.3 25.6-7.1 48.3-25.8 67z" /></svg>
                  <p>Instagram</p></a>
                <a href='https://www.linkedin.com'><svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 448 512"><path fill="#0a7392" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                  <p>linkedin</p></a>
              </div>
              <p>&copy; 2024 D & K Vape Hub | Designed by:<a href="https://www.facebook.com/jhnpl.mrfl.08" target="fb profile">John Paul Marfil</a></p>
            </div>

          </div>
        </div>

      </div>

      {isModalOpen && (
        <div className='product-modal' id='BuyNowModal'>
          <div className='modal-content'>
            <h1>Product Purchase Form</h1>
            {selectedProduct && (
              <div className="product-details">
                <div className="product-image">
                  <img src={'http://localhost:8800/images/' + selectedProduct.image} alt="Selected Product" />
                  <p className='flavor'>{selectedProduct.flavor}</p>
                </div>
                <div className="product-info">
                  <h3 className="box-title_modal">{selectedProduct.title}</h3>

                  <div className="box-description_modal">

                    <p>Size: {selectedProduct.size}</p>
                    <p>Battery Capacity: {selectedProduct.battery_capacity}</p>
                    <p>Nicotine: {selectedProduct.nicotine}</p>
                    <p>Puffs: {selectedProduct.puffs}</p>
                    <p>Coil: {selectedProduct.coil}</p>
                    <p>Charger: {selectedProduct.charger}</p>
                    <p>Charging duration: {selectedProduct.duration}</p>
                    <span className="box-price_modal">₱{selectedProduct.price}</span>
                  </div>
                </div>
              </div>
            )}
            <form>
              <label htmlFor="buyer-name">First Name:</label>
              <input type='text' placeholder='Enter your First Name' id='buyer-name' value={FormData.first_name}
                onChange={(event) => setFormData({ ...formData, first_name: event.target.value })} />
              <label htmlFor="buyer-name">Last Name:</label>
              <input type='text' placeholder='Enter your Last Name' id='buyer-name' value={FormData.last_name}
                onChange={(event) => setFormData({ ...formData, last_name: event.target.value })} />
              <label htmlFor="buyer-email">Email:</label>
              <input type='text' placeholder='Enter your Email' id='buyer-email' value={FormData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })} />
              <label htmlFor="buyer-address">Address:</label>
              <input type='text' placeholder='Enter your Address' id='buyer-address' value={FormData.address}
                onChange={(event) => setFormData({ ...formData, address: event.target.value })} />
              <label htmlFor="buyer-address">Contact Number:</label>
              <input type='text' placeholder='Enter your Contact Number' id='buyer-contact' value={FormData.contact_number}
                onChange={(event) => setFormData({ ...formData, contact_number: event.target.value })} />
              <div className='btn-container'>
                <button type='button' onClick={() => submitPurchase(selectedProduct.vapeID)}>Submit Purchase</button>
                <button type='button' onClick={closeBuyNowModal}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}


    </div>
  )
};


export default Products;

