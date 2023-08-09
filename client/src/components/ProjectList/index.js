import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Box, Flex, Spacer } from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import AddProject from "../AddProject/index";
import { Button, FormControl, FormLabel, Input, Textarea, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";

const ProjectList = ({ projects }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { loading1, data1 } = useQuery(QUERY_ME);
  
  
  if (!loading1){
    const user = data1;
    console.log(user, "CheckUserData");
  }

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [formState, setformState] = useState({ name: "", description: ""})
//   const [projectData, setprojectData] = useState({
//     name: "",
//     description: "",
// });

const [addProject, { loading, error, data }] = useMutation(ADD_PROJECT);
const [formErrors, setFormErrors] = useState({});

const handleChange = (e) => {
    const { name, value } = e.target;
    setformState({
      ...formState, 
      [name]:value,
    });
    console.log(formState, "here");
   // setprojectData((prevProjectData) => ({ ...prevProjectData, [name]: value }));
};
const handleSubmit = async (e) => {
   // e.preventDefault();
    //const errors = validateProjectForm(projectData);

    //if (Object.keys(errors).length === 0) {
        try {
            const { data } = await addProject({
                variables: { name: formState.name, description: formState.description,  },
            });
            console.log('Project created:', data.addProject);
        } catch (error) {
            console.error('error adding Project:', error);
        }
    //} else {
        // Throw an alert with each error message
        //Object.values(errors).forEach((error) => alert(error));
       // return;
    //}
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


  console.log(projects);
  if (projects.length <= 0) {
    return <h3>No Projects Yet</h3>;
  }

  return (

    <div>
      <>
      <Button onClick={onOpen}>Add Project</Button>
      {/* <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button> */}

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
              <Input name="projectName"  onChange={handleChange} ref={initialRef} placeholder='Enter Project name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Project Description</FormLabel>
              {/* <Input placeholder='Last name' /> */}
              <Textarea name="projectDescription"  onChange={handleChange} placeholder="Enter Your Project Description" /> 
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
      <div className="flex-row justify-space-between my-4">
      <Flex minWidth='max-content' alignItems='center' gap='75%'>
      
        <h2>Your Projects</h2>
      
      {/* <AddProject as ={ Link } to="/addProject" /> */}
      
        {/* <Link className='link new-project' to="/addProject" gap='2'> Add Project</Link>
         */}
      </Flex>
        <Spacer />
        <div className="flex-row">
          {projects && projects.map((project) => (

            <div key={project._id} className="">
              <div className="card">
                <Link
                  className="dark-link"
                  to={`/projects/${project._id}`}
                >
                  {project.name}
                  </Link>
                  <Box>
                    <Flex justify="flex-end" align="flex-end">
                    <Link to="/editProject"> 
                    <IconButton
                      isRound={true}
                      variant='solid'
                      colorScheme='teal'
                      aria-label='Done'
                      fontSize='20px'
                      marginRight={3}
                      icon={<EditIcon />}
                    />
                    </Link>
                    <Link to="/deleteProject">
                    <IconButton
                      isRound={true}
                      variant='solid'
                      colorScheme='teal'
                      aria-label='Done'
                      fontSize='20px'
                      icon={<DeleteIcon />}
                    />
                    </Link>
                  </Flex>
                </Box>
              
              <h4 className="">Project Description: {project.description}</h4>
              <h4 className="">Project startDate: {project.startDate}</h4>
              <h4 className="">Project endDate: {project.endDate}</h4>
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
