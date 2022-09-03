import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "@/page/common/header";
export default function AppWraper(Component) {

	
	return <BrowserRouter>
		<Header />
		<Component />
	</BrowserRouter>
}