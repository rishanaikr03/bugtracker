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
import EditProject from './editproject';
import { useNavigate } from 'react-router-dom';

const Project = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleEdit = () => {
        axios.put(`${BASE_URL}/manager/edit-project/${edit.id}`, edit)
            .then((res) => {
                console.log(res, 343434)
            })
            .catch((err) => {
                alert(err.response.data.error)
                console.log(err.response.data.error)
            })
    }
    let nav = useNavigate()

    const handleAssign = (id) => {
        nav(`/assign-project/${id}`);
    }

    const columns = [
        // { field: "_id", headerName: "ID" },
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
            field: "edit",
            headerName: "Edit",
            flex: 0.5,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <EditIcon color='success' onClick={() => handleOpen3(params.row)} />
            )
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.5,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <DeleteIcon color='error' onClick={() => handleOpen2(params.row.id)} />

            )
        },
        {
            field: "assign",
            headerName: "Assign",
            headerAlign: "center",
            flex: 0.5,
            align: "center",
            renderCell: (params) => (
                <AssignmentIndIcon color='secondary' onClick={() => handleAssign(params.row.id)} />

            )
        }
        // {
        //   field: "accessLevel",
        //   headerName: "Access Level",
        //   flex: 1,
        //   renderCell: ({ row: { access } }) => {
        //     return (
        //       <Box
        //         width="60%"
        //         m="0 auto"
        //         p="5px"
        //         display="flex"
        //         justifyContent="center"
        //         backgroundColor={
        //           access === "admin"
        //             ? colors.greenAccent[600]
        //             : access === "manager"
        //               ? colors.greenAccent[700]
        //               : colors.greenAccent[700]
        //         }
        //         borderRadius="4px"
        //       >
        //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
        //         {access === "manager" && <SecurityOutlinedIcon />}
        //         {access === "user" && <LockOpenOutlinedIcon />}
        //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
        //           {access}
        //         </Typography>
        //       </Box>
        //     );
        //   },
        // },
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [deleteId, setDeleteId] = React.useState("");

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = (id) => { return (setDeleteId(id), setOpen2(true)) }
    const handleClose2 = () => { return (setDeleteId(""), setOpen2(false)) }



    const [edit, setEdit] = React.useState({});

    const [open3, setOpen3] = React.useState(false);
    const handleOpen3 = (value) => { return (setEdit(value), setOpen3(true)) }
    const handleClose3 = () => { return (setEdit({}), setOpen3(false)) }

    const [project, setProject] = React.useState({})
    const handleChange = (e) => {

        setProject({ ...project, [e.target.name]: e.target.value })
    }
    const handleImage = (e) => {
        const selectedFile = e.target.files[0];
        console.log('Selected File:', selectedFile);
        setProject({ ...project, [e.target.name]: selectedFile })
    }

    console.log(deleteId, 1111)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', project.name);
        formData.append('client_name', project.client_name);
        formData.append('frontend', project.frontend);
        formData.append('backend', project.backend);
        formData.append('start_date', project.start_date);
        formData.append('project_image', project.project_image);
        formData.append('project_type', project.project_type);
        formData.append('description', project.description);

        axios.post(`${BASE_URL}/manager/add-project`, formData)
            .then((res) => {
                if (res.data.success) {
                    alert("Project added successfull");
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

    const [dis_project, setDis_Project] = React.useState([]);
    const [forFilter, setForFilter] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${BASE_URL}/manager/view-project`)
            .then((res) => {
                if (res.data.success) {
                    console.log(res, 999)
                    setDis_Project(res.data.data)
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
    }, [open, open2])
    console.log(dis_project, 33333)

    const transformedRows = dis_project?.map((row) => ({
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

    const handleDelete = (e) => {
        e.preventDefault()
        axios.delete(`${BASE_URL}/manager/delete-project/${deleteId}`)
            .then((res) => {
                if (res.data.success) {
                    alert("Deleted successfull!!")
                    console.log(res, 333)

                    handleClose2()
                }
                else {
                    console.log(res, 333)
                    handleClose2()
                }
            })
            .catch((err) => {
                alert(err.response.data.error)
                console.log(err)
            })
    }

    

    const handleMonth=(e)=>{
        let month = e.target.value
        console.log(month)
        let filtered = forFilter.filter((item)=>{
            let yearMonth = item.date.substring(0, 7)
            return yearMonth==month
        })
        setDis_Project(filtered)
    }



    return (
        <Box m="20px">
            <TextField id="outlined-basic" onChange={handleMonth} type='month' style={{ width: "200px" }} variant="outlined" />
          
            <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
                        Are You sure
                    </Typography>
                    <br />
                    <center>
                        <Button type='submit' variant="contained" onClick={handleDelete} color='error' style={{ marginRight: 20 }}>Yes</Button>
                        <Button type='submit' onClick={handleClose2} variant="contained" color='success'>No</Button>
                    </center>
                </Box>
            </Modal>



            <EditProject handleEdit={handleEdit} open3={open3} edit={edit} setEdit={setEdit} setOpen3={setOpen3} handleClose3={handleClose3} handleOpen3={handleOpen3} />


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <form encType='multipart/form-data' onSubmit={handleSubmit}>
                        <Typography style={{ fontSize: 20 }} id="modal-modal-description" sx={{ mb: 2 }}>
                            Enter Project Details
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField id="outlined-basic" onChange={handleChange} name="name" label="Name" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleChange} name="client_name" type='text' label="Client Name" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleChange} name="frontend" type='text' label="Frontend" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleChange} name="backend" type='text' label="Backend" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <Select
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Type"
                                onChange={handleChange}
                                name="project_type"
                                defaultValue="select"
                            >
                                <MenuItem value="select">Select Type</MenuItem>
                                <MenuItem value="ecommerce">E-commerce</MenuItem>
                                <MenuItem value="billing">Billing</MenuItem>
                                <MenuItem value="grocery">Grocery</MenuItem>
                                <MenuItem value="medical">Medical</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                            <br /><br />
                            <TextField id="outlined-basic" onChange={handleChange} name="start_date" type='date' label="Start Date" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleImage} name="project_image" type='file' label="Project Icon" style={{ width: "100%" }} variant="outlined" /><br /><br />
                            <TextField id="outlined-basic" onChange={handleChange} name="description" type='text' label="Project Description" style={{ width: "100%" }} variant="outlined" /><br /><br />


                            <Button type='submit' variant="contained" color='success'>Save</Button>
                        </Typography>
                    </form>
                </Box>
            </Modal>



            <Box
                onClick={handleOpen}
                width="150px"
                m="0 auto"
                p="5px"
                display="flex"
                justifyContent="center"
                backgroundColor="green"
                borderRadius="4px"
            >
                <AccountTreeIcon />
                <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>

                    Add Project
                </Typography>
            </Box>
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

export default Project;
