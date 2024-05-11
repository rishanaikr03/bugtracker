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

import TextField from '@mui/material/TextField';
import axios from 'axios';
import { BASE_URL } from '../global';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AlignHorizontalCenter } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

const AssignProject = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    let { id } = useParams();
    console.log(id, 767676)
    const columns = [

        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "phone",
            headerName: "Phone",
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "email",
            headerName: "Email Address",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1,
        },
       

        {
            field: "assign",
            headerName: "Assign",
            flex: 0.5,
            headerAlign: "center",
            align: "center",
            renderCell: (params) => (
                <AssignmentIndIcon color='success' onClick={() => handleAssign(params.row.id)} />

            )
        }
    ];
    const handleAssign = (developer_id) => {
        axios.post(`${BASE_URL}/manager/assign-project`, { project_id: id, developer_id })
            .then((res) => {
                console.log(res, 343434)
                if (res.data.success) {
                    alert("Assign Successfull")
                }
                else {
                    alert("Already Assigned")

                }
            })
            .catch((err) => {
                alert(err.response.data.error)
                console.log(err.response.data.error)
            })
    }



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [deleteId, setDeleteId] = React.useState("");

    const [open2, setOpen2] = React.useState(false);
    const handleOpen2 = (id) => { return (setDeleteId(id), setOpen2(true)) }
    const handleClose2 = () => { return (setDeleteId(""), setOpen2(false)) }


    const [developer, setDeveloper] = React.useState({ role: 'developer' })

    const [assigned, setAssigned] = React.useState([]);


    const [dis_developer, setDis_Developer] = React.useState([]);

    React.useEffect(() => {
        axios.get(`${BASE_URL}/manager/view-developer`)
            .then((res) => {
                if (res.data.success) {
                    console.log(res, 999)
                    setDis_Developer(res.data.data)
                }
                else {
                    alert('Some thing went wrong!!!')
                }
            })
            .catch((err) => {
                alert(err.response.data.error)
                console.log(err)
            })

        axios.get(`${BASE_URL}/manager/view-assign/${id}`)
            .then((res) => {
                if (res.data.success) {
                    console.log(res, 89898989)
                    setAssigned(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })

    }, [open, open2])
    console.log(dis_developer, 33333)

    const transformedRows = dis_developer?.map((row) => ({
        id: row._id,
        name: row.name,
        phone: row.phone,
        email: row.email,
        role: row.role,
        address: row.address,
    }));

    return (
        <Box m="20px">




            <Header title="Select DEVELOPER" subtitle="Managing the Team Members" />
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

            <h2>Assigned</h2>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Name</TableCell>
                            <TableCell align="center">Phone</TableCell>
                            <TableCell align="center">Email </TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Address </TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assigned?.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >


                                <TableCell align="center">{row.d_id.name}</TableCell>
                                <TableCell align="center">{row.d_id.phone}</TableCell>
                                <TableCell align="center">{row.d_id.email}</TableCell>
                                <TableCell align="center">{row.d_id.role}</TableCell>
                                <TableCell align="center">{row.d_id.address}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </Box>
    );
};

export default AssignProject;
