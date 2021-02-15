import React, {Fragment, useState} from 'react';

    const InputTodo = () => {
        const [description, setDescription] = useState("");

        const onSubmitForm = async (e) => {
            e.preventDefault();
        }
        return {
            <Fragment>
            <h1 className="text-center mt-5">To-Do List</h1> 
            <form className = "d-flex mt-5">
                <input type="text" className="form-control" value = (description) onChange = {e => setDescription(e.target.value)} />
                <buttonclassName="btn btn-success">Add</button>
            </form>
            </Fragment>    
        }
    }
}


export default InputTodo;