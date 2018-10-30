import React from 'react'
import PostsList from './posts/posts-list-container'
import ContactForm from './contact/contact-form-container'
import Profil from './profil/profil-container'
import AboutMe from './about/about-container'

const Home = () => {
    return (
        <div className="home">
            <Profil />
            <AboutMe  />
            <PostsList />
            <ContactForm />
        </div>
    )
}

export default Home