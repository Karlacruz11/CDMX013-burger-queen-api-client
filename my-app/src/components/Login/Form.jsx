import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { getUsers } from '../../serviceApi'

function Form({ handleAccount }) {
  let navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorCredentials, changeCredentials] = useState(null)

  const handleEmailChange = ({ target }) => {
    setEmail(target.value)
  }
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getUsers().then((result) => {
      let users = true
      result.data.forEach((user) => {
        if (user.email === email) {
          handleAccount(user)
          console.log('test')
          users = false
          const role = user.role
          switch (role) {
            case 'admin':
              navigate('/admin/partners')
              break
            case 'kitchen':
              navigate('/kitchen/active')
              break
            case 'waiter':
              navigate('/waiters/new_order')
              break
            default:
              users = true
              break
          }
        }
      })
      changeCredentials(users)
    })
  }

  return (
    <form className="form-box" onSubmit={handleSubmit}>
      <label id="logIn-logo">Log In</label>
      <div id="roll-container">
        <button
          className="start roll"
          onClick={() => {
            setEmail('admin_karla@gmail.com')
            setPassword('123456')
          }}
          type="submit"
        >
          admin
        </button>
        <button
          className="start roll"
          onClick={() => {
            setEmail('kitchen_liz@gmail.com')
            setPassword('123456')
          }}
          type="submit"
        >
          kitchen
        </button>
        <button
          className="start roll"
          onClick={() => {
            setEmail('waiter_gaby@gmail.com')
            setPassword('123456')
          }}
          type="submit"
        >
          waiter
        </button>
      </div>
      <label htmlFor="email" className="fields-form">
        Email
      </label>
      <input
        className="input-form"
        name="email"
        placeholder="email"
        value={email}
        onChange={handleEmailChange}
        type="text"
        required
        onInvalid={(e) => e.target.setCustomValidity('This field is empty')}
        onInput={(e) => e.target.setCustomValidity('')}
      />
      <label className="fields-form" data-testid="pswd-label">
        Password
      </label>
      <input
        className="input-form"
        name="password"
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
        type="password"
        required
        onInvalid={(e) => e.target.setCustomValidity('This field is empty')}
        onInput={(e) => e.target.setCustomValidity('')}
      />
      {errorCredentials && (
        <div className="errorMessage">
          <p className="messageError">ERROR: Invalid Credentials</p>
        </div>
      )}
      <button className="start" x type="submit">
        Start
      </button>
    </form>
  )
}

export default Form
