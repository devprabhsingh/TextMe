export const addVideo=(stream,isMuted)=>{
    const video = document.createElement("video")
    video.muted = isMuted
    video.srcObject=stream
    video.addEventListener("loadedmetadata", () => {
        video.play()
        document.getElementById('video-container').append(video);
      })
}
