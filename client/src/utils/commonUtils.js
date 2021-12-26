
export const insertToDom=(stream,isMuted,enableVideo)=>{
  const videoBox = document.getElementById('video-container')

   if(enableVideo){
    const video = document.createElement("video")
    video.muted = isMuted
    if(isMuted)
      video.id="myvideo"
    else
      video.id="otheruservideo"
    video.srcObject=stream
    video.addEventListener("loadedmetadata", () => {
        video.play()
        videoBox.append(video)
      })
      if(video.id==="otheruservideo"){
        video.style.height='50%'
        document.getElementById('myvideo').style.height='50%'
      }

   }else{
    console.log(stream)
     const audio = document.createElement('audio')
     audio.muted=isMuted
     audio.srcObject= stream
     audio.addEventListener('loadedmetadata',()=>{
       audio.play()
       videoBox.append(audio)
     })
   }
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
  