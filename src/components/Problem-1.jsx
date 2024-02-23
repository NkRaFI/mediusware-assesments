import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const Problem1 = () => {
    /**-React Hooks-**/
    const [taskList, setTaskList] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [show, setShow] = useState('all');

    /**-Hook Form-**/
    const { register, handleSubmit, reset, formState: { errors, isDirty } } = useForm()

    /**-Util-**/
    const generateID = () => {
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 10000);
        return `${timestamp}${randomNumber}`;
    }

    const customSort = useCallback((a, b) => {
        if (a.status === 'active' && b.status !== 'active') return -1;
        if (a.status === 'completed' && b.status === 'active') return 1;
        if (a.status === 'completed' && b.status !== 'completed') return -1;
        return 0
    }, [])

    /**-Event Handlers-**/
    const handleTaskFormSubmit = (data) => {
        data.id = generateID()
        setTaskList(prev => [...prev, data])
        reset()
    }

    /**-useEffects-**/
    useEffect(() => {
        if (show === "all") {
            const sortedData = taskList.sort(customSort)
            console.log(sortedData)
            setFilteredTasks(sortedData)
        }
        if (show === "active") {
            const sortedData = taskList.filter(task => task.status === "active")
            setFilteredTasks(sortedData)
        }
        if (show === "completed") {
            const sortedData = taskList.filter(task => task.status === "completed")
            setFilteredTasks(sortedData)
        }
    }, [show, taskList])

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form
                        className="row gy-2 gy-lg-0 gx-3 mb-4"
                        onSubmit={handleSubmit(handleTaskFormSubmit)}
                    >
                        <div className="col-auto d-flex align-items-start">
                            <div>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    {...register("name", { required: "name" })}
                                />
                                {errors?.name && <label className='text-danger'>{errors?.name?.message} is required!</label>}
                            </div>
                        </div>
                        <div className="col-auto d-flex align-items-start">
                            <div>
                                <select
                                    type="text"
                                    className="form-select"
                                    placeholder="Status"
                                    {...register("status", { required: "status" })}
                                >
                                    <option value="">Select status</option>
                                    <option value="active">Active</option>
                                    <option value="completed">Completed</option>
                                    <option value="pending">Pending</option>
                                    <option value="archive">Archive</option>
                                </select>
                                {errors?.status && <label className='text-danger'>{errors?.status?.message} is required!</label>}
                            </div>
                        </div>
                        <div className="col-auto d-flex align-items-start d-flex align-items-start">
                            <div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={!isDirty}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'all' && 'active'}`} type="button" onClick={() => setShow("all")}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'active' && 'active'}`} type="button" onClick={() => setShow('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show === 'completed' && 'active'}`} type="button" onClick={() => setShow('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredTasks?.map(task => (
                                    <tr key={task.id}>
                                        <td>{task.name}</td>
                                        <td className='text-capitalize'>{task.status}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;