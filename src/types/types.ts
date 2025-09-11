export interface RequestItemInput {
  name: string;
  quantity: number;
  price: number;
}

export interface PurchaseRequestInput {
  items: RequestItemInput[];
}
