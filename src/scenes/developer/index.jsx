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
import LockResetIcon from '@mui/icons-material/LockReset';


const Developer = ({ role }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
      headerAlign: "left",
      align: "left",
    },
    {
      field: "email",
      headerName: "Email Addressr",
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
    // {
    //   field: "edit",
    //   headerName: "Edit",
    //   flex: 0.5,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => (
    //     <EditIcon color='success' onClick={() => handleOpen2(params.row)} />
    //   )
    // },
    role == "admin" && {
      field: "edit",
      headerName: "Edit",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <LockResetIcon color='warning' onClick={() => handleOpen3(params.row.id)} />
      )
    },

    role == "admin" && {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        // Conditionally render DeleteIcon based on user role
        if (role == "admin") {
          return (
            <DeleteIcon color="error" onClick={() => handleOpen2(params.row.id)} />
          );
        } else {
          // Render a placeholder or null if the role does not match
          return null;
        }
      },
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

  const handleMonth = (e) => {
    let month = e.target.value
    console.log(month)
    let filtered = forFilter.filter((item) => {
      let yearMonth = item.date.substring(0, 7)
      return yearMonth == month
    })
    setDis_Developer(filtered)
  }

  const handleDelete = (e) => {
    e.preventDefault()
    axios.delete(`${BASE_URL}/manager/delete-developer/${deleteId}`)
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [deleteId, setDeleteId] = React.useState("");

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = (id) => { return (setDeleteId(id), setOpen2(true)) }
  const handleClose2 = () => { return (setDeleteId(""), setOpen2(false)) }

  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = (id) => { return (setResetId(id), setOpen3(true)) }
  const handleClose3 = () => { return (setResetId(""), setOpen3(false)) }

  const [resetId, setResetId] = React.useState("")


  const [developer, setDeveloper] = React.useState({ role: 'developer' })
  const handleChange = (e) => {
    setDeveloper({ ...developer, [e.target.name]: e.target.value })
  }
  console.log(developer, 1111)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(developer, 22222)
    axios.post(`${BASE_URL}/developer/register`, developer)
      .then((res) => {
        if (res.data.success) {
          alert("Developer added successfull")
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

  const [dis_developer, setDis_Developer] = React.useState([]);
  const [forFilter, setForFilter] = React.useState([]);

  React.useEffect(() => {
    axios.get(`${BASE_URL}/manager/view-developer`)
      .then((res) => {
        if (res.data.success) {
          console.log(res, 999)
          setDis_Developer(res.data.data)
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
  console.log(dis_developer, 33333)

  const [resetPassword, setResetPassword] = React.useState("")

  const transformedRows = dis_developer?.map((row) => ({
    id: row._id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    role: row.role,
    address: row.address,
  }));

  const handleReset = (e) => {
    e.preventDefault();
    axios.put(`${BASE_URL}/manager/reset-password/${resetId}`, { resetPassword })
      .then((res) => {
        if (res.data.success) {
          alert("Reset password successfull")
          console.log(res)
          handleClose3()
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

  return (
    <Box m="20px">
      <TextField id="outlined-basic" onChange={handleMonth} type='month' style={{ width: "200px" }} variant="outlined" />


      <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography align='center' id="modal-modal-title" variant="h6" component="h2">
            Reset Password
          </Typography>
          <br />
          <form onSubmit={handleReset}>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField id="outlined-basic" onChange={(e) => setResetPassword(e.target.value)} name="new_password" label="Reset Password" style={{ width: "100%" }} variant="outlined" /><br /><br />

              <center>

                <Button type='submit' variant="contained" color='success'>Reset</Button>
              </center>
            </Typography>
          </form>

        </Box>
      </Modal >

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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{ fontSize: 20 }} id="modal-modal-description" sx={{ mb: 2 }}>
            Enter New Developer Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField id="outlined-basic" onChange={handleChange} name="name" label="Name" style={{ width: "100%" }} variant="outlined" /><br /><br />
            <TextField id="outlined-basic" onChange={handleChange} name="phone" type='number' label="Phone" style={{ width: "100%" }} variant="outlined" /><br /><br />

            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="male"
              name="gender"
              onChange={handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup><br />
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={developer?.role}
              label="Role"
              onChange={handleChange}
              name="role"
            >
              <MenuItem value="developer">Developer</MenuItem>
              <MenuItem value="tester">Tester</MenuItem>
            </Select> <br /><br />
            <TextField id="outlined-basic" onChange={handleChange} name="address" label="Address" style={{ width: "100%" }} variant="outlined" /><br /><br />
            <TextField id="outlined-basic" type='email' onChange={handleChange} name="email" label="Email" style={{ width: "100%" }} variant="outlined" /><br /><br />
            <TextField id="outlined-basic" type='password' onChange={handleChange} name="password" label="Password" style={{ width: "100%" }} variant="outlined" /><br /><br />
            <Button variant="contained" color='success' onClick={handleSubmit}>Save</Button>
          </Typography>
        </Box>
      </Modal>



      {
        role == "admin" && <Box
          onClick={handleOpen}
          width="150px"
          m="0 auto"
          p="5px"
          display="flex"
          justifyContent="center"
          backgroundColor="green"
          borderRadius="4px"
        >
          <AccountCircleIcon />
          <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>

            Add Developer
          </Typography>
        </Box>
      }
      <Header title="DEVELOPER" subtitle="Managing the Team Members" />
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
    </Box >
  );
};

export default Developer;
