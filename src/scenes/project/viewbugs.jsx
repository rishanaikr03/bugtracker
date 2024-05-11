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

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ViewBug = ({ role }) => {
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
            renderCell: (params) => (

                <AssignmentIndIcon onClick={() => handleView(params.row.id)} color='success' />

            )
        }
    ];

    const [dis_bug, setDis_Bug] = React.useState([]);

    const [display, setDisplay] = React.useState([]);


    const handleView = async (id) => {
        await axios.get(`${BASE_URL}/bug/view-bug/${id}`)
            .then((res) => {
                if (res.data.success) {
                    console.log(res, 123123)
                    setDisplay(res.data.data)
                }
                else {
                    alert('Some thing went wrong!!!')
                }
            })
            .catch((err) => {
                alert(err.response.data.error)
                console.log(err)
            })
        handleOpen()
    }




    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1000,
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



    const [project_Id, setProject_Id] = React.useState("");
    const [forFilter, setForFilter] = React.useState([]);


    const [bug, setBug] = React.useState({})



    console.log(deleteId, 1111)




    React.useEffect(() => {
        let token = JSON.parse(localStorage.getItem('auth-token'))
        axios.get(`${BASE_URL}/developer/view-project`, {
            headers: {
                "auth-token": token
            }
        })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data, 999)
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
        description: row.description,
        status: row.status
    }));

    const handleSolved = (id) => {
        let token = JSON.parse(localStorage.getItem('auth-token'));
        axios.put(`${BASE_URL}/bug/solve-bug/${id}`, null, { headers: { "auth-token": token } })
            .then((res) => {
                if (res.data.success) {
                    console.log(res.data, 999)
                    handleClose()
                }
                else {
                    alert('Some thing went wrong!!!')
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

                    <Typography style={{ fontSize: 20 }} id="modal-modal-description" sx={{ mb: 2 }}>
                        Bug Details
                    </Typography>



                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell align="center">Error Code</TableCell>
                                    <TableCell align="center">Type </TableCell>
                                    <TableCell align="center">Message</TableCell>
                                    <TableCell align="center">Status </TableCell>
                                    <TableCell align="center">Description </TableCell>
                                    <TableCell align="center">Action </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {display.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            <img src={`http://localhost:5005/api/image/${row.image}`} alt="no image" height={100} width={100} />
                                        </TableCell>
                                        <TableCell align="center">{row.error_code}</TableCell>
                                        <TableCell align="center">{row.error_type}</TableCell>
                                        <TableCell align="center">{row.error_message}</TableCell>
                                        <TableCell align="center" style={{ color: row.status == "completed" ? "green" : "red" }}>{row.status}</TableCell>
                                        <TableCell align="center"><textarea cols="30" rows="4" readOnly>{row.description}</textarea></TableCell>
                                        {role == "developer" && row.status == "pending" && <TableCell align="center"><Button onClick={(e) => handleSolved(row._id)} variant="contained" color="secondary">Solved</Button></TableCell>}
                                        {row.status == "completed" && <TableCell align="center"><Button variant="contained" color="success">{row.sd_id.name}</Button></TableCell>}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>










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

export default ViewBug;
