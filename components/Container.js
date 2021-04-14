export const Container = props => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      {props.children}
    </div>
  )
}
