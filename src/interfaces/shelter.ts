export interface IShelter {
  shelterName: string
  shelterEmail: string
  shelterPhone: string
  shelterWhatsApp: string
  createdAt: string
  updatedAt: string
}

export interface IUpdateShelterRequest {
  name: string
  email: string
  phone: string
  whatsApp: string
}

export interface IUpdateShelterResponse extends IUpdateShelterRequest {}
