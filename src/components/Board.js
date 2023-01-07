import useTasks from "../hooks/useTasks";
import Card from "./Card";
import { Droppable, Draggable } from "react-beautiful-dnd";

const status = {
	todo: {
		color: "bg-undone",
		text: "To Do",
	},
	doing: {
		color: "bg-doing",
		text: "Doing",
	},
	completed: {
		color: "bg-done",
		text: "Completed",
	},
	inReview: {
		color: "bg-inreview",
		text: "In Review",
	},
	issues: {
		color: "bg-issues",
		text: "Issues",
	},
};

const Board = ({ statusType }) => {
	const { state } = useTasks();
	// console.log(state)

	const tasks = state[statusType];

	return (
		<div className="w-full mb-4 bg-board rounded-md p-4 mt-4">
			<div className="flex items-center justify-between mb-2">
				<h1>{status[statusType].text}</h1>
				<div className={`${status[statusType].color} w-3 h-3 rounded-full`}></div>
			</div>
			<Droppable droppableId={statusType}>
				{(provided) => (
					<div {...provided.droppableProps} ref={provided.innerRef} className="min-h-[1rem]">
						{tasks.map((task, index) => {
							return (
								<Draggable key={task.id} draggableId={task.id} index={index}>
									{(provided, snapshot) => {
										return (
											<div
												{...provided.draggableProps}
												ref={provided.innerRef}
												className={`mb-2  ${
													snapshot.isDropAnimating ? "opacity-0" : snapshot.draggingOver === "delete" && "opacity-80"
												}`}
											>
												<Card title={task.title} status={statusType} {...provided.dragHandleProps} />
											</div>
										);
									}}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};

export default Board;
