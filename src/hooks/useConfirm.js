const useConfirm = (msg= "", onConfirm, onCancel) => {
	if (callback && typeof callback !== "function"){
		return;
	}
	if(onConfirm && typeof onConfirm !== "function"){
		return;
	}
	const confirmAction = () => {
		if (confirm(msg)){
			onConfirm();
		} else {
			onCancel();
		}
	}
	return confirmAction;
};

export default useConfirm;