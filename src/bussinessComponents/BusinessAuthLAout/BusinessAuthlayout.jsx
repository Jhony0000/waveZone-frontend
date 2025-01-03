import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function BusinessAuthLayout({ children, authentication = true }) {
  const [loder, setLoder] = useState(true);
  const businessStatus = useSelector((state) => state.auth.businessStatus);
  const naviget = useNavigate();

  useEffect(() => {
    if (authentication && businessStatus !== authentication) {
      naviget("/business/login");
    } else if (!authentication && businessStatus !== authentication) {
      naviget("/business");
    }
    setLoder(false);
  }, [naviget, businessStatus, authentication]);
  return loder ? <h1>Loding...</h1> : <>{children}</>;
}

export default BusinessAuthLayout;
