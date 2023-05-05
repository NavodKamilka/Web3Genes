import React, { useState , useEffect } from 'react'
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import AppBar from '../Components/AppBar';
import axios from 'axios';
import {NavLink} from "react-router-dom";


export default function OrganizationList() {

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await axios.get('http://localhost:4000/api/organization/', { headers: { 'x-authtoken': accessToken } });
            console.log(response.data)
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchData();
  }, []);

  return (
    <div>
        <AppBar /> <br></br><br></br>
        <Box sx={{ marginLeft: '120px' }}>
            <Typography variant="h5">Organization List</Typography>
        </Box><br></br>
        <TableContainer component={Paper} sx={{ maxWidth: 1300 , margin: '0 auto 20px'}}>
                        <Table aria-label="collapsible table">
                          <TableHead sx={{backgroundColor: 'orange'}}>
                            <TableRow>
                              <TableCell sx={{ textAlign: 'center' }}>Organization Name</TableCell>
                              <TableCell sx={{ textAlign: 'center' }}>Reg.No.</TableCell>
                              <TableCell sx={{ textAlign: 'center' }}>Address</TableCell>
                              <TableCell sx={{ textAlign: 'center' }}>View</TableCell>
                            </TableRow>
                          </TableHead>
                          
                            <TableBody>

                              {data.map((row ) => (
  
                                <TableRow key={row._id}>

                                  <TableCell sx={{ textAlign: 'center' }}>{row.org_name}</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>{row.org_reg_no}</TableCell>
                                  <TableCell sx={{ textAlign: 'center' }}>{row.org_address.add_line1},{row.org_address.add_line2},{row.org_address.add_no},{row.org_address.city}.</TableCell>
                                  {/* <TableCell sx={{ textAlign: 'center' }}><Button variant="contained"><NavLink style={{ textDecoration: 'none' , color: 'white' }} to={`/organizationDetails/${row.org_name}/${row.org_reg_no}/${row.org_address.add_line1}/${row.org_address.add_line2}/${row.org_address.city}/`}>View</NavLink></Button></TableCell> */}
                                  <TableCell sx={{ textAlign: 'center' }}><Button variant="contained"><NavLink style={{ textDecoration: 'none' , color: 'white' }} to={{pathname: `/organizationDetails/${row._id}/` , search: `?name=${encodeURIComponent(row.org_name)}&regNo=${encodeURIComponent(row.org_reg_no)}&addLine1=${encodeURIComponent(row.org_address.add_line1)}&addLine2=${encodeURIComponent(row.org_address.add_line2)}&city=${encodeURIComponent(row.org_address.city)}&org_contact_nums=${encodeURIComponent(row.org_address.org_contact_nums)}`,}} >View</NavLink></Button></TableCell>
                                  
                                </TableRow>
                              ))}
                            </TableBody>
                          
                        </Table>
        </TableContainer>
    </div>
  )
}
