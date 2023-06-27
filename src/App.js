import React from 'react';
import Header from './components/shared/Header';
import Footer from './components/shared/Footer';

const APP_URL_ROOT = "https://cdn.jsdelivr.net/gh/adnandossaji/adnandossaji.github.io@master";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section: window.location.hash.substring(1) || 'home',
        };
    }

    handleHashChange = () => {
        const section = window.location.hash.substring(1).split("-")[0]
        this.setState({ section });
    };

    componentDidMount() {
        window.addEventListener('hashchange', this.handleHashChange, false);

        if (this.isMobile()) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = `${APP_URL_ROOT}/assets/css/mobile.css`;
            document.head.appendChild(link);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange, false);
    }

    changeSection(section) {
        window.location.hash = `#${section}`;
        this.setState({ section });
    }

    isMobile() {
        return window.innerWidth <= 980;
    }

    getContentStyle() {
        if (this.isMobile()) {
            return {
                marginTop: '100px',
                marginBottom: '50px'
            };
        } else {
            return {
                marginTop: '50px',
                marginBottom: '50px'
            };
        }
    }

    render() {
        let content;

        // Import your component here
        // const Home = ...
        // const Blog = ...
        // const Photos = ...

        // if (this.state.section === 'home') {
        //     content = <Home isMobile={this.isMobile} />;
        // } else if (this.state.section === 'blog') {
        //     content = <Blog isMobile={this.isMobile} changeSection={section => this.changeSection(section)}></Blog>;
        // } else if (this.state.section === 'photos') {
        //     content = <Photos isMobile={this.isMobile} changeSection={section => this.changeSection(section)}></Photos>;
        // }

        return (
            <div>
                {/* Import your Header and Footer component here */}
                {/* const Header = ... */}
                {/* const Footer = ... */}
                <Header 
                    name="Adnan Dossaji"
                    changeSection={section => this.changeSection(section)}
                    isMobile={this.isMobile}
                />
                
                <div
                    className="content"
                    style={this.getContentStyle()}
                >
                    {content}
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;
