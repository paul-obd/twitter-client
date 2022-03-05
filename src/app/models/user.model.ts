import { Tweet } from "./tweet.model"

export class User{
    _id: any
    email: string
    userName: string
    password: string
    posts: [Tweet]

}