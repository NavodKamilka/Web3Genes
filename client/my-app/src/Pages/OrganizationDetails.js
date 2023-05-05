import React, { useState , useEffect } from 'react'
import AppBar from '../Components/AppBar';
import { Box, Button, Card, CardContent, Grid, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function OrganizationDetails() {

    const location = useLocation();
    const params = new URLSearchParams(location.search);

    let orgName1 = params.get('name');
    let orgRegNo1 = params.get('regNo');
    let addLine11 = params.get('addLine1');
    let addLine21 = params.get('addLine2');
    let city1 = params.get('city');
    let org_contact_nums = params.get('org_contact_nums');

    const [orgName, setOrgName] = useState(orgName1);
    const [orgRegNo, setOrgRegNo] = useState(orgRegNo1);
    const [addLine1, setAddLine1] = useState(addLine11);
    const [addLine2, setAddLine2] = useState(addLine21);
    const [city, setCity] = useState(city1);

    console.log("dfdfd",org_contact_nums[0])

    const handleOrgNameChange = (event) => {
        setOrgName(event.target.value);
    };
    
    const handleOrgRegNoChange = (event) => {
        setOrgRegNo(event.target.value);
    };
    
    const handleAddLine1Change = (event) => {
        setAddLine1(event.target.value);
    };
    
      const handleAddLine2Change = (event) => {
        setAddLine2(event.target.value);
      };
    
      const handleCityChange = (event) => {
        setCity(event.target.value);
      };

    const [showInputs, setShowInputs] = useState(false);

    const handleClick = () => {
        setShowInputs(true);
    };


   // const [data, setData] = useState("");

    // useEffect(() => {
    //     async function fetchData() {
    //         const accessToken = localStorage.getItem('accessToken');
    //         try {
    //             const response = await axios.get("http://localhost:4000/api/organization/" + params._id + "", { headers: { 'x-authtoken': accessToken } });
    //             console.log(response.data)
    //             setData(response.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // },  [params._id]);
    

   

  return (
    <div>
        <AppBar /> <br></br><br></br>
        <Box sx={{ marginLeft: '120px' }}>
            <Typography variant="h5">Organization Details</Typography>
        </Box><br></br>
       
        <Card sx={{ maxWidth: 1300 , margin: '0 auto 20px'}}>
            
            <CardContent>
                <TextField label="Organization Name" variant="outlined" fullWidth margin="normal" value={orgName} onChange={handleOrgNameChange} />
                <TextField label="Reg.No." variant="outlined" fullWidth margin="normal" value={orgRegNo} onChange={handleOrgRegNoChange}/>
                <TextField label="Address Line 1" variant="outlined" fullWidth margin="normal" value={addLine1} onChange={handleAddLine1Change}/>
                <TextField label="Address Line 2" variant="outlined" fullWidth margin="normal" value={addLine2} onChange={handleAddLine2Change}/>
                <TextField label="City" variant="outlined" fullWidth margin="normal" value={city} onChange={handleCityChange}/>

                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField label="Type" variant="outlined" fullWidth margin="normal" />
                        </Grid>
                        <Grid item xs={9}>
                            <TextField label="Number" variant="outlined" fullWidth margin="normal" />
                        </Grid>
                    </Grid> 

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <TextField label="Type" variant="outlined" fullWidth margin="normal" />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField label="Number" variant="outlined" fullWidth margin="normal" />
                    </Grid>
                </Grid> 

                {showInputs && (
                    <div>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <TextField label="Type" variant="outlined" fullWidth margin="normal" />
                        </Grid>
                        <Grid item xs={9}>
                        <TextField label="Number" variant="outlined" fullWidth margin="normal" />
                            </Grid>
                        </Grid> <br></br>
                    </div>
                )}

                <Grid container spacing={2}>
                    <Grid item xs={11}></Grid>
                    <Grid item xs={1} sx={{textAlign: 'right'}}>
                        <IconButton aria-label="delete" size="large" onClick={handleClick}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid> <br></br>

                <Grid container spacing={2}>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={1}>
                        <Button variant="outlined" >Cancel</Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="contained" >Update</Button>
                    </Grid>
                </Grid>

            </CardContent>
        </Card>     

    </div>
  )
}
