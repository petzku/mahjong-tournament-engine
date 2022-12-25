import { KeyboardEvent } from "react";
import { PointInputType } from "../../../data-types/tournament-data-types";

const onKeyDown = (params: {
	e: KeyboardEvent<HTMLInputElement>,
	unflippable?: boolean,
	short: boolean,
	value: PointInputType
}): PointInputType => {
	switch (params.e.key)
	{
		case "+":
			if (params.unflippable) break;
			return {
				positive: true,
				value: params.value.value
			};

		case "-":
			if (params.unflippable) break;
			return {
				positive: false,
				value: params.value.value
			};
			
		case "Backspace":
			if (params.short)
			{
				return {
					positive: params.value.positive,
					value: Math.floor(params.value.value/1000)*100
				};
			}

			return {
				positive: params.value.positive,
				value: Math.floor(params.value.value/10)
			};
			
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			if (params.short)
			{
				return {
					positive: params.value.positive,
					value: params.value.value*10+(+params.e.key*100)
				};
			}

			return {
				positive: params.value.positive,
				value: params.value.value*10+(+params.e.key)
			};
	};

	return params.value;
};

export default onKeyDown;