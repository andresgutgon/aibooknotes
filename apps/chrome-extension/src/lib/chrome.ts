class Chrome {
  async sendMessage(payload) {
    return chrome.runtime.sendMessage(
      chrome.runtime.id,
      { greeting: "hello" }
    )
  }
}
