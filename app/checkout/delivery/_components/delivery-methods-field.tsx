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
import { RadioGroup } from "@/components/ui/radio-group";
import { useFormContext } from "react-hook-form";
import { DeliveryMethod, ProductVariant } from "../data";
import { DeliveryStepValues } from "../schema";

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
    <Accordion type="single" collapsible>
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
                  `productDeliveries.${productDeliveryIndex}.alternative.formBlocks`,
                  deliveryMethod.formBlocks.map(({ title, description }) => ({
                    title,
                    description,
                    answer: "",
                  }))
                );
              }}
            >
              <Label
                key={deliveryMethod.id}
                htmlFor={`${deliveryMethod.id}`}
                className="flex items-center space-x-2"
              >
                <div className="flex justify-between w-full">
                  <div>{deliveryMethod.name}</div>
                  <div>shippingPrice placeholder,–</div>
                </div>
              </Label>
            </AccordionRadioTrigger>
            <AccordionContent className="flex flex-col gap-2 items-start">
              <div>{deliveryMethod.description}</div>
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
    <div>
      {formBlocks.map((formBlock, formBlockIndex) => (
        <FormField
          key={formBlockIndex}
          control={control}
          name={`productDeliveries.${productDeliveryIndex}.alternative.formBlocks.${formBlockIndex}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{formBlock.title}</FormLabel>
              <FormControl>
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
