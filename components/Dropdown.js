import React, { useState } from 'react'

// Komponen untuk dropdown.
//
// Dropdown dimunculkan di sisi bawah dari teks toggler
// (bisa condong di sebelah kiri maupun ke kanan).
export const Dropdown = props => {
  const [isVisible, setVisibility] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setVisibility(!isVisible)}  className="focus:outline-none">
        {props.toggler}
      </button>

      {isVisible &&
        <DropdownMenu items={props.items} align={props.align} />
      }
    </div>
  )
}

const DropdownMenu = props => {
  if (!['left', 'right'].includes(props.align)) {
    return null
  }

  const items = props.items.map((item, i) =>
    <DropdownItem key={i}>{item}</DropdownItem>
  )

  return (
    <ul className={`absolute -bottom-12 ${props.align}-0 w-48 rounded
        text-base bg-white text-black shadow-lg`}>
      {items}
    </ul>
  )
}

const DropdownItem = props => {
  return <li>{props.children}</li>
}
