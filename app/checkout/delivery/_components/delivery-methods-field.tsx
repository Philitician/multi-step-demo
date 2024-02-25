import { AccordionRadioTrigger } from "@/components/custom/accordion-radio-trigger";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { DeliveryStepValues } from "../schema";
import {
	DeliveryMethod,
	ProductVariant,
	Packaging,
	DeliveryType,
	Zone,
	Product,
} from "@/lib/payload-types";
import { CalendarIcon, InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, deduplicateArray } from "@/lib/utils";
import { DeliveryMethodsWithShippingPrice } from "../types";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type ProductDeliveriesFieldProps = {
	zoneId: number;
	productVariant: ProductVariant;
	productDeliveryIndex: number;
};

export function ProductDeliverySection(props: ProductDeliveriesFieldProps) {
	return (
		<Accordion
			type="single"
			collapsible
			defaultValue={`${props.productVariant.name} Alternativer`}
			className="bg-[#f8fcfa] p-4"
		>
			<AccordionItem value={`${props.productVariant.name} Alternativer`}>
				<AccordionTrigger>Alternativer</AccordionTrigger>
				<AccordionContent>
					<DeliveryMethodAccordionField {...props} />
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}

type DeliveryMethodAccordionFieldProps = {
	zoneId: number;
	productVariant: ProductVariant;
	productDeliveryIndex: number;
};

function DeliveryMethodAccordionField({
	zoneId,
	productVariant,
	productDeliveryIndex,
}: DeliveryMethodAccordionFieldProps) {
	const { setValue } = useFormContext<DeliveryStepValues>();

	const deliveryType = (productVariant.packagingGroup.packaging as Packaging)
		.deliveryType as DeliveryType;

	const deliveryMethodsOnDeliveryType = deliveryType.deliveryMethods as
		| DeliveryMethod[]
		| undefined;

	const zone = (
		productVariant.zoneAvailabilities as NonNullable<
			ProductVariant["zoneAvailabilities"]
		>
	)
		.find((za) => (za.zones as Zone[]).some((z) => z.id === zoneId))
		?.zones.find((z) => (z as Zone).id === zoneId) as Zone | undefined;

	//console.log("zone:", zone);

	const deliveryMethodPricesOnZone: DeliveryMethodsWithShippingPrice[] = (
		zone?.deliveryMethodPrices?.filter((dmp) =>
			deliveryMethodsOnDeliveryType?.some(
				(dm) => dm.id === (dmp.deliveryMethod as DeliveryMethod).id,
			),
		) as NonNullable<Zone["deliveryMethodPrices"]>
	).map((dmp) => ({
		deliveryMethod: dmp.deliveryMethod as DeliveryMethod,
		shippingPrice: dmp.shippingPrice,
	}));

	if (!deliveryMethodPricesOnZone || !deliveryMethodsOnDeliveryType) {
		console.error(
			"deliveryMethodsOnZone or deliveryMethodsOnDeliveryType is undefined",
		);
		return null;
	}

	// Group the deliveryMethodsOnDeliveryType and deliveryMethodPricesOnZone based on the deliveryMethod.id
	const deliveryMethodsOnZoneAndDeliveryType: DeliveryMethodsWithShippingPrice[] =
		deduplicateArray(
			deliveryMethodsOnDeliveryType.map((deliveryMethod) => {
				const deliveryMethodPrices = deliveryMethodPricesOnZone.find(
					(dmp) => dmp.deliveryMethod.id === deliveryMethod.id,
				);
				return {
					id: deliveryMethod.id,
					deliveryMethod,
					shippingPrice: deliveryMethodPrices
						? deliveryMethodPrices.shippingPrice
						: 0,
				};
			}),
		);
	// console.log(deliveryMethodsOnZoneAndDeliveryType);

	// find the zone.deliveryMethodPrices that contains deliveryMethod's which are also present in deliveryMethodsOnDeliveryType

	return (
		<Accordion type="single" collapsible={false}>
			<RadioGroup>
				{deliveryMethodsOnZoneAndDeliveryType.map(
					({ deliveryMethod, shippingPrice }) => (
						<AccordionItem
							key={deliveryMethod.id}
							value={deliveryMethod.id.toString()}
						>
							<AccordionRadioTrigger
								id={`${deliveryMethod.id}`}
								onClick={() => {
									setValue(
										`productDeliveries.${productDeliveryIndex}.productId`,
										(productVariant.product as Product).id.toString(),
									);
									setValue(
										`productDeliveries.${productDeliveryIndex}.alternative.deliveryMethodId`,
										deliveryMethod.id.toString(),
									);
									setValue(
										`productDeliveries.${productDeliveryIndex}.alternative.shippingPrice`,
										shippingPrice,
									);
									setValue(
										`productDeliveries.${productDeliveryIndex}.alternative.formBlocks`,
										deliveryMethod.formBlocks?.map(
											({ title, description }) => ({
												title,
												description: description || "",
												answer: "",
											}),
										) || [],
									);
								}}
							>
								<Label
									key={deliveryMethod.id}
									htmlFor={`${deliveryMethod.id}`}
									className="flex items-center space-x-2 w-full"
								>
									<div className="flex justify-between text-left leading-6 w-full">
										<div className="">{deliveryMethod.name}</div>
										<div className="whitespace-nowrap ml-12">
											<b>
												{shippingPrice >= 0
													? `${shippingPrice.toLocaleString("no-nb")},-`
													: "Avtales"}
											</b>
										</div>
									</div>
								</Label>
							</AccordionRadioTrigger>
							<AccordionContent className="flex flex-col gap-2 items-start w-full">
								<p className="text-gray-700 ml-6">
									{deliveryMethod.description}
								</p>
								<FormBlockFields
									deliveryMethod={deliveryMethod}
									productDeliveryIndex={productDeliveryIndex}
								/>
							</AccordionContent>
						</AccordionItem>
					),
				)}
			</RadioGroup>
		</Accordion>
	);
}

type FormBlocksFieldProps = {
	deliveryMethod: DeliveryMethod;
	productDeliveryIndex: number;
};

function FormBlockFields({
	deliveryMethod,
	productDeliveryIndex,
}: FormBlocksFieldProps) {
	const { control } = useFormContext<DeliveryStepValues>();
	return (
		<div className="w-full">
			{deliveryMethod.formBlocks?.map((formBlock, formBlockIndex) => (
				<div
					key={formBlock.id?.toString()}
					className="bg-[#e6f2eb] rounded my-1 px-4 py-3"
				>
					<FormField
						control={control}
						name={`productDeliveries.${productDeliveryIndex}.alternative.formBlocks.${formBlockIndex}`}
						render={({ field }) => (
							<FormItem>
								<FormLabel>
									<div className="flex justify-between">
										{/* TODO: Make this div/text wrap correctly. */}
										<div>{formBlock.title}</div>
										{formBlock.description && (
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button type="button" style={{ all: "unset" }}>
															<InfoIcon />
														</Button>
													</TooltipTrigger>
													<TooltipContent>
														<p>{formBlock.description}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										)}
									</div>
								</FormLabel>
								<FormControl>
									<div>
										{/* TODO: extract the form blocks to a separate component */}
										{formBlock.blockType === "multiple-choice-block" ? (
											<RadioGroup
												defaultValue={field.value?.answer}
												onValueChange={(e) => {
													field.onChange({
														...field.value,
														answer: e,
													});
												}}
												className="flex flex-row gap-5 items-start w-full justify-end"
											>
												{formBlock.choices?.map((choice, choiceIndex) => (
													<div
														key={choice.id}
														className="flex items-center space-x-1"
													>
														<RadioGroupItem
															value={choice.text}
															id={choice.id?.toString()}
															className="bg-white"
														/>
														<Label htmlFor={choice.id?.toString()}>
															{choice.text}
														</Label>
													</div>
												))}
											</RadioGroup>
										) : formBlock.blockType === "text-area-block" ? (
											<>
												<Textarea
													id={formBlock.id?.toString()}
													placeholder={formBlock.placeholder || ""}
													onChange={(e) => {
														field.onChange({
															...field.value,
															answer: e.target.value,
														});
													}}
												/>
											</>
										) : null}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			))}

			{deliveryMethod.isHomeDelivery && (
				<HomeDeliveryFields deliveryMethod={deliveryMethod} />
			)}
		</div>
	);
}

function HomeDeliveryFields({
	deliveryMethod,
}: { deliveryMethod: DeliveryMethod }) {
	// TODO: Add this to the form
	return (
		<>
			<div
				key={`deliveryWhileHome${deliveryMethod.id?.toString()}`}
				className="bg-[#e6f2eb] rounded my-1 px-4 py-6"
			>
				<div className="flex items-center space-x-2">
					<RadioGroup className="flex flex-col items-start gap-3">
						<div className="flex items-center gap-2">
							<RadioGroupItem value="true" id="true" />
							<Label htmlFor="true">
								Ordren kan leveres når jeg ikke er hjemme
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<RadioGroupItem value="false" id="false" />
							<Label htmlFor="false">
								Jeg ønsker å være hjemme ved levering
							</Label>
						</div>
					</RadioGroup>
				</div>
			</div>
			<div
				key={`deliveryDate${deliveryMethod.id?.toString()}`}
				className="bg-[#e6f2eb] rounded my-1 px-4 py-6"
			>
				{/* TODO: add datepicker from shadcn https://ui.shadcn.com/docs/components/date-picker#form */}
				<div className="flex flex-col items-start">
					<Label htmlFor="">Velg når du ønsker å få ordren levert</Label>
					<div
						id={`deliveryTimeAndDate${deliveryMethod.id?.toString()}`}
						className="flex w-full gap-2 py-4 justify-between"
					>
						<div className="flex flex-col items-start w-full gap-1">
							<Label htmlFor="deliveryDate">Dato</Label>
							<Input
								type="date"
								id={`deliveryDate${deliveryMethod.id?.toString()}`}
								placeholder="Dato"
							/>
						</div>
						<div className="flex flex-col items-start w-full gap-1">
							<Label htmlFor="deliveryTimeRange">Tidspunkt</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Tidspunkt" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{/* TODO: find out home many time options should be in the list */}
										<SelectLabel>Tidspunkt (fra-til)</SelectLabel>
										<SelectItem value="00:00-03:00">00:00-03:00</SelectItem>
										<SelectItem value="03:00-06:00">03:00-06:00</SelectItem>
										<SelectItem value="06:00-09:00">06:00-09:00</SelectItem>
										<SelectItem value="09:00-12:00">09:00-12:00</SelectItem>
										<SelectItem value="12:00-15:00">12:00-15:00</SelectItem>
										<SelectItem value="15:00-18:00">15:00-18:00</SelectItem>
										<SelectItem value="18:00-21:00">18:00-21:00</SelectItem>
										<SelectItem value="21:00-00:00">21:00-00:00</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className="mt-2">
						<p>
							<b>Levering:</b> `chosenDate.toText` mellom kl. `chosenTime`
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
