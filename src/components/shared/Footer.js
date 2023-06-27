import React from 'react';

class Footer extends React.Component {
  render() {
      return (
          <div className="ui vertical segment">
              <div className="ui center aligned container">
                  <p>© {(new Date()).getFullYear()} Adnan Dossaji</p>
              </div>
          </div>
      );
  };
};

export default Footer;
