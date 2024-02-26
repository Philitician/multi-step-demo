import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultipleChoiceBlock as MultipleChoiceBlockType } from "@/lib/payload-types";

export type MultipleChoiceBlockProps = {
	choices: NonNullable<MultipleChoiceBlockType["choices"]>;
	// field
};
export function MultipleChoiceBlock({
	choices /*, field*/,
}: MultipleChoiceBlockProps) {
	return (
		<RadioGroup>
			{choices.map((choice, choiceIndex) => (
				<div key={choice.id} className="flex items-center space-x-2">
					<RadioGroupItem value={choice.text} id={choice.id?.toString()} />
					<Label htmlFor={choice.id?.toString()}>{choice.text}</Label>
				</div>
			))}
		</RadioGroup>

		// <RadioGroup defaultValue={field.value?.answer}
		//   onValueChange={(e) => {
		//     console.log("input changed", {
		//       existingFieldValue: field.value,
		//       newAnswer: e,
		//     });
		//     field.onChange({
		//       ...field.value,
		//       answer: e,
		//     });
		//   }}
		// >
		//     {formBlock.choices.map((choice, choiceIndex) => (
		//         <div key={choice.id} className="flex items-center space-x-2">
		//             <RadioGroupItem value={choice.text} id={choice.id?.toString()} />
		//             <Label htmlFor={choice.id?.toString()}>{choice.text}</Label>
		//         </div>
		//     ))}
		// </RadioGroup>
	);
}
