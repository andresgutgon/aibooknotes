import { AnyObject } from "core";

export enum MessageType {
  signIn = 'sign_in'
}
export type Message<T extends MessageType> = T extends MessageType.signIn
  ? { type: T, payload: { url: string } }
  : AnyObject
