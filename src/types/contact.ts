export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
}

export interface VisitRequestData {
  name: string;
  phone: string;
  email: string;
  preferredDate: string;
  propertyId: string;
  propertyTitle: string;
}
