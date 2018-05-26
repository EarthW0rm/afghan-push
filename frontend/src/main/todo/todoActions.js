import axios from 'axios'
import GlobalConfig from '../../config'
const serviceUrl = GlobalConfig.SERVICE_URL + '/todos'


export const changeDescription = (event) => ({
    type: 'DESCRIPTION_CHANGED'
    , payload: event.target.value
})

export const searchTodos = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description
        const search = description ? `&description=${description}` : '';
        const request = axios.get(`${serviceUrl}?orderBy=-createdAt${search}`)
            .then(resp => dispatch({
                type: 'TODO_SEARCHED'
                , payload: resp.data.data
            }))
    }   
}

export const addTodo = (description) => {
    return dispatch => {
        axios.post(serviceUrl , { description })
            .then(resp => dispatch( clear() ))
            .then(resp => dispatch( searchTodos() ))
            
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${serviceUrl}/${todo.id}` , { ...todo, done: true })
            //.then(resp => dispatch({type: 'TODO_MARKED_AS_DONE', payload: resp.data}))
            .then(resp => dispatch( searchTodos() ))
            
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${serviceUrl}/${todo.id}` , { ...todo, done: false })
            //.then(resp => dispatch({type: 'TODO_MARKED_AS_PENDING', payload: resp.data}))
            .then(resp => dispatch( searchTodos() ))
            
    }
}

export const deleteTodo = (todo) => {
    return dispatch => {
        axios.delete(`${serviceUrl}/${todo.id}`)
            //.then(resp => dispatch({type: 'TODO_DELETE', payload: resp.data}))
            .then(resp => dispatch( searchTodos() ))
            
    }
}

export const clear = () => {
    return [{ type: 'TODO_CLEAR' }, searchTodos() ]
}