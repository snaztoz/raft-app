import Image from 'next/image'

export const ProfileHeader = props => {
  return (
    <header className={`px-3 pt-1 flex ${props.bgColor} ${props.textColor} font-semibold`}>
      <div>
        <Image src={props.image} className="rounded-full" layout="fixed"
            width="48rem" height="48rem" />
      </div>

      <div className="w-full mx-3 pb-1 text-lg flex justify-between items-center">
        <h1 className="inline-block">{props.name}</h1>
        <div>{props.otherActions}</div>
      </div>
    </header>
  )
}
