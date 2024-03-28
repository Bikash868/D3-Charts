export const toPercentage = (val) => {
	let num = val * 100;
	num = num.toFixed(1); //.replace(/\.0$/, "");
	return num;
};

export function numberFormat(val) {
	let formattedNumber = parseFloat(val).toFixed(1);
	formattedNumber = formattedNumber
		.replace(/\.0$/, '')
		.toString()
		.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
	return `${formattedNumber}`;
}

export function currencyFormat(val) {
	return `$ ${numberFormat(val)}`;
}

export const percentageFormat = (val) => {
	return `${toPercentage(val)} % `;
};

export const percentageNoDecimalFormat = (val) => {
	let num = val * 100;
	num = num.toFixed(2).replace(/\.00$/, '');
	return `${num}%`;
};

export const yTicksFormat = (val) => {
	return `${toPercentage(val)}% `;
};

export const dateFormat = (format, date) => {
	return dayjs(date).format(format);
};