import React, { useState } from 'react';
//import { Button, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';

import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT, REMOVE_PROJECT } from "../../utils/mutations";

const ModifyProject = () => {
    // const [updateProject] = useMutation(UPDATE_PROJECT);
    // const [removeProject] = useMutation(REMOVE_PROJECT);

    const [handleUpdateProject, sethandleUpdateProject] = useState({
        projectId: projectId,
        name: "",
        description: "",
    });
    const [updateProject, { loading, error, data }] = useMutation(UPDATE_PROJECT);
    const [formErrors, setFormErrors] = useState({});
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        sethandleUpdateProject((prevUpdateProject) => ({ ...prevUpdateProject, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateUpdatedProjectForm(updateProject);

        if (Object.keys(errors).length === 0) {
            try {
                const { data } = await updateProject({
                    variables: { ...projectData },
                });
                console.log('Project updated:', data.updateProject);
            } catch (error) {
                console.error('error adding  Project:', error);
            }
        } else {
            // Throw an alert with each error message
            Object.values(errors).forEach((error) => alert(error));
            return;
        }
    };
    const validateUpdatedProjectForm = (data) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Project name is required';
        }

        if (!data.description.trim()) {
            errors.description = 'project Description is required';
        }
        return errors;
    };
}
