import { useEffect } from "react";
import Router from "next/router";

export default function Customer() {
  useEffect(() => {
    Router.push("/404");
  }, []);
}
