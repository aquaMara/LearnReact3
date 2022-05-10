import React from "react";
import { Box } from "@mui/system";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Avatar } from "@mui/material";
import "../styles/TopNavigation.css";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Account from "./appuser/Account";
function TopNavigation() {

  const { auth } = useAuth();
  const [currentUser, setCurrentUser] = useState(
    {
      name: "",
      email: "",
      username: ""
  }
  );
  const axiosPrivate = useAxiosPrivate();

  console.log("auth in account", auth.role);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const getCurrentUserAccount = async () => {
    try {
      // const response = await axiosPrivate.get(`/users/?${username}` );
      console.log("auth.username", auth.username);
      const response = await axiosPrivate.get("/users/username/" + auth.username);
      console.log("response in account", response);
      console.log("current user >>", response.data);
      setCurrentUser(response.data);

    }  catch (err) {
        if (!err?.response) {
            console.log("No error response");
        } else if(err.response?.status === 403) {
            console.log("Invalid username or password");
        } else if(err.response?.status === 500) {
            console.log("Unauthorized");
        } else {
            console.log("Login failed")
        }
    }
  }

  function handleChange(event) {
    const {name, type, value, checked} = event.target;
    console.log("name", name);
    console.log("type", type);
    console.log("value", value);
    setCurrentUser(prevAlien => ({
        ...prevAlien,
        [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {name, type, value, checked} = event.target;
    console.log("name", name)
    console.log("value.length", event.target.value.length);
    if (name === "name") {
      console.log(currentUser.name.length);
      if (value.length < 4) {
        console.log("DFFGJHGT")
      }
    }
    console.log("currentUser", currentUser);
    try {
      const response = await axiosPrivate.put("/users/username/" + auth.username,
            currentUser, 
            {
                headers: { "Content-Type": "application/json"}
            });
    console.log(response);
    setCurrentUser(response.data);
    handleClose();
    } catch(err) {

    }
}

  useEffect(() => {
    getCurrentUserAccount();
  }, {})

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar  className="top-navigation">
            <Typography className="top-navigation--text" variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Learning Spring and React
            </Typography>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Avatar className="top-navigation--avatar">me</Avatar>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              className="top-navigation--menu"
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              {currentUser &&
              <form>
                <MenuItem className="top-navigation--username">{currentUser.username}</MenuItem>
                <MenuItem>
                  <input 
                  type="text"
                  placeholder="name"
                  onChange={handleChange}
                  name="name"
                  value={currentUser.name}
                  />
                </MenuItem>
                <MenuItem>
                  <input 
                      type="email"
                      placeholder="email"
                      onChange={handleChange}
                      name="email"
                      value={currentUser.email}
                  />
                </MenuItem>
                {auth.role === "ROLE_TEACHER" && 
                (<MenuItem className="top-navigation--username">
                  <Link to={`/home/account/${auth.username}`} element={<Account />} className="link">To My Articles</Link>
                </MenuItem>)}
                <Button onClick={handleSubmit}>Save and Close</Button>
                <Button onClick={handleClose}>Close without saving</Button>
              </form>
              }
            </Menu>
            
          </Toolbar>
        </AppBar>
    </Box>
  )
}

export default TopNavigation