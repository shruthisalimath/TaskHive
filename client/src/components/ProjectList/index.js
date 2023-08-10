import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box, Flex, Spacer } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
// import AddProject from "../AddProject/index";
import { Button, FormControl, FormLabel, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT, REMOVE_PROJECT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";


const ProjectList = ({ projects }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { loading: loading1, data: data1, error: error1 } = useQuery(QUERY_ME);
  if (error1) {
    console.error('Error fetching me:', error1);
  }

  let user = null;
  if (!loading1 && data1 && data1.me) {
    user = data1.me;
    console.log(user, "CheckUserData");
  }

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [formState, setformState] = useState({ name: "", description: "" })

  const [addProject, { loading, error, data }] = useMutation(ADD_PROJECT);
  const [deleteProject] = useMutation(REMOVE_PROJECT);

  const [formErrors, setFormErrors] = useState({});

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
    }
  };



  console.log(projects);
  if (projects.length <= 0) {
    return <h3>No Projects Yet</h3>;
  }
  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        <Flex minWidth='max-content' alignItems='center' gap='64%'>

          <h2>Your Projects</h2>

          <>
            <Button onClick={onOpen} colorScheme='yellow'>Add Project</Button>

            <Modal
              initialFocusRef={initialRef}
              finalFocusRef={finalRef}
              isOpen={isOpen}
              onClose={onClose}
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
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>

        </Flex>
        <Spacer />

        <div className="flex-row">
          
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
                <h4 className="">Project Description: {project.description}</h4>
                </div>
                <div className="right-col">
                <Box>
                  <Flex justify="flex-end" align="flex-end">
                    {/* <Link to="/editProject"> */}
                    <IconButton
                      isRound={true}
                      variant='solid'
                      colorScheme='teal'
                      aria-label='Done'
                      fontSize='20px'
                      marginRight={3}
                      icon={<EditIcon />}
                    //onClick={handleProjectDelete}
                    />
                    {/* </Link> */}
                    {/* <Link to="/deleteProject"> */}



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
                
                {/* <h4 className="">Project Description: {project.tasks}</h4> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};
export default ProjectList;
