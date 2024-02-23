import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function deduplicateArray<T extends { id: unknown }>(array: T[]): T[] {
	const ids = new Set();
	return array.filter((item) => {
		if (!ids.has(item.id)) {
			ids.add(item.id);
			return true;
		}
		return false;
	});
}
