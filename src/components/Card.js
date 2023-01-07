import Icon from "./Icon";
import * as React from "react";

const colors = {
	todo: "bg-undone-secondary",
	doing: "bg-doing-secondary",
	completed: "bg-done-secondary",
	inReview: "bg-inreview-secondary",
	issues: "bg-issues-secondary",


};

const Card = ({ title, status, ...dragHandleProps }) => {
	return (
		<div {...dragHandleProps}>
		<div className={`${colors[status]} text-left rounded-md px-2 py-3 flex justify-between items-center gap-2`}>
			<p className="break-all">{title}</p>
			
				<Icon />
		</div>
		</div>

	);
};

export default Card;
