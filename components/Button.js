import Link from 'next/link'

const buttonStyles = {
  primary: `
    inline-block border-2 border-green-500 bg-green-500 px-3
    py-2 text-white rounded-md font-semibold hover:bg-green-600
    hover:border-green-600 focus:outline-none
  `,

  secondary: `
    inline-block border-2 border-green-500 px-3 py-2 rounded-md
    text-green-500 font-semibold hover:border-green-600
    hover:text-green-600 focus:outline-none
  `
}

export const ActionButton = props => {
  assertValidButtonType(props.buttonType)

  const style = buttonStyles[props.buttonType]

  return (
    <button className={style} onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

export const LinkButton = props => {
  assertValidButtonType(props.buttonType)

  const style = buttonStyles[props.buttonType]

  return (
    <Link href={props.link}>
      <a className={style}>{props.text}</a>
    </Link>
  )
}

const assertValidButtonType = buttonType => {
  if (!buttonType) {
    throw new Error('button type must be specified')
  } else if (!buttonStyles.hasOwnProperty(buttonType)) {
    throw new Error('button type not recognized')
  }
}
