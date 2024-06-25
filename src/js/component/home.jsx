import React, {useEffect, useState} from "react";

//create your first component
const Home = () => {
	const[inputValue, setInputValue] = useState("")
	const [todoList, setTodoList] = useState([])
	console.log(todoList)
function initialFetch(){
	fetch('https://playground.4geeks.com/todo/users/jacobbcabot')
	.then(response => {
		console.log(response)
		if(!response.ok){
			fetch('https://playground.4geeks.com/todo/users/jacobbcabot',{
				method: "POST",
      			body: JSON.stringify(todoList),
      			headers: {
        			"Content-Type": "application/json"
							}
		})
				.then(response => {
					console.log(response, "response from post request")
					return response.json()
				})
	}
		return response.json()
	})
	.then(data => {
		console.log(data)
		setTodoList(data.todos)
	})
}
const deleteTask = (item, index) => {
	setTodoList(
				todoList.filter(
					(t,currentIndex) =>
						index != currentIndex
				)
			)
			console.log(item.id)
	fetch ('https://playground.4geeks.com/todo/todos/' + item.id, {				
		method:"DELETE",
		//body: JSON.stringify(item.label),
		headers: {
			"Content-Type": "application/json"
				}

			})
			

		}
const createTodo = () => {
	fetch('https://playground.4geeks.com/todo/todos/jacobbcabot',{
		method: "POST",
		body: JSON.stringify({
			"label":inputValue,
			"is_done": false
		  }),
		headers: {"Content-Type":"application/json"}


	})
	setTodoList([...todoList, {"label":inputValue,
			"is_done": false}]);
}
	useEffect( ()=> {
		initialFetch()
	},[])
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
								//setInputValue({"label":inputValue,
								//				"is_done": false})
								
								createTodo()
								setInputValue("");
							}
						}}
					placeholder="What's on your list today Buddy Boy?"></input>
				</div>
					<div className="listItem">
						{todoList.map((item, index) => (
							<p key={index}>
								{item.label}{" "}
								<i className="fa-solid fa-trash-can"
								onClick={() => deleteTask(item, index)
								}></i>
							</p>
						))
					}</div>
			<div id="totalTasks">{todoList.length} tasks</div>
		</div>
	);
};

export default Home;
