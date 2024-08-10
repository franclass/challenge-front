import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Toolbar,
} from  "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import { Outlet, NavLink } from "react-router-dom";
import LogoColor from "@assets/logoColor.svg";
import classes from "./Main.module.scss";
import useSession from "@hooks/useSession";
import { ISessionContext } from "@interfaces/general.interfaces";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { IEvent } from "@interfaces/general.interfaces";

const Main: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [userBalance, setUserBalance] = useState(0);

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  const { logout } = useSession() as ISessionContext;



  useEffect(() => {
    setUserBalance(JSON.parse(localStorage.getItem("balance") || "0"));
  }, [userBalance]);


  document.addEventListener(
    "refresh_balance",
    function (event: IEvent) {
      setUserBalance(event.detail.balance);
    },
   
  );

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <Toolbar className={classes.appBar}>
          <NavLink to="/">
            <img src={LogoColor} alt="Logo" />
          </NavLink>
        </Toolbar>
        <div className={classes.drawerContainer}>
          <List className={classes.ulList}>
            
              <ListItemButton>
                <ListItemIcon>
                  <CurrencyExchangeIcon />
                </ListItemIcon>
                <ListItemText primary={`Balance: $${userBalance}`} />
              </ListItemButton>


              <ListItemButton
                selected={activeMenu === "home"}
                onClick={() => handleMenuClick("home")}
              >
                <NavLink to="/records" className={classes.links}>
                <ListItemIcon>
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary="Records" />
                </NavLink>
              </ListItemButton>
            
   

            <ListItemButton
              selected={activeMenu === "settings"}
              onClick={() => logout()}
              className={` ${classes.links} ${classes.logout}` }
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
