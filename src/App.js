import Input from "./components/Input";
import Boards from "./components/Boards";
import { TaskProvider } from "./hooks/useTasks";

function App() {
	return (
		<div className="overflow-x-scroll h-screen">
			<div className="layout pt-8">
				{/* <div className="max-w-[26rem] mx-auto"> */}
				<div className="max-w-full mx-auto text-center">
					<TaskProvider>
						<Input />
						<Boards />
					</TaskProvider>
				</div>
			</div>
		</div>
	);
}

export default App;
