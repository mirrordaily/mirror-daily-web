export default function StateContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <div className="flex flex-col items-center">{children}</div>
    </div>
  )
}
