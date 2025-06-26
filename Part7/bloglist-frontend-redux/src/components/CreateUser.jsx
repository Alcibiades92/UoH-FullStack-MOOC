import { useState } from 'react'
import { setPassword } from '../reducer/userReducer'
import { useDispatch } from 'react-redux'
import { createUser } from '../reducer/usersReducer'

// Style Imports
import { TextField, Button, Box } from '@mui/material'

const CreateUser = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createUser({ name, username, password }))
    setName('')
    setUsername('')
    setPassword('')
  }

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        label="Name"
        type="text"
        name="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></TextField>
      <TextField
        label="Username"
        variant="outlined"
        type="text"
        value={username}
        name="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></TextField>
      <TextField
        label="Password"
        name="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></TextField>
      <Button variant="contained" color="primary" type="submit">
        Create User
      </Button>
    </Box>
  )
}

export default CreateUser
