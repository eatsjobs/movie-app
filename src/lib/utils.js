export function denormalize($normalized, $min, $max) {
	const $denormalized = ($normalized * ($max - $min) + $min);
	return $denormalized;
}

export function normalize($value, $min, $max) {
	const $normalized = ($value - $min) / ($max - $min);
	return $normalized;
}
