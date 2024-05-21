import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Signup extends Component {
  state = {name: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = () => {
    const {name, password} = this.state
    if (name === '' || password === '') {
      this.setState({
        showSubmitError: true,
        errorMsg: '*Required Username and Password',
      })
    } else {
      const {history} = this.props
      history.replace('/login')
    }
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({name: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {name, password} = this.state
    const userdetails = {name, password}
    const loginApiUrl = 'https://jobbyback.onrender.com/signin'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userdetails),
    }

    try {
      const response = await fetch(loginApiUrl, options)
      const data = await response.json()

      if (response.ok) {
        this.onSubmitSuccess()
      } else {
        this.onSubmitFailure(data.error)
      }
    } catch (error) {
      console.error('Error during signup:', error)
      this.onSubmitFailure('Something went wrong. Please try again.')
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="rahul@2021"
        />
      </>
    )
  }

  renderUserNameField = () => {
    const {name} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="input-field"
          value={name}
          onChange={this.onChangeUsername}
          placeholder="rahul"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('token')
    if (jwtToken !== undefined) {
      return <Redirect to="/login" />
    }

    const back = () => {
      const {history} = this.props
      history.replace('/login')
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="website-logo"
            alt="website logo"
          />
          <h1 className="h">Signup</h1>

          <div className="input-container">{this.renderUserNameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>
          <div className="final">
            <button type="submit" className="fe logout-desktop-btn">
              Signup
            </button>
            <button
              type="button"
              className="fe logout-desktop-btn"
              onClick={back}
            >
              Back
            </button>
          </div>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Signup
