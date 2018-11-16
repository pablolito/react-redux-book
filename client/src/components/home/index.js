import React, { Component } from 'react'
import PostsList from './posts/posts-list-container'
import ContactForm from './contact/contact-form-container'
import Profil from './profil/profil-container'
import AboutMe from './about/about-container'
import { loadReCaptcha } from 'react-recaptcha-v3'
import ScrollToTop from '../shared/scrolltotoponmount'

class Home extends Component {
    componentDidMount () {
        loadReCaptcha('6LcUunkUAAAAADXNfFouriy_vqNo6RlQUxH6HS1X');
    }
    
    callbackActiveSection(id){
        this.props.activeSection(id);
    }
    render() {
        return (
            <div className="home">
                <ScrollToTop />
                <Profil activeSection={(id)=>this.callbackActiveSection(id)} />
                <AboutMe />
                <PostsList />
                <ContactForm />
            </div>
        )
    }
}

export default Home
