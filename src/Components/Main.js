import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import SideMenu from "../Components/SideMenu";
import AppRoutes from "../Components/AppRoutes";
const { Sider, Content, Footer } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{
          height: "100vh",
          backgroundColor: "white",
          position: "fixed",
          zIndex: 1,
          top: 0,
          left: screenWidth >= 786 ? 0 : collapsed ? -80 : 0,
        }}
      >
        <img
          src="/img/icon-shop.svg"
          alt="headericon"
          className="header-logo"
          width="100%"
          style={{ backgroundColor: "black" }}
        />
        <SideMenu />
      </Sider>
      <Layout
        style={{
          marginLeft: screenWidth >= 786 ? 200 : collapsed ? 20 : 0,
        }}
        // style={{ width: "200px" }}
      >
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            display: screenWidth >= 786 ? "none" : "block",
            position: "absolute",
            zIndex: 1,
            top: 8,
            left: collapsed ? 120 : 91,
          }}
        >
          {collapsed ? "Open Menu" : "Close Menu"}
        </Button>
        <Content style={{}}>
          {/* <Orders /> */}
          <AppRoutes />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: " #FFD700",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Quick Freshes Shop Dashboard ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
