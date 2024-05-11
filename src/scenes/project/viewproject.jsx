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
import BugReportIcon from '@mui/icons-material/BugReport';
import EditProject from './editproject';
import { useNavigate } from 'react-router-dom';

const ViewProject = ({ role }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    let nav = useNavigate()

    const columns = [

        {
            field: "image",
            align: "center",
            headerAlign: "center",
            headerName: "Image",
            flex: 1,
            cellClassName: "name-column--cell",
            renderCell: (params) => (
                <img
                    src={`http://localhost:5005/api/image/${params.row.image}`} // Assuming `image` is a URL or path to the image
                    alt="Project Image"
                    style={{ width: 50, height: 50, borderRadius: '50%' }} // Adjust size and styling as needed
                />
            ),
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "client_name",
            headerName: "Client Name",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "frontend",
            headerName: "Frontend",
            flex: 1,
        },
        {
            field: "backend",
            headerName: "Backend",
            flex: 1,
        },
        {
            field: "start_date",
            headerName: "Start Date",
            flex: 1,
        },
        {
            field: "task",
            headerName: "Task",
            headerAlign: "center",
            flex: 0.5,
            align: "center",
            renderCell: (params) => {
                return (
                    role === "tester" ? (
                        <BugReportIcon color='error' onClick={() => handleOpen(params.row.id)} />
                    ) : (
                        <AssignmentIndIcon color='success' />
                    )
                );
            }
        }
    ];





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

    const [open, setOpen] = React.useState(false);
    const handleOpen = (id) => (setProject_Id(id), setOpen(true));
    const handleClose = () => setOpen(false);

    const [deleteId, setDeleteId] = React.useState("");



    const [project_Id, setProject_Id] = React.useState("");


    const [bug, setBug] = React.useState({})
    const handleChange = (e) => {

        setBug({ ...bug, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        const selectedFile = e.target.files[0];
        console.log('Selected File:', selectedFile);
        setBug({ ...bug, [e.target.name]: selectedFile })
    }

    console.log(deleteId, 1111)

    const handleSubmit = (e) => {
        let token = JSON.parse(localStorage.getItem('auth-token'))
        e.preventDefault();
        const formData = new FormData();
        formData.append('error_code', bug.error_code);
        formData.append('error_type', bug.error_type);
        formData.append('error_message', bug.error_message);
        formData.append('severity_level', bug.severity_level);
        formData.append('image', bug.image);
        formData.append('description', bug.description);
console.log(token)
        axios.post(`${BASE_URL}/bug/add-bug/${project_Id}`, formData, { headers: { 'auth-token': token } })
            .then((res) => {
                if (res.data.success) {
                    alert("Bug added successfull");
                    console.log(res)
                    handleClose()
                }
                else {
                    alert("Unsuccessfull!!!")
                    console.log(res)
                }
            })
            .catch((err) => {
                alert(err.response.data.error)
                console.log(err.response.data.error)
            })
    }

    const [dis_bug, setDis_Bug] = React.useState([]);
    const [forFilter, setForFilter] = React.useState([]);

    React.useEffect(() => {
        let token = JSON.parse(localStorage.getItem('auth-token'))
        axios.get(`${BASE_URL}/developer/view-project`, {
            headers: {
                "auth-token": token
            }
        })
            .then((res) => {
                if (res.data.success) {
                    console.log(res, 999)
                    setDis_Bug(res.data.data)
                    setForFilter(res.data.data)

                }
                else {
                    alert('Some thing went wrong!!!')
                }
            })
            .catch((err) => {
                alert(err.response.data.error)
                console.log(err)
            })
    }, [open])
    console.log(dis_bug, 33333)

    const transformedRows = dis_bug?.map((row) => ({
        id: row._id,
        name: row.name,
        image: row.image,
        client_name: row.client_name,
        start_date: row.start_date,
        project_type: row.project_type,
        frontend: row.frontend,
        backend: row.backend,
        description: row.description
    }));

    const handleMonth=(e)=>{
        let month = e.target.value
        console.log(month)
        let filtered = forFilter.filter((item)=>{
            let yearMonth = item.date.substring(0, 7)
            return yearMonth==month
        })
        setDis_Bug(filtered)
    }



    return (
        <Box m="20px">

<TextField id="outlined-basic" onChange={handleMonth} type='month' style={{ width: "200px" }} variant="outlined" />



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <Typography style={{ fontSize: 20 }} id="modal-modal-description" sx={{ mb: 2 }}>
                            Enter Bug Details
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField id="outlined-basic" onChange={handleChange} name="error_code" label="Error Code" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleChange} name="error_type" type='text' label="Error Type" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleChange} name="error_message" type='text' label="Error Message" style={{ width: "100%" }} variant="outlined" /><br /><br />

                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Severity Level"
                                onChange={handleChange}
                                name="severity_level"
                                defaultValue="select"
                            >
                                <MenuItem value="select">Select Level</MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>

                            </Select>
                            <br /><br />

                            <TextField id="outlined-basic" onChange={handleImage} name="image" type='file' label="Screen Shot or Image" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleChange} name="description" type='text' label="Error Description" style={{ width: "100%" }} variant="outlined" /><br /><br />


                            <Button type='submit' variant="contained" color='success'>Save</Button>
                        </Typography>
                    </form>
                </Box>
            </Modal>


            <Header title="PROJECT" subtitle="Managing the Project" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid rows={transformedRows} columns={columns} />
            </Box>
        </Box>
    );
};

export default ViewProject;
