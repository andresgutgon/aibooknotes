import { Message, MessageType } from "./types"

class BackgroundMessage {
  async sendMessage<T extends MessageType>(message: Message<T>) {
    return chrome.runtime.sendMessage(
      chrome.runtime.id,
      message
    )
  }
}

const background = new BackgroundMessage()
export default background
