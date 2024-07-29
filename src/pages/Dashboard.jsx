import React, { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import Table from "../components/Table";
import Pagination from "../components/Pagination";

const AdminMember = ({baseURL}) => {

    let [member, setMember] = useState('');
    let [theads, setTheads] = useState(['Sl.No.','Full name' ,'DOB' , 'Profession','Address']);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setrecordsPerPage] = useState(3);
    const handlePagination = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
  function fetchAllUsers() {
    let token = sessionStorage.getItem("auth_token");
    let admin_id = sessionStorage.getItem("user_id");
    axios({
      method: "get",
      url: `${import.meta.env.VITE_API_BASE_URL}/users-list`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(function (res) {
      setMember(res.data.data)
    }).catch((err)=>{
      console.error(err);
    })
  }
  useEffect(() => {
    fetchAllUsers();
  }, []);
  useEffect(() => {
    console.log(member);
  }, [member]);
  return (
    <div className="app-content content ">
      <div className="content-overlay" />
      <div className="header-navbar-shadow" />
      <div className="content-wrapper container-xxl p-0">
        <div className="content-header row">
          <div className="content-header-left col-md-9 col-12 mb-2">
            <div className="row breadcrumbs-top">
              <div className="col-12">
                <h2 className="content-header-title float-start mb-0">
                  All Users
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="content-body">
          <section id="ajax-datatable">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header border-bottom">
                  
                  </div>
                   <Table member={member} theads={theads} currentPage={currentPage} recordsPerPage={recordsPerPage}/>             
                </div>
                {member.length > recordsPerPage ?  
                <Pagination recordsPerPage={recordsPerPage} length={member.length} handlePagination={handlePagination} currentPage={currentPage}/> : ''}
              </div>
           
            </div>
         
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminMember;
