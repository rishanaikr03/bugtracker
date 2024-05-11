import * as React from 'react';
import { Box, Button, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Modal from '@mui/material/Modal';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import TextField from '@mui/material/TextField';
import axios from 'axios';
import { BASE_URL } from '../global';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { alignBox } from '@nivo/core';
import moment from 'moment'; // Import moment.js

export default function EditProject({handleEdit,edit,setEdit,open3,setOpen3,handleClose3,handleOpen3}) {

    const defaultFormattedDate = edit?.start_date?.slice(0, 10);
    
    const [project, setProject] = React.useState({})

    const handleChange = (e) => {
        setEdit({ ...edit, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        const selectedFile = e.target.files[0];
        console.log('Selected File:', selectedFile);
        setEdit({ ...edit, [e.target.name]: selectedFile })
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        overflowY: 'auto',
        maxHeight: '90vh'
    };

  return (
         <Modal
                open={open3}
                onClose={handleClose3}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <form encType='multipart/form-data' onSubmit={handleEdit}>
                        <Typography style={{ fontSize: 20 }} id="modal-modal-description" sx={{ mb: 2 }}>
                            {/* {editMode ? "Edit Project Details" : "Enter Project Details"} */}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField value={edit.name} id="outlined-basic" onChange={handleChange} name="name" label="Name" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField value={edit.client_name} id="outlined-basic" onChange={handleChange} name="client_name" type='text' label="Client Name" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField value={edit.frontend} id="outlined-basic" onChange={handleChange} name="frontend" type='text' label="Frontend" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField value={edit.backend} id="outlined-basic" onChange={handleChange} name="backend" type='text' label="Backend" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Type"
                                onChange={handleChange}
                                name="project_type"
                                defaultValue={edit?.project_type}
                                
                            >
                                <MenuItem value="select">Select Type</MenuItem>
                                <MenuItem value="ecommerce">E-commerce</MenuItem>
                                <MenuItem value="billing">Billing</MenuItem>
                                <MenuItem value="grocery">Grocery</MenuItem>
                                <MenuItem value="medical">Medical</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                            <br /><br />
                            <TextField id="outlined-basic" value={defaultFormattedDate} onChange={handleChange} name="start_date" type='date' label="Start Date" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleImage} required name="project_image" type='file' label="Project Icon" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" value={edit.description} onChange={handleChange} name="description" type='text' label="Project Description" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            
                          
                            <Button type='submit' variant="contained" color='success'>Save</Button>
                        </Typography>
                    </form>
                </Box>
            </Modal>
  )
}
