import style from 'styles/Forms.module.css'

const Input = props => {
  const inputType = props.inputType
  const name = props.name
  const placeholder = props.placeholder

  return (
    <input type={inputType} name={name} placeholder={placeholder}
        className={`${style.no_outline} w-full p-3 rounded border-b-2
        border-gray-300 focus:border-green-500`}/>
  )
}

export const TextInput = props => {
  return <Input inputType="text" {...props} />
}

export const PasswordInput = props => {
  return <Input inputType="password" {...props} />
}

export const SubmitButton = props => {
  const value = props.value

  return (
    <button type="submit" value={value} className={`${style.no_outline} w-full p-3
        rounded-full bg-green-500 hover:bg-green-600 focus:bg-green-600 font-semibold
        text-white`} onClick={e => {
          e.preventDefault()
          props.handleClick()
        }}>
      {value}
    </button>
  )
}
