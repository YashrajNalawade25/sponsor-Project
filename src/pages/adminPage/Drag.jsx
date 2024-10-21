import React, { useState, useCallback, useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Draggable Workflow Step Component
const DraggableStep = ({ step, index, moveStep, selectStep, selected, deleteStep, updateStepStatus }) => {
    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: 'STEP',
        collect(monitor) {
            return { handlerId: monitor.getHandlerId() };
        },
        hover(item) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;

            moveStep(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'STEP',
        item: { index },
        collect: (monitor) => ({ isDragging: monitor.isDragging() })
    });

    const opacity = isDragging ? 0.4 : 1;
    drag(drop(ref));

    // Determine dropdown background color based on status
    const statusBgColor = step.status === 'Pending' ? 'bg-yellow-200' : 'bg-green-200';

    return (
        <div
            ref={ref}
            className={`p-4 bg-white shadow rounded-md mb-2 cursor-move ${selected ? 'border-2 border-blue-500' : ''}`}
            style={{ opacity }}
            onClick={() => selectStep(index)}
        >
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-bold">{step.name}</p>
                    <p className="text-gray-500">Assignee: {step.assignee}</p>
                </div>

                {/* Delete Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent step selection on delete
                        deleteStep(index);
                    }}
                    className="text-red-500 hover:text-red-700 ml-2"
                >
                    Delete
                </button>
            </div>

            {/* Status Dropdown */}
            <select
                value={step.status}
                onChange={(e) => updateStepStatus(index, e.target.value)}
                className={`mt-2 p-2 rounded ${statusBgColor}`}
            >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
            </select>
        </div>
    );
};

// Workflow Component
const Drag = () => {
    const [steps, setSteps] = useState([]);
    const [selectedStepIndex, setSelectedStepIndex] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Move a step in the workflow
    const moveStep = useCallback((dragIndex, hoverIndex) => {
        const updatedSteps = [...steps];
        const [movedStep] = updatedSteps.splice(dragIndex, 1);
        updatedSteps.splice(hoverIndex, 0, movedStep);
        setSteps(updatedSteps);
    }, [steps]);

    // Select a step to display in the sidebar
    const selectStep = (index) => {
        setSelectedStepIndex(index);
    };



    // Update step details in the sidebar
    const updateSelectedStep = (field, value) => {
        const updatedSteps = [...steps];
        updatedSteps[selectedStepIndex] = {
            ...updatedSteps[selectedStepIndex],
            [field]: value,
        };
        setSteps(updatedSteps);
    };

    // Update step status
    const updateStepStatus = (index, status) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = {
            ...updatedSteps[index],
            status,
        };
        setSteps(updatedSteps);
    };

    // Add a new step to the workflow
    const addNewStep = () => {
        const newStep = { name: 'New Step', assignee: 'Assign Here', status: 'Pending', notes: '' };
        setSteps((prevSteps) => [...prevSteps, newStep]);
        setSelectedStepIndex(steps.length);  // Select the new step
    };

    // Delete a step from the workflow
    const deleteStep = (index) => {
        const updatedSteps = steps.filter((_, stepIndex) => stepIndex !== index);
        setSteps(updatedSteps);
        if (selectedStepIndex === index) setSelectedStepIndex(null);  // Deselect if deleted step is selected
    };

    // Filtered steps based on search query
    const filteredSteps = steps.filter(step =>
        step.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        step.assignee.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex h-screen">
                {/* Main Flow Area */}
                <div className="w-2/3 p-6">
                    <div className="flex mb-4">
                        {/* Search Bar */} {/* Add New Step Button */}
                        <button
                            onClick={addNewStep}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mr-2"
                        >
                            Add New Step
                        </button>


                        <input
                            type="text"
                            placeholder="Search steps..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border rounded-md p-2  w-1/2"
                        />

                    </div>
                    <div className="bg-gray-100 p-4 rounded-md mb-4 max-h-[600px] flex-grow overflow-y-auto">
                        {filteredSteps.map((step, index) => (
                            <DraggableStep
                                key={index}
                                step={step}
                                index={index}
                                moveStep={moveStep}
                                selectStep={selectStep}
                                selected={selectedStepIndex === index}
                                deleteStep={deleteStep}
                                updateStepStatus={updateStepStatus}
                            />
                        ))}
                    </div>
                </div>

                {/* Sidebar Step Configuration */}
                {selectedStepIndex !== null && (
                    <div className="w-1/3 p-6 bg-white shadow-md h-full">
                        <h2 className="text-lg font-bold mb-4">Step Configuration</h2>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Task</label>
                            <input
                                type="text"
                                value={steps[selectedStepIndex].name}
                                onChange={(e) => updateSelectedStep('name', e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Assignee:</label>
                            <input
                                type="text"
                                value={steps[selectedStepIndex].assignee}
                                onChange={(e) => updateSelectedStep('assignee', e.target.value)}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        {/* Notes Section */}
                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Notes:</label>
                            <textarea
                                value={steps[selectedStepIndex].notes}
                                onChange={(e) => updateSelectedStep('notes', e.target.value)}
                                className="w-full p-2 border rounded-md"
                                rows={4} // Adjust rows as needed
                            />
                        </div>
                    </div>
                )}

            </div>
        </DndProvider>
    );
};

export default Drag;
