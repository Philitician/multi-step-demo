import { DeliveryMethod } from "@/lib/payload-types";

export type DeliveryMethodsWithShippingPrice = {
	deliveryMethod: DeliveryMethod;
	shippingPrice: number;
};
