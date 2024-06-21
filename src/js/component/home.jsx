import React, {useState} from "react";

//create your first component
const Home = () => {
	const[inputValue, setInputValue] = useState("")
	const [todoList, setTodoList] = useState([])
	console.log(todoList)
	return (
		<div className="container">
			<h1>Todo List</h1>
				<div className="inputContainer">
					<input 
						className="dataInput"
						type="text" 
						onChange={(e) => setInputValue(e.target.value)}
						value={inputValue}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setTodoList(todoList.concat(inputValue));
								setInputValue("");
							}
						}}
					placeholder="What's on your list today Buddy Boy?"></input>
				</div>
					<div className="listItem">
						{todoList.map((item, index) => (
							<p>
								{item}{" "}
								<i className="fa-solid fa-trash-can"
								onClick={() =>
									setTodoList(
										todoList.filter(
											(t,currentIndex) =>
												index != currentIndex
										)
									)
								}></i>
							</p>
						))
					}</div>
			<div id="totalTasks">{todoList.length} tasks</div>
		</div>
	);
};

export default Home;
