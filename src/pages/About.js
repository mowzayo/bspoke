import React from "react";

function About() {
  return (
    <div>
      <section className="about-us container">
        <div className="mw-930">
          <h2 className="page-title">ABOUT Bspoke</h2>
        </div>
        <div className="about-us__content pb-5 mb-5">
          <p className="mb-5">
            <img
              loading="lazy"
              className="w-100 h-auto d-block"
              src="https://uomo-html.flexkitux.com/images/about/about-1.jpg"
              width={1410}
              height={550}
              alt=""
            />
          </p>
          <div className="mw-930">
            <h3 className="mb-4">OUR STORY</h3>
            <p className="fs-6 fw-medium mb-4">
              Bspoke Clothing was born out of a desire to craft luxury
              experiences tailored to every event and personality, ensuring
              elegance and individuality in every detail. We specialize in
              creating bespoke, high-quality apparel that reflects personal
              style, from elegant formalwear to sophisticated casual designs.
              Our mission is to redefine luxury by blending timeless
              craftsmanship with contemporary trends.
            </p>
            {/*}  <p className="mb-4">Saw wherein fruitful good days image them, midst, waters upon, saw. Seas lights seasons. Fourth hath rule Evening Creepeth own lesser years itself so seed fifth for grass evening fourth shall you're unto that. Had. Female replenish for yielding so saw all one to yielding grass you'll air sea it, open waters subdue, hath. Brought second Made. Be. Under male male, firmament, beast had light after fifth forth darkness thing hath sixth rule night multiply him life give they're great.</p> */}
            <div className="row mb-3">
              <div className="col-md-6">
                <h5 className="mb-3">Our Mission</h5>
                <p className="mb-3">
                  We're set to tailor luxury clothes for you, We want to make
                  clothes that give you a rich and comfortable demeanor.
                </p>
              </div>
              {/*} <div className="col-md-6">
                 <h5 className="mb-3">Our Vision</h5>
                  <p className="mb-3">Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>*/}
            </div>
          </div>
          <div className="mw-930 d-lg-flex align-items-lg-center">
            <div className="image-wrapper col-lg-6">
              <img
                className="h-auto"
                loading="lazy"
                src="https://uomo-html.flexkitux.com/images/about/about-2.jpg"
                width={450}
                height={500}
                alt=""
              />
            </div>
            <div className="content-wrapper col-lg-6 px-lg-4">
              <h5 className="mb-3">Our Services</h5>
              <p>
                {" "}
                <b>1.</b> Custom Tailoring - Perfectly tailored outfits designed
                to fit your unique measurements and preferences, ensuring
                unparalleled comfort and style.
                <br />
                <b>2.</b> Event-Specific Attire - Bespoke clothing crafted for
                weddings, galas, business events, and other special occasions.{" "}
                <br />
                <b>3.</b> Casual Luxury Wear - Elevated everyday clothing that
                combines comfort with sophistication for a modern, effortless
                look.
                <br />
                <b>4.</b> Personal Styling Consultations - Expert guidance to
                help you choose the perfect fabrics, colors, and designs that
                reflect your personality and style.
                <br />
                <b>5.</b> Alteration Services - Ensuring your favorite pieces
                fit flawlessly with our precise and professional alteration
                service.
                <br />
                <b>6.</b> Seasonal Collections - Exclusive, limited-edition
                collections inspired by global trends and timeless elegance.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="service-promotion horizontal container mw-930 pt-0 mb-md-4 pb-md-4 mb-xl-5">
        <div className="row">
          <div className="col-md-4 text-center mb-5 mb-md-0">
            <div className="service-promotion__icon mb-4">
              <svg
                width={52}
                height={52}
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_shipping" />
              </svg>
            </div>
            <h3 className="service-promotion__title fs-6 text-uppercase">
              Fast And Free Delivery
            </h3>
            <p className="service-promotion__content text-secondary">
              Free delivery for all orders over $100
            </p>
          </div>
          {/* /.col-md-4 text-center*/}
          <div className="col-md-4 text-center mb-5 mb-md-0">
            <div className="service-promotion__icon mb-4">
              <svg
                width={53}
                height={52}
                viewBox="0 0 53 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_headphone" />
              </svg>
            </div>
            <h3 className="service-promotion__title fs-6 text-uppercase">
              24/7 Customer Support
            </h3>
            <p className="service-promotion__content text-secondary">
              Friendly 24/7 customer support
            </p>
          </div>
          {/* /.col-md-4 text-center*/}
          <div className="col-md-4 text-center mb-4 pb-1 mb-md-0">
            <div className="service-promotion__icon mb-4">
              <svg
                width={52}
                height={52}
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <use href="#icon_shield" />
              </svg>
            </div>
            <h3 className="service-promotion__title fs-6 text-uppercase">
              Money Back Guarantee
            </h3>
            <p className="service-promotion__content text-secondary">
              We return money within 30 days
            </p>
          </div>
          {/* /.col-md-4 text-center*/}
        </div>
        {/* /.row */}
      </section>
    </div>
  );
}

export default About; // export default About;  // export default About;  // export default About
