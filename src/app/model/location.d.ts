export interface ILocation {
    id?: number
    name: string
    img? : string
    address: string
    description?: string
    imageUrl?: string
    hotelList?: IHotel[]
    createdAt?: Date
}