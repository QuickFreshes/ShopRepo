// import React from "react";
// import { Layout } from "antd";
// import SideMenu from "./Components/SideMenu";
// import AppRoutes from "./Components/AppRoutes";
import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
// import awsconfig from "./aws-exports";
// import "@aws-amplify/ui-react/styles.css";
// const { Sider, Content, Footer } = Layout;
import { Header } from "./Authentication/Header";
import { Footer } from "./Authentication/footerAuth";
import { SignInHeader } from "./Authentication/SignInHeader";
import { SignInFooter } from "./Authentication/SignInFooter";
import "./styles.css";

// Amplify.configure(awsconfig);
import awsExports from "./aws-exports";
import Main from "./Components/Main";
import ShopContextProvider from "./contexts/ShopContexts";
Amplify.configure(awsExports);

function App() {
  return (
    <ShopContextProvider>
      <Main />
    </ShopContextProvider>
  );
}

export default withAuthenticator(App, {
  components: {
    Header,
    SignIn: {
      Header: SignInHeader,
      Footer: SignInFooter,
    },
    Footer,
  },
});
// export default withAuthenticator(App);
// export default App;
