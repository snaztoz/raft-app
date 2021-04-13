import Image from 'next/image'

export const ProfileHeader = props => {
  return (
    <header className={`flex ${props.bgColor} ${props.textColor} font-semibold`}>
      <div className="m-2 mb-1">
        <Image src={props.image} className="rounded-full" layout="fixed"
            width="48rem" height="48rem" />
      </div>

      <div className="w-full pl-3 pr-6 text-lg flex justify-between items-center">
        <h1 className="inline-block">{props.name}</h1>
        <div>{props.otherActions}</div>
      </div>
    </header>
  )
}
