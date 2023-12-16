import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepButton from '@mui/material/StepButton'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'
import { registerUser } from '../services/authThunk'

const steps = ['Личные данные', 'Адрес', 'Данные для входа']

const PersonalDataStep = ({ onChange, formData }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        justifyContent: 'center',
        width: '50%',
        margin: '50px auto',
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{ width: '100%' }}
        id="outlined-basic"
        label="Ф.И.О"
        variant="outlined"
        color="secondary"
        name="username"
        value={formData.username}
        onChange={onChange}
      />
      <TextField
        sx={{ width: '100%' }}
        id="outlined-basic"
        label="Email"
        variant="outlined"
        color="secondary"
        name="email"
        value={formData.email}
        onChange={onChange}
      />
    </Box>
  )
}

const AddressDataStep = ({ onChange, formData }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        justifyContent: 'center',
        width: '50%',
        margin: '50px auto',
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{ width: '100%' }}
        id="outlined-basic"
        label="Город"
        variant="outlined"
        color="secondary"
        name="city"
        value={formData.city}
        onChange={onChange}
      />
      <TextField
        sx={{ width: '100%' }}
        id="outlined-basic"
        label="Улица, дом, квартира"
        variant="outlined"
        color="secondary"
        name="address"
        value={formData.address}
        onChange={onChange}
      />
    </Box>
  )
}

const LoginDataStep = ({ onChange, formData }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        justifyContent: 'center',
        width: '50%',
        margin: '50px auto',
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <TextField
        sx={{ width: '100%' }}
        id="outlined-basic"
        label="Никнейм"
        variant="outlined"
        color="secondary"
        name="nickname"
        value={formData.nickname}
        onChange={onChange}
      />
      <TextField
        sx={{ width: '100%' }}
        id="outlined-basic"
        label="Пароль"
        variant="outlined"
        color="secondary"
        name="password"
        value={formData.password}
        onChange={onChange}
      />
    </Box>
  )
}

export default function Registration() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [completed, setCompleted] = React.useState({})
  const dispatch = useDispatch()
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    city: '',
    address: '',
    nickname: '',
    password: '',
  })

  const handleComplete = async () => {
    try {
      // 1. Получение данных из формы регистрации (предположим, что у вас есть состояние formData)
      const userData = {
        // Замените это на фактические значения из вашей формы
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }

      // 2. Диспетчеризация Async Thunk для регистрации пользователя
      await dispatch(registerUser(userData))

      // 3. Если регистрация успешна, переход к следующему шагу
      handleNext()
    } catch (error) {
      // 4. Обработка ошибок регистрации
      console.error('Error registering user:', error)
      // Здесь вы можете предпринять меры по отображению ошибок в интерфейсе пользователя
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const totalSteps = () => {
    return steps.length
  }

  const completedSteps = () => {
    return Object.keys(completed).length
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1
  }

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps()
  }

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1
    setActiveStep(newActiveStep)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleStep = (step) => () => {
    setActiveStep(step)
  }

  const handleReset = () => {
    setActiveStep(0)
    setCompleted({})
  }

  return (
    <Box sx={{ width: '800px', margin: '100px auto' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {activeStep === 0 && (
              <PersonalDataStep onChange={handleChange} formData={formData} />
            )}
            {activeStep === 1 && (
              <AddressDataStep onChange={handleChange} formData={formData} />
            )}
            {activeStep === 2 && (
              <LoginDataStep onChange={handleChange} formData={formData} />
            )}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
                color="secondary"
              >
                Назад
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep !== steps.length - 1 && (
                <Button color="secondary" onClick={handleNext} sx={{ mr: 1 }}>
                  Дальше
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button color="secondary" onClick={handleComplete}>
                  Закончить
                </Button>
              )}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  )
}
