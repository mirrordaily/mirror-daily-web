type Props = {
  onClose: () => void
}

export default function UploadModal({ onClose }: Props) {
  const closeHandler = () => {
    onClose()
  }

  return (
    <div
      className="fixed inset-x-0 bottom-[var(--shorts-header-height)] top-0 z-upload-modal bg-[#7F8493]/80"
      onClick={closeHandler}
    >
      <div
        className="mx-auto h-[calc(100%-12px)] w-full max-w-screen-sm rounded-[0px_0px_20px_20px] bg-white px-7 pb-9 pt-5 md:max-h-[720px]"
        onClick={(event) => event.stopPropagation()}
      ></div>
    </div>
  )
}
