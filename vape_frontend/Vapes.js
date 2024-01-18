import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './Vape.css';
import './AgeVerificationModal.css'; 
import vape_logo from './images/vape_logo.png';
import vape_products from './images/vape_products.png';


import featured1 from './images/black/black_featured.png';
import featured2 from './images/chillax_featured.jpg';
import featured3 from './images/flava.jpg';

import Top1 from './images/flava_apoc.jpg';
import Top2 from './images/black/Screenshot 2024-01-06 231308.png';
import Top3 from './images/chillax_featured2.jpg';



const AgeVerificationModal = ({ onClose, onVerify }) => {
  const [age, setAge] = useState('');


  const handleVerify = () => {
    // Perform age verification logic here
    // You can customize this based on your requirements
    if (parseInt(age, 10) >= 18) {
      onVerify();
    } else {
      alert('You must be at least 18 years old to access this site.');
    }
  };

  return (
    <div className="age-verification-container">
      <div className="age-verification-modal">
        <div className="veri-modal-content">
          <h1>Age Verification</h1>
          <p className='veri_content'>
            D & K's Vape hub is a Philippines reselling store by many brands
            of e-juice that has transformed the vaping industry since 2011
          </p>
          <p className='veri_content'>
            By entering D&KsVapehub.com you agree to the storing of cookies on your
            device to enhance your site experience and for analytical purposes
          </p>
          <p className='confirm'>Please confirm that you are at least 18 years old:</p>
          <input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="button-container">
            <button onClick={handleVerify}>Verify</button>
            <button onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};



const Vapes = () => {

  const [isVerified, setIsVerified] = useState(false);
  const [showAgeVerification, setShowAgeVerification] = useState(true);



  const handleVerification = () => {
    setIsVerified(true);
    setShowAgeVerification(false);
  };

  const handleAgeVerificationClose = () => {
    // You can choose to redirect or handle the closure differently
    // For simplicity, just hide the modal in this example
    setShowAgeVerification(false);
  };

  const buttons = document.querySelectorAll("[data-carousel-button]")
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const offset = button.dataset.carouselButton === "next" ? 1 : -1
      const slides = button
        .closest("[data-carousel]")
        .querySelector("[data-slides]")

      const activeSlide = slides.querySelector("[data-active]")
      let newIndex = [...slides.children].indexOf(activeSlide) + offset
      if (newIndex < 0) newIndex = slides.children.length - 1
      if (newIndex >= slides.children.length) newIndex = 0

      slides.children[newIndex].dataset.active = true
      delete activeSlide.dataset.active
    })
  })

  const slides = document.querySelectorAll('.slide');

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.removeAttribute('data-active');
      if (i === index) {
        slide.setAttribute('data-active', true);
      }
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function startAutoScroll() {
    setInterval(nextSlide, 5000); // interval for featured photos
  }

  startAutoScroll();

  const imageArray = [
    { src: Top1, alt: "Avatar", text: "Flava", className: "image" },
    { src: Top2, alt: "Avatar", text: "Black", className: "image2" },
    { src: Top3, alt: "Avatar", text: "Chillax", className: "image3" },
    // Add more objects as needed
  ];



  return (
    <div className="Vape">
      {showAgeVerification && (
        <AgeVerificationModal
          onClose={handleAgeVerificationClose}
          onVerify={handleVerification}
        />
      )}



      {isVerified && (
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
          <div id="Vape_Home">

            <nav className="Vape_navbar">
              <ul className="navbar">
                <div className="vape-hub-logo">
                  <img src={vape_logo} alt="Vape Hub Logo" />
                </div>
                <div className="vape_logo_title">
                  <h1>
                    D & K's
                  </h1>
                  <span>Vape Hub</span>

                </div>

                <li>
                  <a href="#Vape_Home">Home</a>
                </li>
                <li>
                  <a href="#Vape_Featured">Featured</a>
                </li>
                <li>
                  <Link to={"/Products"}>Products</Link>
                </li>
                <li>
                  <a href="#Vape_ContactUs">Contacts</a>
                </li>
              </ul>
            </nav>

            <div className="Vape_aboutUs">
              <h1 className="who_title">
                D & K's Vaping hub
              </h1>
              <div className="who_content">
                <p>
                  D & K Vape Hub, established by Dea and Kresha, is your go-to
                  destination for premium vaping products. As passionate
                  entrepreneurs, they bring a curated selection of high-quality
                  vape products to enthusiasts and newcomers alike. With Dea's
                  expertise in flavor curation and Kresha's customer-focused
                  approach, D & K Vape Hub is committed to providing a diverse
                  and satisfying range of vaping options. Their mission is to
                  elevate the vaping experience for every individual by offering
                  expert guidance and a welcoming environment. At D & K Vape Hub,
                  you can trust in the dedication of Dea and Kresha to deliver
                  exceptional products that cater to your unique preferences.
                </p>
              </div>
            </div>

            <div className='Vape_aboutUS_right'>
              <div className='right_container'>
                <h3 className='right_content'> High Quality E-Cigarettes</h3>
                <div className='vape_products_pic'>
                  <img src={vape_products} alt="Vape products" />
                </div>
                <button className="products_button">
                  <Link style={{ textDecoration: 'none', color: '#fff' }} to={"/Products"}>
                    <span className="hover-underline-animation">Check Products</span>
                  </Link>
                </button>


              </div>
            </div>

          </div>

          <div id="Vape_Featured">
            <section aria-label="Featured Vapes">
              <div className='carousel' data-carousel>
                <button className='carousel-button prev' data-carousel-button="prev">&#x21e6;</button>
                <button className='carousel-button next' data-carousel-button="next">&#x21e8;</button>
                <div className='text-inside'> <h1>Featured Brands</h1>
                  <p>Bringing you killer flavors and
                    top-notch tech for a seriously epic experience</p>
                  <button className='get-now-btn'>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={"/Products"}><span>
                      Get now</span></Link></button>
                </div>
                <ul data-slides>
                  <li className='slide' data-active>
                    <img src={featured1} alt="vape1"></img>
                  </li>
                  <li className='slide'>
                    <img src={featured2} alt="vape2"></img>
                  </li>
                  <li className='slide'>
                    <img src={featured3} alt="vape3"></img>
                  </li>
                </ul>
              </div>
            </section>

            <div className='Top_products'>
              <h1 className='top'>Top Products</h1>
              <div className="container-wrapper">
                {imageArray.map((image, index) => (
                  <div className={`container ${image.className}`} key={index}>
                    <img src={image.src} alt={image.alt} className={image.className} />
                    <div className="middle">
                      <div className="text">{image.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

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


        </div>



      )}

    </div>
  );
};

export default Vapes;
