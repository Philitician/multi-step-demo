import { z } from "zod";

const deliveryStepSchema = z.object({
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
	isDeliveredToHome: z.literal(false),
});

// FOR WHEN WE ADD A MAP AND IMAGE UPLOAD
// const MAX_FILE_SIZE_IN_BYTES = 10_000_000;
// const ACCEPTED_IMAGE_TYPES = [
// 	"image/jpeg",
// 	"image/jpg",
// 	"image/png",
// 	"image/webp",
// ];
const homeDeliveryExtendedSchema = z.object({
	isDeliveredToHome: z.literal(true),
	// FOR WHEN WE ADD A MAP AND IMAGE UPLOAD
	// deliveryLocation: z.object({
	// 	imageUrl: z.string().url(),
	// 	image: z
	// 		.any()
	// 		.refine(
	// 			(files) => files?.[0]?.size <= MAX_FILE_SIZE_IN_BYTES,
	// 			"Max image size is 5MB.",
	// 		)
	// 		.refine(
	// 			(files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
	// 			"Only .jpg, .jpeg, .png and .webp formats are supported.",
	// 		),
	// 	position: z.object({
	// 		lat: z.number(),
	// 		lng: z.number(),
	// 	}),
	// 	description: z.string(),
	// }),
	isDeliveredWhileNotHome: z.enum(["true", "false"]), // This is a string because it's a radio button which can only return strings
	deliveryTime: z.object({
		deliveryDate: z.date(),
		deliveryTimeRange: z.object({
			from: z.string(),
			to: z.string(),
		}),
	}),
});

export type HomeDeliveryExtendedValues = z.infer<
	typeof homeDeliveryExtendedSchema
>;

const mergedFormSchema = deliveryStepSchema.merge(homeDeliveryExtendedSchema);

export const discriminatedDeliveryFormSchema = z.discriminatedUnion(
	"isDeliveredToHome",
	[deliveryStepSchema, mergedFormSchema],
);

export type DeliveryStepValues = z.infer<
	typeof discriminatedDeliveryFormSchema
>;
