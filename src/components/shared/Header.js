import React from 'react';

class Header extends React.Component {
  state = {
      isMobile: false,
      isMenuOpen: false,
  };

  componentDidMount() {
      this.setState({ isMobile: this.props.isMobile() });
      window.addEventListener("resize", this.checkIfMobile);
  }

  componentWillUnmount() {
      window.removeEventListener("resize", this.checkIfMobile);
  }

  checkIfMobile = () => {
      this.setState({ isMobile: this.props.isMobile() });
  };

  toggleMenu = () => {
      this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }));
  }


  render() {
      return (
          this.state.isMobile ?
          <div className="ui inverted top fixed massive menu">
              <div className="right menu">
                  <a className="ui item twitter" target="_blank" href="https://twitter.com/nansta" rel="noreferrer">
                      <i className="twitter icon"></i>
                  </a>
                  <a className="ui item instagram" target="_blank" href="https://www.instagram.com/adnanprint" rel="noreferrer">
                      <i className="instagram icon"></i>
                  </a>
                  <a className="ui item github" target="_blank" href="https://github.com/adnandossaji" rel="noreferrer">
                      <i className="github icon"></i>
                  </a>
                  <a className="ui item deviantart" target="_blank" href="https://deviantart.com/nansta" rel="noreferrer">
                      <i className="deviantart icon"></i>
                  </a>
                  <a className="ui item linkedin" target="_blank" href="https://www.linkedin.com/in/adnandossaji" rel="noreferrer">
                      <i className="linkedin icon"></i>
                  </a>
              </div>
          </div>
          :
          <div className="ui inverted top fixed menu">
              <h3 className="header item">{this.props.name}</h3>
              <a className="item" onClick={() => this.props.changeSection('home')}>Home</a>
              <a className="item" onClick={() => this.props.changeSection('blog')}>Blog</a>
              <a className="item" onClick={() => this.props.changeSection('photos')}>Photos</a>
              <div className="right menu">
                  <a className="ui item twitter" target="_blank" href="https://twitter.com/nansta" rel="noreferrer">
                      <i className="twitter icon"></i>
                  </a>
                  <a className="ui item instagram" target="_blank" href="https://www.instagram.com/adnanprint" rel="noreferrer">
                      <i className="instagram icon"></i>
                  </a>
                  <a className="ui item github" target="_blank" href="https://github.com/adnandossaji" rel="noreferrer">
                      <i className="github icon"></i>
                  </a>
                  <a className="ui item deviantart" target="_blank" href="https://deviantart.com/nansta" rel="noreferrer">
                      <i className="deviantart icon"></i>
                  </a>
                  <a className="ui item linkedin" target="_blank" href="https://www.linkedin.com/in/adnandossaji" rel="noreferrer">
                      <i className="linkedin icon"></i>
                  </a>
              </div>
          </div>
      );
  }
};

export default Header;
