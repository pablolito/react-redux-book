import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './home'
import Post from './post/post-container'
import NotFound from './shared/not-found'
import Header from './shared/header'
import Backtotop from './shared/backtotop'
import { connect } from 'react-redux'

class App extends Component {

  render() {
    return (
      <div>
        <Header></Header>
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/post/:id" component={Post} />
            <Route component={NotFound} />
          </Switch>
          <Backtotop />
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
