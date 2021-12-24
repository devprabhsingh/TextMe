export const addVideo=(stream,isMuted)=>{
    const video = document.createElement("video")
    video.muted = isMuted
    if(isMuted)
      video.id="myvideo"
    else
      video.id="otheruservideo"
    video.srcObject=stream
    video.addEventListener("loadedmetadata", () => {
        video.play()
        document.getElementById('video-container').append(video);
      })
}

export const compressedFile= async (file)=>{
  const img = document.getElementById('uploadedPic')
  const canvas = document.createElement('canvas')
  canvas.width = 150
  canvas.height = 150
  const ctx = canvas.getContext('2d')
  try{
  ctx.drawImage(img, 0, 0, 150, 150)
   const jpegFile = canvas.toDataURL("image/jpeg");
   return jpegFile
  }catch(e){
    console.log(e)
  }
}
  