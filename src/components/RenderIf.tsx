const RenderIf = ({ children, condition }: { children: any, condition: boolean }) => {
	if (!condition) {
		return <></>;
	}

	return children;
}

export default RenderIf;
