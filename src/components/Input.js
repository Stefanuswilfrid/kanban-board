import * as React from "react";
import useTasks from "../hooks/useTasks";

const Input = () => {
	const [newTask, setNewTask] = React.useState("");
	const { addTask } = useTasks();

	const onSubmit = (e) => {
		e.preventDefault();
		if (newTask.length === 0) return;
		addTask(newTask, "todo");
		setNewTask("");
	};

	return (
		<form onSubmit={onSubmit} className="mb-4">
			<input
				type="text"
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
				placeholder="Add New Task"
				className="w-full md:w-1/3  rounded-md px-4 py-2"
			/>
		</form>
	);
};

export default Input;
