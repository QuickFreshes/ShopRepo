import React from "react";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import { useShopContext } from "../contexts/ShopContexts";
const SideMenu = () => {
  const navigate = useNavigate();
  const { shop } = useShopContext();

  const onClick = async (menuItem) => {
    if (menuItem.key === "signOut") {
      await Auth.signOut();
      window.location.reload();
    } else {
      navigate(menuItem.key);
    }
  };

  const mainMenuItems = [
    {
      key: "/",
      label: "Orders",
    },
    {
      key: "menu",
      label: "Menu",
    },
    {
      key: "order-history",
      label: "Order History",
    },
  ];

  const menuItems = [
    ...(shop ? mainMenuItems : []),
    {
      key: "settings",
      label: "Settings",
    },
    {
      key: "signOut",
      label: "Sign Out",
      danger: "true",
    },
  ];
  // const onMeunItemClicked = ;
  return (
    <>
      {shop && <h2>{shop.name}</h2>}
      <Menu items={menuItems} onClick={onClick} />;
    </>
  );
};

// };

export default SideMenu;
