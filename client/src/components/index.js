import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './home'
import Post from './post/post-container'
import NotFound from './shared/not-found'
import Header from './shared/header'
import Backtotop from './shared/backtotop'
import Footer from './shared/footer'
import { connect } from 'react-redux'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {activeSection:null}
  }

  componentDidMount(){
    window.onblur = function () { document.title = "Merci d'être passé"; }
    window.onfocus = function () { document.title = "Maxime Falguier portfolio web"; }
  }

  callbackActiveSection(id){
    this.setState({activeSection:id})
  }
  render() {
    return (
      <div>
        <Header activeSection={this.state.activeSection}></Header>
        <main>
          <Switch>
            <Route exact path="/" render={() => ( <Home activeSection={(id)=>this.callbackActiveSection(id)}/> )} />
            <Route exact path="/projet/:id/:title" component={Post} />
            <Route component={NotFound} />
          </Switch>
          <Backtotop />
          {(this.props.router.location.pathname === "/") ? 
            <Footer />
            : null
          }
          
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    router: state.router
  }
}

export default connect(mapStateToProps)(App)
