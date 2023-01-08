import { useSelector } from "react-redux";
import { App } from "../../data-types/app-data-types";
import { State } from "../../state";

const useAppState = (): App => {
	return useSelector((state: State) => state.app);
};

export default useAppState;