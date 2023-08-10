import React from 'react';
import { EmailIcon } from '@chakra-ui/icons'
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const Footer = () => {
    const { loading, error, data } = useQuery(QUERY_ME);
    if(loading) 
    return <p>Loading.....</p>

    if (error)
    return <p>Error: ${error.message}</p>

    return (
        <footer className="footer">
            {/* <p>ID:{data.me._id}</p> */}
            <p>{data.me.firstName} {data.me.lastName}</p>
            <p><EmailIcon />:{data.me.email}</p>
        </footer>
    );
};

export default Footer;