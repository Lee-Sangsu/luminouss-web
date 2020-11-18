const useConfirm = (message= "", onConfirm, onCancel) => {
	if (onCancel && typeof onCancel !== "function"){
		return;
	}
	if(onConfirm && typeof onConfirm !== "function"){
		return;
	}
	const confirmAction = () => {
		if (window.confirm(message)){
			onConfirm();
		} else {
			onCancel();
		}
	}
	return confirmAction;
};

export default useConfirm;