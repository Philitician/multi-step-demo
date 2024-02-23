import { z } from "zod";

export const deliveryStepSchema = z.object({
	productDeliveries: z.array(
		z.object({
			productId: z.string().min(1),
			alternative: z.object({
				deliveryMethodId: z.string().min(1),
				shippingPrice: z.number(),
				formBlocks: z.array(
					z.object({
						title: z.string().min(1),
						description: z.string().min(1),
						answer: z.string().min(1),
					}),
				),
			}),
		}),
	),
});

export type DeliveryStepValues = z.infer<typeof deliveryStepSchema>;
