import { ProfileHeader } from 'components/chat/ProfileHeader'

export const Sidebar = () => {
  return (
    <aside className="relative col-span-4 h-full shadow-xl">
      <ProfileHeader bgColor="bg-green-300" textColor="text-white" name="Foo"
          image="/me-square.jpg" otherActions="act" />

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
