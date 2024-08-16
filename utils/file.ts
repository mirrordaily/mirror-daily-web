const blobToFile = (blob: Blob, fileName: string, extension: string) =>
  new File([blob], fileName, {
    type: extension,
  })

/** @see https://stackoverflow.com/a/76701165 */
export const getImageFromFrame = (
  videoFile: File,
  options: {
    frameTimeInSeconds: number
    filename?: string
    extension?: string
  } = {
    frameTimeInSeconds: 0.5,
    extension: 'png',
  }
): Promise<File> => {
  return new Promise<File>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const video = document.createElement('video')
    const source = document.createElement('source')
    const context = canvas.getContext('2d')
    const urlRef = URL.createObjectURL(videoFile)

    video.style.display = 'none'
    canvas.style.display = 'none'

    source.setAttribute('src', urlRef)
    video.setAttribute('crossorigin', 'anonymous')
    video.setAttribute('preload', 'metadata')

    video.appendChild(source)
    document.body.appendChild(canvas)
    document.body.appendChild(video)

    if (!context) {
      reject(new Error('No context'))
      return
    }

    video.currentTime = options.frameTimeInSeconds
    video.load()

    video.addEventListener('loadedmetadata', function () {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
    })

    video.addEventListener('loadeddata', function () {
      setTimeout(() => {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
        canvas.toBlob((blob) => {
          if (!blob) return
          resolve(
            blobToFile(
              blob,
              (options.filename || videoFile.name) +
                '_preview.' +
                options.extension,
              'image/' + options.extension
            )
          )
          URL.revokeObjectURL(urlRef)

          video.remove()
          canvas.remove()
        }, 'image/' + options.extension)
      }, 500)
    })
  })
}

export const convertBlobToString = (blob: Blob) => URL.createObjectURL(blob)

export const convertStringToFile = async (
  str: string,
  fileName: string,
  extension?: string
) => {
  const request = new Request(str)

  return await fetch(request)
    .then((response) => response.blob())
    .then((blob) => blobToFile(blob, fileName, extension ?? blob.type))
}
