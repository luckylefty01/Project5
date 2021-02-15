class App extends React.Component {
    state = {
        description: '',
        todos:[]
    }

    componentDidMount = () => {
        axios.get('/todo').then(
            (response) => {
                this.setState({
                    todos:response.data
                })
            }
        )
    }

    createTodo = (event) => {
        event.preventDefault();
        axios.post(
            '/todo',
            {
                description:this.state.newDescription,
            }
        ).then(
            (response) => {
                this.setState({
                    todos:response.data
                })
            }
        )
    }

    changeNewDescription= (event) => {
        this.setState({
            newDescription:event.target.value
        });
    }

    deleteTodo = (event) => {
        axios.delete('/todo/' + event.target.value).then(
            (response) => {
                this.setState({
                    todos:response.data
                })
            }
        )

    }

    updateTodo = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        axios.put(
            '/todo/' + id,
            {
                description:this.state.updateDescription,
            }
        ).then(
            (response) => {
                this.setState({
                    todos:response.data,
                    description:'',
                })
            }
        )
    }

    changeUpdateDescription = (event) => {
        this.setState(
            {
                updateDescription:event.target.value
            }
        )
    }

    render = () => {
        return <div>
            <h2>Create To-Do</h2>
            <form onSubmit={this.createTodo}>
                <input onKeyUp={this.changeNewDescription} type="text" placeholder="description" /><br/>
                <input type="submit" value="Add" />
            </form>
            <h2>Things To-Do</h2>
            <ul>
                {
                    this.state.todos.map(
                        (todo, index) => {
                            return <li key={index}>

                                {todo.description}

                                <button value={todo.id} onClick={this.deleteTodo}>DELETE</button>

                                <form id={todo.id} onSubmit={this.updateTodo}>
                                    <input onKeyUp={this.changeUpdateDescription} type="text" placeholder="description"/><br/>
                                    <input type="submit" value="Update To-Do"/>
                                </form>
                            </li>
                        }
                    )
                }
            </ul>
        </div>
    }
}

ReactDOM.render(
    <App></App>,
    document.querySelector('main')
)
