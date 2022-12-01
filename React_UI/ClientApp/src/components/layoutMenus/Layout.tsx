import React, { Component } from "react";
import { Container } from "reactstrap";
import NoPermissionMessage from "../common/authorization/NoPermission";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <main>

        {/********* Container */}
        <div className="pageWrapper d-lg-flex">

          {/********Sidebar**********/}
          <aside className="sidebarArea shadow" id="sidebarArea" style={{ width: "230px" }}/>
          <Sidebar />

          {/********Content Area**********/}
          <div className="contentArea">
            <Header/>

            <NoPermissionMessage/>

            {/********Middle Content**********/}
            <Container className="p-4 wrapper" fluid >
              {/* @ts-ignore */}
              {this.props.children}


            </Container>

          </div>

        </div>
      </main>
    );
  }
}