import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Shop } from "../models";
const ShopContexts = createContext({});

const ShopContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [shop, setShop] = useState();
  const sub = user?.attributes?.sub;

  useEffect(() => {
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setUser);
  }, []);

  useEffect(() => {
    if (!sub) {
      return;
    }
    DataStore.query(Shop, (s) => s.AdminSub.eq(sub)).then((shops) =>
      setShop(shops[0])
    );
  }, [sub]);

  return (
    <ShopContexts.Provider value={{ shop, sub, setShop }}>
      {children}
    </ShopContexts.Provider>
  );
};

export default ShopContextProvider;

export const useShopContext = () => useContext(ShopContexts);
