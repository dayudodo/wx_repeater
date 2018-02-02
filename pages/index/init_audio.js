var initAudio = (context, audioId) => {
  // 使用 wx.createAudioContext 获取 audio 上下文 context
  context.audioCtx = wx.createInnerAudioContext(audioId)
  context.audioCtx.onError((res) => {
    console.log(res.errMsg)
    console.log(res.errCode)
  })
}

module.exports =  initAudio
