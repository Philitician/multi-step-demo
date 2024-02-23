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
import { DeliveryMethod, ProductVariant } from "../data";
import { DeliveryStepValues } from "../schema";
import { MultipleChoiceBlock } from "./multiple-choice-block";
import { MultipleChoiceBlock as MultipleChoiceBlockType } from "@/lib/payload-types";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

type ProductDeliveriesFieldProps = {
	zoneId: number;
	productVariant: ProductVariant;
	productDeliveryIndex: number;
};

export function ProductDeliverySection(props: ProductDeliveriesFieldProps) {
	// const zone = productVariant.zoneAvailabilities
	//             .find((za) => za.zones.some((z) => z.id === zoneId))
	//             ?.zones.find((z) => z.id === zoneId);

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
	deliveryMethods: DeliveryMethod[];
};

function DeliveryMethodAccordionField({
	zoneId,
	productVariant,
	productDeliveryIndex,
}: ProductDeliveriesFieldProps) {
	const { setValue } = useFormContext<DeliveryStepValues>();
	const { deliveryMethods } =
		productVariant.packagingGroup.packaging.deliveryType;
	return (
		<Accordion type="single" collapsible={false}>
			<RadioGroup>
				{deliveryMethods.map((deliveryMethod) => (
					<AccordionItem
						key={deliveryMethod.id}
						value={deliveryMethod.id.toString()}
					>
						<AccordionRadioTrigger
							id={`${deliveryMethod.id}`}
							onClick={() => {
								setValue(
									`productDeliveries.${productDeliveryIndex}.productId`,
									productVariant.product.id.toString(),
								);
								setValue(
									`productDeliveries.${productDeliveryIndex}.alternative.deliveryMethodId`,
									deliveryMethod.id.toString(),
								);
								setValue(
									`productDeliveries.${productDeliveryIndex}.alternative.formBlocks`,
									deliveryMethod.formBlocks.map(({ title, description }) => ({
										title,
										description,
										answer: "",
									})),
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
										<b>10 000 000,–</b>
									</div>
								</div>
							</Label>
						</AccordionRadioTrigger>
						<AccordionContent className="flex flex-col gap-2 items-start w-full">
							<p className="text-gray-700 ml-6">{deliveryMethod.description}</p>
							<FormBlockFields
								formBlocks={deliveryMethod.formBlocks}
								productDeliveryIndex={productDeliveryIndex}
							/>
						</AccordionContent>
					</AccordionItem>
				))}
			</RadioGroup>
		</Accordion>
	);
}

type FormBlocksFieldProps = {
	formBlocks: DeliveryMethod["formBlocks"];
	productDeliveryIndex: number;
};

function FormBlockFields({
	formBlocks,
	productDeliveryIndex,
}: FormBlocksFieldProps) {
	const { control } = useFormContext<DeliveryStepValues>();
	return (
		<div className="w-full">
			{formBlocks.map((formBlock, formBlockIndex) => (
				<div
					key={formBlock.id.toString()}
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
									</div>
								</FormLabel>
								<FormControl>
									<div>
										{formBlock.blockType === "multiple-choice-block" ? (
											<RadioGroup
												defaultValue={field.value?.answer}
												onValueChange={(e) => {
													console.log("input changed", {
														existingFieldValue: field.value,
														newAnswer: e,
													});
													field.onChange({
														...field.value,
														answer: e,
													});
												}}
												className="flex flex-row gap-5 items-start w-full justify-end"
											>
												{formBlock.choices.map((choice, choiceIndex) => (
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
										) : formBlock.blockType === "text-block" ? (
											<Input
												value={field.value?.answer || ""}
												onChange={(e) => {
													console.log("input changed", {
														existingFieldValue: field.value,
														newAnswer: e.target.value,
													});
													field.onChange({
														...field.value,
														answer: e.target.value,
													});
												}}
											/>
										) : formBlock.blockType === "text-area-block" ? (
											<textarea
												value={field.value?.answer || ""}
												onChange={(e) => {
													console.log("input changed", {
														existingFieldValue: field.value,
														newAnswer: e.target.value,
													});
													field.onChange({
														...field.value,
														answer: e.target.value,
													});
												}}
											/>
										) : null}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			))}
		</div>
	);
}
