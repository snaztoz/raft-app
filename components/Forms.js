import React, { useState } from 'react'

import style from 'styles/Forms.module.css'

const Input = props => {
  const inputType = props.inputType
  const name = props.name
  const placeholder = props.placeholder
  const isErrorExist = props.isErrorExist
  const errorMsg = props.errorMsg

  return (
    <>
      <input type={inputType} name={name} placeholder={placeholder}
          className={`
            ${style.no_outline}
            ${isErrorExist? 'border-red-400': 'border-gray-300 focus:border-green-500'}
            w-full px-3 py-2 rounded border-b-2`}/>

      <p className="text-left px-3">
        <small className={`
            text-red-400
            ${isErrorExist? null: 'invisible'}`}>
          {errorMsg? errorMsg: 'no error'}
        </small>
      </p>
    </>
  )
}

export const TextInput = props => {
  return <Input inputType="text" {...props} />
}

export const PasswordInput = props => {
  return <Input inputType="password" {...props} />
}

export const SubmitButton = props => {
  const [clicked, setClicked] = useState(false)
  const value = props.value
  const styles = `
    ${style.no_outline}
    ${clicked? 'bg-gray-400': 'bg-green-500 hover:bg-green-600 focus:bg-green-600'}
    w-full p-3 rounded-full font-semibold text-white relative
  `

  return (
    <button type="submit" value={value} className={styles} disabled={clicked}
        onClick={async e => {
          e.preventDefault()
          setClicked(true)
          await props.handleClick().catch(() => setClicked(false))
        }}>
      {value}
      {clicked &&
        <div className={`absolute ${style.submit_button_spinner} right-3 top-3`}></div>
      }
    </button>
  )
}
