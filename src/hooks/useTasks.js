import * as React from "react";
import { v4 as uuid } from "uuid";

const initialTasks = {
	todo: [
		{
			id: uuid(),
			title: "Play Pokemon Go",
		},
		{
			id: uuid(),
			title: "Cook Pasta",
		},
	],
	doing: [
		{
			id: uuid(),
			title: "Study For Finals",
		},
	],
	completed: [
		{
			id: uuid(),
			title: "Pay Rent",
		},
	],
	inReview: [
		{
			id: uuid(),
			title: "To Do List Project",
		},
	],
	issues: [
		{
			id: uuid(),
			title: "Girlfriend is Angry",
		},
	],
};

const TaskContext = React.createContext({});

const reducer = (state, { type, payload }) => {
	switch (type) {
		case "ADD_TASK":
			return {
				...state,
				[payload.statusType]: [
					...state[payload.statusType],
					{
						id: uuid(),
						title: payload.newTask,
					},
				],
			};
		case "UPDATE_TASK":
			if (payload.destination === null) {
				return state;
			} else {
				const statusFrom = payload.source.droppableId;
				const indexFrom = payload.source.index;
				const statusTo = payload.destination.droppableId;
				const indexTo = payload.destination.index;
				console.log(payload.source);

				const task = state[statusFrom][indexFrom];

				const from = Array.from(state[statusFrom]);
				from.splice(indexFrom, 1);

				const to = statusFrom === statusTo ? Array.from(from) : Array.from(state[statusTo]);
				to.splice(indexTo, 0, task);

				return {
					...state,
					[statusFrom]: from,
					[statusTo]: to,
				};
			}
		case "DELETE_TASK":
			const statusFrom = payload.droppableId;
			const indexFrom = payload.index;

			const from = Array.from(state[statusFrom]);
			from.splice(indexFrom, 1);

			return { ...state, [statusFrom]: from };
		default:
			throw new Error(`Unknown action type ${type}`);
	}
};

export const TaskProvider = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		reducer,
		initialTasks,
		() => JSON.parse(localStorage.getItem("tasks")) || initialTasks
	);

	React.useEffect(() => {
		localStorage.setItem("tasks", JSON.stringify(state));
	}, [state]);

	const [isDragging, setIsDragging] = React.useState(false);

	const addTask = (newTask, statusType) => {
		dispatch({ type: "ADD_TASK", payload: { newTask, statusType } });
	};

	const updateTask = (destination, source) => {
		dispatch({ type: "UPDATE_TASK", payload: { source, destination } });
	};

	const deleteTask = (source) => {
		dispatch({ type: "DELETE_TASK", payload: source });
	};

	return (
		<TaskContext.Provider value={{ state, addTask, updateTask, deleteTask, isDragging, setIsDragging }}>
			{children}
		</TaskContext.Provider>
	);
};

const useTasks = () => React.useContext(TaskContext);

export default useTasks;
