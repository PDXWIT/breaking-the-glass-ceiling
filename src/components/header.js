import React, { Fragment } from "react"
import { Link } from "gatsby"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image";

import MobileMenu from "./mobileMenu";

const Links = () => (
  <Fragment>
    <Link to="/episodes" className="header__nav-item">
      Episodes
    </Link>
    <Link to="/about" className="header__nav-item">
      About
    </Link>
  </Fragment>
);

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      logoImage: file(absolutePath: { regex: "/src/images/pdxwit_logo.png/" }) {
        childImageSharp {
          fixed(height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <header className="header">
      <div className="header__nav header__nav--left">
        <a href="https://www.pdxwit.org">
          <Img className="header__logo" fixed={data.logoImage.childImageSharp.fixed} />
        </a>
      </div>

      <div className="header__nav header__nav--right">
        <div className="header__links">
          <Links />
        </div>

        <MobileMenu>
          <Links />
        </MobileMenu>
      </div>
    </header>
  );
};

export default Header;
