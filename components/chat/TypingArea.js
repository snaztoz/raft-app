import { ActionButton } from 'components/Button'

export const TypingArea = () => {
  return (
    <div className="bg-white flex px-3 py-2">
      <textarea className="w-full ml-1 mr-3 py-3 px-5 resize-none outline-none
          bg-gray-200 rounded-2xl" rows="1" placeholder="Type something"></textarea>

      <div className="mr-3 flex items-center">
        <ActionButton buttonType="primary" text="Send"
            handleClick={() => console.log('CLICKED')}/>
      </div>
    </div>
  )
}
