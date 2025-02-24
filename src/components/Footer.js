import React from "react";
//import logo from '../assets/blg.png';
import './Footer.css';


function Footer() {
    return (
        <div>
        {/* Footer Type 1 */}
        <footer className="footer footer_type_1">
          <div className="footer-middle container">
            <div className="row row-cols-lg-5 row-cols-2">
              <div className="footer-column footer-store-info col-12 mb-4 mb-lg-0">
                <div className="logo">
                  <a href="index.html">
           {/*     <img src={logo} alt="BSPoke Logo" className="logo__image d-block"/> */}
                  </a>
                </div>{/* /.logo */}
                <p className="footer-address">Abuja Nigeria</p>
                <p className="m-0">
                  <strong className="fw-medium">Bspoke@admin.com</strong>
                </p>
                <p>
                  <strong className="fw-medium">+1 246-345-0695</strong>
                </p>
                <ul className="social-links list-unstyled d-flex flex-wrap mb-0">
                  <li>
                    <a href="https://www.facebook.com/" className="footer__social-link d-block">
                      <svg className="svg-icon svg-icon_facebook" width={9} height={15} viewBox="0 0 9 15" xmlns="http://www.w3.org/2000/svg"><use href="#icon_facebook" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/" className="footer__social-link d-block">
                      <svg className="svg-icon svg-icon_twitter" width={14} height={13} viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg"><use href="#icon_twitter" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/" className="footer__social-link d-block">
                      <svg className="svg-icon svg-icon_instagram" width={14} height={13} viewBox="0 0 14 13" xmlns="http://www.w3.org/2000/svg"><use href="#icon_instagram" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/" className="footer__social-link d-block">
                      <svg className="svg-icon svg-icon_youtube" width={16} height={11} viewBox="0 0 16 11" xmlns="http://www.w3.org/2000/svg"><path d="M15.0117 1.8584C14.8477 1.20215 14.3281 0.682617 13.6992 0.518555C12.5234 0.19043 7.875 0.19043 7.875 0.19043C7.875 0.19043 3.19922 0.19043 2.02344 0.518555C1.39453 0.682617 0.875 1.20215 0.710938 1.8584C0.382812 3.00684 0.382812 5.46777 0.382812 5.46777C0.382812 5.46777 0.382812 7.90137 0.710938 9.07715C0.875 9.7334 1.39453 10.2256 2.02344 10.3896C3.19922 10.6904 7.875 10.6904 7.875 10.6904C7.875 10.6904 12.5234 10.6904 13.6992 10.3896C14.3281 10.2256 14.8477 9.7334 15.0117 9.07715C15.3398 7.90137 15.3398 5.46777 15.3398 5.46777C15.3398 5.46777 15.3398 3.00684 15.0117 1.8584ZM6.34375 7.68262V3.25293L10.2266 5.46777L6.34375 7.68262Z" /></svg>
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pinterest.com/" className="footer__social-link d-block">
                      <svg className="svg-icon svg-icon_pinterest" width={14} height={15} viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg"><use href="#icon_pinterest" /></svg>
                    </a>
                  </li>
                </ul>
              </div>{/* /.footer-column */}
              <div className="footer-column footer-menu mb-4 mb-lg-0">
                <h6 className="sub-menu__title text-uppercase">Company</h6>
                <ul className="sub-menu__list list-unstyled">
                  <li className="sub-menu__item"><a href="about.html" className="menu-link menu-link_us-s">About Us</a></li>
                  <li className="sub-menu__item"><a href="contact.html" className="menu-link menu-link_us-s">Contact Us</a></li>
                </ul>
              </div>{/* /.footer-column */}
              <div className="footer-column footer-menu mb-4 mb-lg-0">
                <h6 className="sub-menu__title text-uppercase">Shop</h6>
                <ul className="sub-menu__list list-unstyled">
                  <li className="sub-menu__item"><a href="shop2.html" className="menu-link menu-link_us-s">New Arrivals</a></li>
                  <li className="sub-menu__item"><a href="shop3.html" className="menu-link menu-link_us-s">Accessories</a></li>
                  <li className="sub-menu__item"><a href="shop4.html" className="menu-link menu-link_us-s">Men</a></li>
                  <li className="sub-menu__item"><a href="shop1.html" className="menu-link menu-link_us-s">Shop All</a></li>
                </ul>
              </div>{/* /.footer-column */}
              <div className="footer-column footer-menu mb-4 mb-lg-0">
                <h6 className="sub-menu__title text-uppercase">Help</h6>
                <ul className="sub-menu__list list-unstyled">
                  <li className="sub-menu__item"><a href="about.html" className="menu-link menu-link_us-s">Customer Service</a></li>
                  <li className="sub-menu__item"><a href="account_dashboard.html" className="menu-link menu-link_us-s">My Account</a></li>
                  <li className="sub-menu__item"><a href="store_location.html" className="menu-link menu-link_us-s">Find a Store</a></li>
                  <li className="sub-menu__item"><a href="about.html" className="menu-link menu-link_us-s">Legal &amp; Privacy</a></li>
                  <li className="sub-menu__item"><a href="contact.html" className="menu-link menu-link_us-s">Contact</a></li>

                </ul>
              </div>{/* /.footer-column */}
              <div className="footer-column footer-newsletter col-12 mb-4 mb-lg-0">
                <h6 className="sub-menu__title text-uppercase">Subscribe</h6>
                <p>Be the first to get the latest news about trends, promotions, and much more!</p>
                <form action="https://uomo-html.flexkitux.com/Demo1/index.html" className="footer-newsletter__form position-relative bg-body">
                  <input className="form-control border-white" type="email" name="email" placeholder="Your email address" />
                  <input className="btn-link fw-medium bg-white position-absolute top-0 end-0 h-100" type="submit" defaultValue="JOIN" />
                </form>
                <div className="mt-4 pt-3">
                  <strong className="fw-medium">Secure payments</strong>
                  <p className="mt-2">
                    <img loading="lazy" src="https://uomo-html.flexkitux.com/images/payment-options.png" alt="Acceptable payment gateways" />
                  </p>
                </div>
              </div>{/* /.footer-column */}
            </div>{/* /.row-cols-5 */}
          </div>{/* /.footer-middle container */}
          <div className="footer-bottom container">
            <div className="d-block d-md-flex align-items-center">
              <span className="footer-copyright me-auto">©2025 Arvotek</span>
              <div className="footer-settings d-block d-md-flex align-items-center">
                <div className="d-flex align-items-center">
                  <label htmlFor="footerSettingsLanguage" className="me-2 text-secondary">Language</label>
                  <select id="footerSettingsLanguage" className="form-select form-select-sm bg-transparent" aria-label="Default select example" name="store-language">
                    <option className="footer-select__option" selected>United Kingdom | English</option>
                    <option className="footer-select__option" value={1}>United States | English</option>
                    <option className="footer-select__option" value={2}>German</option>
                    <option className="footer-select__option" value={3}>French</option>
                    <option className="footer-select__option" value={4}>Swedish</option>
                  </select>
                </div>
                <div className="d-flex align-items-center">
                  <label htmlFor="footerSettingsCurrency" className="ms-md-3 me-2 text-secondary">Currency</label>
                  <select id="footerSettingsCurrency" className="form-select form-select-sm bg-transparent" aria-label="Default select example" name="store-language">
                    <option selected>$ USD</option>
                    <option value={1}>£ GBP</option>
                    <option value={2}>€ EURO</option>
                  </select>
                </div>
              </div>{/* /.footer-settings */}
            </div>{/* /.d-flex */}
          </div>{/* /.footer-bottom container */}
        </footer>{/* /.footer footer_type_1 */}

        </div>
    );
}

export default Footer;
