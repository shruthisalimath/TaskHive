import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box, Flex, Spacer } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import { Button, FormControl, FormLabel, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT, REMOVE_PROJECT, UPDATE_PROJECT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";


const ProjectList = ({ projects }) => {
  const { isOpen: isOpenAddModal, onOpen: onOpenAddModal, onClose: onCloseAddModal } = useDisclosure();
  const { isOpen: isOpenUpdateModal, onOpen: onOpenUpdateModal, onClose: onCloseUpdateModal } = useDisclosure();

  const { loading: loading1, data: data1, error: error1 } = useQuery(QUERY_ME);
  if (error1) {
    console.error('Error fetching me:', error1);
  }

  let user = null;
  if (!loading1 && data1 && data1.me) {
    user = data1.me;
    console.log(user, "CheckUserData");
  }

  let project = null;
  if (!loading1 && data1 && data1.me) {
    project = data1.me;
    console.log(project, "CheckUserData");
  }

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [formState, setformState] = useState({ name: "", description: "" })

  const [addProject, { loading, error, data }] = useMutation(ADD_PROJECT);
  const [deleteProject] = useMutation(REMOVE_PROJECT);
  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [formErrors, setFormErrors] = useState({});
  const [updateFormState, setupdateFormState] = useState({});
  const [isprojectId, setprojectId] = useState();

  function handleprojectId(id) {
    setprojectId(id);
    onOpenUpdateModal();
  }
  //functon to handle add project
  const handleChange = (e) => {
    const { name, value } = e.target;
    setformState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
    console.log(formState, "formstate"); // Log the formState here
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("onsubmit")

    const errors = validateProjectForm(formState);
    console.log(typeof (user._id), "user ID ----")

    try {
      //console.log("we are trying")
      const { data } = await addProject({
        variables: {
          projectName: formState.projectName,
          projectDescription: formState.projectDescription,
          userId: user._id,
        },
      });
      console.log('Project created:', data.addProject);

    } catch (error) {
      console.error('Error adding Project:', error);
    }
    window.location.reload();
  };
  const validateProjectForm = (data) => {
    const errors = {};
    if (!data.name) {
      errors.name = 'Project name is required';
    }
    if (!data.description) {
      errors.description = 'project Description is required';
    }
    return errors;
  };

  //function to handle Delete project
  const handleProjectDelete = async (project) => {
    try {
      await deleteProject({
        variables: {
          projectId: project._id,
        },
      });
      console.log('Project Deleted:', project.deleteProjectProject);
    } catch (error) {
      console.error('Error Deleting Project:', error);
    } window.location.reload();
  };

  //function to handle update project
  const handleUpdateProject = (e) => {
    const { name, value } = e.target;
    setupdateFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
    console.log(updateFormState, "updateFormState");
    onOpenUpdateModal();
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log("onsubmit update");

    console.log(e.target);
    const errors = validateProjectForm(updateFormState);
    console.log("project ID ----")

    try {

      const { data } = await updateProject({
        variables: {
          projectId: isprojectId,
          projectName: updateFormState.projectName,
          projectDescription: updateFormState.projectDescription,
          startDate: updateFormState.startDate,
          endDate: updateFormState.endDate,
        },
      });
      console.log('Project updated:', data.updateProject);
      onCloseUpdateModal();
    } catch (error) {
      console.error("Error updating project", error);
    }
  
     window.location.reload();
  };



  const renderUpdateModal = () => {
    const projectToUpdate = projects.find((project) => project._id === isprojectId);

    return (
      <Modal isOpen={isOpenUpdateModal} onClose={onCloseUpdateModal} initialFocusRef={initialRef} finalFocusRef={finalRef}>

        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update your Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Project name</FormLabel>
              <Input value={updateFormState.projectName || projectToUpdate?.name || ''} name="projectName" onChange={handleUpdateProject} ref={initialRef} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project Description</FormLabel>
              {/* <Input placeholder='Last name' /> */}
              <Textarea value={updateFormState.projectDescription || projectToUpdate?.description || ''} name="projectDescription" onChange={handleUpdateProject} ref={initialRef}  />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleUpdateSubmit} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onCloseUpdateModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  console.log(projects);

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        <Flex minWidth='max-content' alignItems='center' gap='64%'>

          <h2>Your Projects</h2>

          <>
            <Button mx='-7' mb='-1.5' mt='3' onClick={onOpenAddModal} colorScheme='yellow'>New Project</Button>

            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpenAddModal}
              onClose={onCloseAddModal}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add your Project</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Project name</FormLabel>
                    <Input name="projectName" onChange={handleChange} ref={initialRef} placeholder='Enter Project name' />
                  </FormControl>
                  <FormControl mt={4}>
                    <FormLabel>Project Description</FormLabel>
                    {/* <Input placeholder='Last name' /> */}
                    <Textarea name="projectDescription" onChange={handleChange} placeholder="Enter Your Project Description" />
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={handleSubmit} colorScheme='blue' mr={3}>
                    Save
                  </Button>
                  <Button onClick={onCloseAddModal}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>

        </Flex>
        <Spacer />

        <div className="projects-list-div">
          {projects && projects.map((project) => (
            <div key={project._id} className="">
              <div className="card">
                <div className="left-col">
                  <Link
                    className="dark-link"
                    to={`/projects/${project._id}`}
                  >
                    {project.name}
                  </Link>
                  <h4 className="">Description: {project.description}</h4>
                  
                </div>
                <div className="right-col">
                  <Box>
                    <Flex justify="flex-end" align="flex-end">
                      {/* Update Project Button */}
                      <IconButton
                        isRound={true}
                        variant='solid'
                        colorScheme='teal'
                        aria-label='Done'
                        fontSize='20px'
                        marginRight={3}
                        icon={<EditIcon />}

                        onClick={() => handleprojectId(project._id)}
                      />
                      {renderUpdateModal()}

                      {/* Delete Project Button */}
                      <IconButton
                        isRound={true}
                        variant='solid'
                        colorScheme='red'
                        aria-label='Done'
                        fontSize='20px'
                        icon={<DeleteIcon />}
                        onClick={() => handleProjectDelete(project)}
                      />
                      {/* </Link> */}
                    </Flex>
                  </Box>
                </div>
                {/* <h4 className="">Project startDate: {project.startDate}</h4>
                <h4 className="">Project endDate: {project.endDate}</h4> */}
                {/* <h4 className="">Project Description: {project.tasks}</h4> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* {renderUpdateModal()} */}
    </div >
  );
};

export default ProjectList;
