import { useEffect } from "react";
import Router from "next/router";

export default function Sector() {
  useEffect(() => {
    Router.push("/404");
  }, []);
}
