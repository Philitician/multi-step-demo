import { AccordionRadioTrigger } from "@/components/custom/accordion-radio-trigger";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldErrors, useFormContext } from "react-hook-form";
import { DeliveryStepValues, HomeDeliveryExtendedValues } from "../schema";
import {
	DeliveryMethod,
	ProductVariant,
	Packaging,
	DeliveryType,
	Zone,
	Product,
} from "@/lib/payload-types";
import {
	CalendarIcon,
	ChevronDownIcon,
	ClockIcon,
	InfoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { capitalizeFirstLetter, cn, deduplicateArray } from "@/lib/utils";
import { DeliveryMethodsWithShippingPrice } from "../types";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import React from "react";
import { nb } from "date-fns/locale";
import { Checkbox } from "@/components/ui/checkbox";

type ProductDeliveriesFieldProps = {
	zoneId: number;
	productVariant: ProductVariant;
	productDeliveryIndex: number;
};

// TODO: Fix bug where if you change delivery method and change back again, the form values remain, but the UI doesn't reflect the values

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
									deliveryMethod.isHomeDelivery
										? setValue("isDeliveredToHome", true)
										: setValue("isDeliveredToHome", false);
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
										shippingPrice, // TODO: If item.quantity exceeds deliveryMethod.maximumLoad, the shippingPrice should be multiplied by the number of times the maximumLoad is exceeded. So the formula should be something like: shippingPrice * Math.ceil(item.quantity / deliveryMethod.maximumLoad)
									);
									if (
										// if the deliveryMethod has a formBlock of type multiple-choice-block with only 1 choice,
										// it's a checkbox where the user can choose to accept or decline the deliveryMethod.
										// We therefore set the value to "false" to indicate that the user has declined the deliveryMethod.
										// Inside the checkbox code we check if the answer is "false" and if so, the checkbox is unchecked.
										deliveryMethod.formBlocks?.[0].blockType ===
											"multiple-choice-block" &&
										deliveryMethod.formBlocks?.[0].choices?.length === 1
									) {
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
									} else {
										setValue(
											`productDeliveries.${productDeliveryIndex}.alternative.formBlocks`,
											deliveryMethod.formBlocks?.map(
												({ title, description }) => ({
													title,
													description: description || "",
													answer: "false",
												}),
											) || [],
										);
									}
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
	const {
		control,
		formState: { errors },
	} = useFormContext<DeliveryStepValues>();
	return (
		<div className="w-full">
			{deliveryMethod.formBlocks?.map((formBlock, formBlockIndex) => {
				// check if the formBlock has errors
				const formBlockErrors =
					errors.productDeliveries?.[productDeliveryIndex]?.alternative
						?.formBlocks?.[formBlockIndex]?.answer;
				return (
					<div
						key={formBlock.id?.toString()}
						// change background to red if formBlock has errors
						className={`${
							formBlockErrors
								? "bg-red-500 bg-opacity-20 shadow-red-500 shadow mt-2 mb-3"
								: "bg-[#e6f2eb]"
						} rounded my-1 px-4 py-3`}
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
																<InfoIcon className="stroke-primary" />
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
											{/* TODO: add another case for multiple-choice-block with 1 choice */}
											{formBlock.blockType === "multiple-choice-block" &&
											formBlock.choices?.length &&
											formBlock.choices?.length > 1 ? (
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
											) : formBlock.blockType === "multiple-choice-block" &&
											  formBlock.choices?.length &&
											  formBlock.choices?.length === 1 ? (
												<div className="flex flex-row gap-1 justify-end">
													<Checkbox
														id={formBlock.choices[0].id?.toString()}
														className="bg-white"
														checked={field.value?.answer !== "false"}
														onCheckedChange={(checked) => {
															const answer = checked
																? formBlock.choices?.[0].text
																: "false";
															field.onChange({ ...field.value, answer });
															return answer;
														}}
													/>
													<Label htmlFor={formBlock.choices[0].id?.toString()}>
														{formBlock.choices[0].text}
													</Label>
												</div>
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
								</FormItem>
							)}
						/>
					</div>
				);
			})}

			{deliveryMethod.isHomeDelivery && (
				<HomeDeliveryFields deliveryMethod={deliveryMethod} />
			)}
		</div>
	);
}

function HomeDeliveryFields({
	deliveryMethod,
}: { deliveryMethod: DeliveryMethod }) {
	const {
		control,
		watch,
		formState: { errors },
	} = useFormContext<DeliveryStepValues>();

	const deliveryDate = watch("deliveryTime.deliveryDate");
	const deliveryTimeRange = watch("deliveryTime.deliveryTimeRange");

	// type the errors correctly. This is needed because discriminated unions returns the wrong type
	const typedErrors = errors as FieldErrors<HomeDeliveryExtendedValues>;

	return (
		<>
			<FormField
				control={control}
				name="isDeliveredWhileNotHome"
				render={({ field }) => {
					const isDeliveredWhileNotHomeErrors =
						typedErrors.isDeliveredWhileNotHome;
					return (
						<div
							className={`${
								isDeliveredWhileNotHomeErrors
									? "bg-red-500 bg-opacity-20 shadow-red-500 shadow mt-2 mb-3"
									: "bg-[#e6f2eb]"
							} rounded my-1 px-4 py-6`}
						>
							<FormItem className="space-y-3">
								<FormControl>
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value?.toString()}
										className="flex flex-col gap-3"
									>
										<FormItem className="flex items-center gap-3 space-y-0 space-x-0">
											<FormControl>
												<RadioGroupItem value="true" className="bg-white" />
											</FormControl>
											<Label // Use Label here instead of FormLabel, so that the color doesn't change when errors are present
											>
												Ordren kan leveres når jeg ikke er hjemme
											</Label>
										</FormItem>{" "}
										<FormItem className="flex items-center gap-3 space-y-0 space-x-0">
											<FormControl>
												<RadioGroupItem value="false" className="bg-white" />
											</FormControl>
											<Label // Use Label here instead of FormLabel, so that the color doesn't change when errors are present
											>
												Jeg ønsker å være hjemme ved levering
											</Label>
										</FormItem>
									</RadioGroup>
								</FormControl>
							</FormItem>
						</div>
					);
				}}
			/>
			<div
				className={`${
					typedErrors.deliveryTime?.deliveryDate ||
					typedErrors.deliveryTime?.deliveryTimeRange
						? "bg-red-500 bg-opacity-20 shadow-red-500 shadow mt-2 mb-3"
						: "bg-[#e6f2eb]"
				} rounded my-1 px-4 py-6`}
			>
				<div className="flex flex-col items-start">
					<Label htmlFor="">Velg når du ønsker å få ordren levert</Label>
					<div
						id={`deliveryTimeAndDate${deliveryMethod.id?.toString()}`}
						className="flex w-full gap-2 py-4 justify-between"
					>
						<FormField
							control={control}
							name="deliveryTime.deliveryDate"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start w-full gap-1">
									<FormLabel>Dato</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"w-full pl-3 text-left font-normal gap-1",
														!field.value && "text-muted-foreground",
													)}
												>
													<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													<div className="flex w-full justify-between items-center">
														{field.value ? (
															field.value.toLocaleDateString("no-nb")
														) : (
															<span>Velg en Dato</span>
														)}
														<ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
													</div>
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={field.value}
												onSelect={field.onChange}
												// TODO: Find out how many days from now the user can select a delivery date. is this always the same, or can it vary depending on the delivery method or product?
												fromDate={new Date(Date.now() + 3600 * 1000 * 24 * 3)} // 3 days from now
												weekStartsOn={1}
												locale={nb}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</FormItem>
							)}
						/>
						<FormField
							control={control}
							name="deliveryTime.deliveryTimeRange"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start w-full gap-1">
									<FormLabel>Tidspunkt</FormLabel>
									<Select
										onValueChange={(value) => {
											return field.onChange(JSON.parse(value));
										}}
										defaultValue={JSON.stringify(field.value)}
									>
										<FormControl>
											<SelectTrigger>
												<div className="flex flex-row items-center gap-1">
													<ClockIcon className="h-4 w-4 opacity-50" />
													<SelectValue placeholder="Tidspunkt" />
												</div>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectGroup
											// TODO: find out home many time options should be in the list
											>
												<SelectLabel>Tidspunkt (fra-til)</SelectLabel>
												<SelectItem value={'{"from":"00.00", "to":"03.00"}'}>
													00:00-03:00
												</SelectItem>
												<SelectItem value={'{"from":"03.00", "to":"06.00"}'}>
													03:00-06:00
												</SelectItem>
												<SelectItem value={'{"from":"06.00", "to":"09.00"}'}>
													06:00-09:00
												</SelectItem>
												<SelectItem value={'{"from":"09.00", "to":"12.00"}'}>
													09:00-12:00
												</SelectItem>
												<SelectItem value={'{"from":"12.00", "to":"15.00"}'}>
													12:00-15:00
												</SelectItem>
												<SelectItem value={'{"from":"15.00", "to":"18.00"}'}>
													15:00-18:00
												</SelectItem>
												<SelectItem value={'{"from":"18.00", "to":"21.00"}'}>
													18:00-21:00
												</SelectItem>
												<SelectItem value={'{from:"21.00", to:"00.00"}'}>
													21:00-00:00
												</SelectItem>
											</SelectGroup>
										</SelectContent>
									</Select>
								</FormItem>
							)}
						/>
					</div>

					{deliveryDate && (
						<div>
							<b>Levering: </b>
							{capitalizeFirstLetter(
								deliveryDate.toLocaleDateString("no-nb", {
									weekday: "long",
									day: "numeric",
									month: "long",
									year: "numeric",
								}),
							)}
							{deliveryTimeRange && (
								<span className="px-0 mx-0">
									{" "}
									mellom kl. {deliveryTimeRange.from}-{deliveryTimeRange.to}
								</span>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
}
