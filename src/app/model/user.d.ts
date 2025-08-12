import { EUserRoles } from "../types/enum"
import { IHotelBooking } from "./Hotel"

export interface IUser {
    id: number
    username: string
    email: string
    provider?: string
    providerId?: string
    password: string
    name: string
    gender: boolean
    avt: string
    phoneNumber: string
    birthday: Date
    address?: string
    NIDNumber?: string
    idToken?: string
    cartId? : number[]
    ratings?: IRating[]
    chatFromUser?: number[]
    chatToUser?: number[]
    hotels?: number[]
    roles?: EUserRoles
    status? : boolean
  }