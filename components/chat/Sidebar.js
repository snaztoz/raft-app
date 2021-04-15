import { Dropdown } from 'components/Dropdown'
import { ProfileHeader } from 'components/chat/ProfileHeader'

export const Sidebar = () => {
  // untuk saat ini hanya menampilkan button untuk logout
  const ddItems = [
    <button className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100">
      Logout
    </button>
  ]
  const userProfileDropdown =
    <Dropdown toggler={<span className="text-2xl font-extrabold">{`\u22EE`}</span>}
        align="right" items={ddItems}/>

  return (
    <aside className="relative col-span-4 h-full shadow-xl">
      <ProfileHeader bgColor="bg-green-300" textColor="text-white" name="Foo"
          image="/me-square.jpg" otherActions={userProfileDropdown} />

      <AddNewChatroomButton />
    </aside>
  )
}

const AddNewChatroomButton = () => {
  return (
    <div className="absolute bottom-3 left-3 w-14 h-14 bg-red-200 hover:bg-red-300
        rounded-full flex justify-center items-center shadow-lg">
      <button className="w-full h-full font-bold text-white text-4xl pb-2
          focus:outline-none"
          onClick={() => console.log('CLICKED')}>+</button>
    </div>
  )
}
