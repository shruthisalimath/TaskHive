import React, { useState } from "react";
import { Button, FormControl, FormLabel, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
//import { useForm } from 'react-hook-form';

//import apollo graphql
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../utils/mutations";

const AddProject = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();// for modals

    const [projectData, setprojectData] = useState({
        name: "",
        description: "",
    });

    const [addProject, { loading, error, data }] = useMutation(ADD_PROJECT);
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setprojectData((prevProjectData) => ({ ...prevProjectData, [name]: value }));
    };
    const handleSubmit = async (e) => {
       // e.preventDefault();
        const errors = validateProjectForm(projectData);

        if (Object.keys(errors).length === 0) {
            try {
                const { data } = await addProject({
                    variables: { ...projectData },
                });
                console.log('Project created:', data.addProject);
            } catch (error) {
                console.error('error adding Project:', error);
            }
        } else {
            // Throw an alert with each error message
            Object.values(errors).forEach((error) => alert(error));
            return;
        }
    };
    const validateProjectForm = (data) => {
        const errors = {};

        if (!data.name.trim()) {
            errors.name = 'Project name is required';
        }

        if (!data.description.trim()) {
            errors.description = 'project Description is required';
        }
        return errors;
    };

    return (
        <>
            <Button onClick={onOpen}>Add Project</Button>
            {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Your Project</ModalHeader>
                    <ModalCloseButton />

                    <form onSubmit={handleSubmit(onsubmit)}>
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Project name</FormLabel>
                                <Input name="projectName" value={projectData.name} onChange={handleChange} placeholder='Enter Project name' />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Project Description</FormLabel>
                                <Textarea name="projectDescription" value={projectData.description} onChange={handleChange} placeholder="Enter Your Project Description" />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button type="submit" colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddProject;