import { useState } from "react"

function App() {

  const [data, setData] = useState({
    fullName: '',
    email: '',
    maritalStatus: '',
    genre: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      const newData = { ...prev, [name]: value }

      return newData
    })
  }

  const calculateProgres = () => {
    const fullBar = 100
    let totalInputs = Object.keys(data).length
    let totalValidatedInputs = 0

    if (data.fullName) {
      const formattedName =
        data.fullName.match(/^[a-zA-Z\u00C0-\u017F´]+\s+[a-zA-Z\u00C0-\u017F´]{0,}$/)
        && data.fullName.trim().split(' ').length >= 2

      if (formattedName) {
        totalValidatedInputs += 1
      }
    }
    if (data.email) {
      const formattedEmail = data.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      if (formattedEmail) {
        totalValidatedInputs += 1
      }
    }
    if (data.maritalStatus) {
      totalValidatedInputs += 1
    }
    if (data.genre) {
      totalValidatedInputs += 1
    }

    let totalPercentage = (fullBar * totalValidatedInputs) / totalInputs

    return totalPercentage
  }

  calculateProgres()

  const handleSubmmited = () => {
    alert('Cadastro enviado com sucesso')
  }

  return (
    <div className='App'>
      <h1>Progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${calculateProgres()}%` }}></div>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Nome Completo</label>
          <input
            name='fullName'
            value={data.fullName}
            onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>E-mail</label>
          <input
            name='email'
            value={data.email}
            onChange={handleChange} />
        </div>
        <div className='form-group'>
          <label htmlFor=''>Estado Civil</label>
          <select
            name="maritalStatus"
            value={data.maritalStatus}
            onChange={handleChange}>
            <option value=''>- selecione...</option>
            <option value='solteiro'>Solteiro</option>
            <option value='casado'>Casado</option>
            <option value='divorciado'>Divorciado</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor=''>Gênero</label>
          <div className='radios-container'>
            <span>
              <input
                type='radio'
                name='genre'
                value={'masculino'}
                onChange={handleChange}
                checked={data.genre === 'masculino'}
              /> Masculino
            </span>
            <span>
              <input
                type='radio'
                name='genre'
                value={'feminino'}
                onChange={handleChange}
                checked={data.genre === 'feminino'}
              /> Feminino
            </span>
          </div>
        </div>
        <button onClick={handleSubmmited} disabled={calculateProgres() !== 100}>Enviar Formulário</button>
      </main>
    </div>
  )
}

export default App
