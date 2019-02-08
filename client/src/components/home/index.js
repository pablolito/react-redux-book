import React, { Component } from 'react'
import PostsList from './posts/posts-list-container'
import ContactForm from './contact/contact-form-container'
import Profil from './profil/profil-container'
import AboutMe from './about/about-container'

class Home extends Component {
    
    callbackActiveSection(id){
        this.props.activeSection(id);
    }
    render() {
        return (
            <div className="home">
                <Profil activeSection={(id)=>this.callbackActiveSection(id)} />
                <AboutMe />
                <PostsList />
                <ContactForm />
            </div>
        )
    }
}

export default Home
