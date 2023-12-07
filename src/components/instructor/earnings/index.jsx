import React, {  useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../footer";

import { InstructorHeader } from "../header";
import InstructorSidebar from "../sidebar";
import { API } from "../../../config";

export default function InstructorEarnings() {
  const [dashboard, setDashboard] = useState({
    note: 0,
    revenue: "",
    total_etudiant: 0,
  });
  const [courses, setCourse] = useState(null);
  const getBestCourse = async () => {
    const response = await API.get("/best-courses");
    console.log(response);
    setCourse(response.data.data.slice(0, 3));
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getBestCourse();
  }, []);
  const getData = async () => {
    const response = await API.get("/stats-prof");
    console.log(response);
    setDashboard(response.data);
    // response.then((res) => {
    //   setDashboard(res.data);
    // });
  };
  
  return (
    <div className="main-wrapper">
      <InstructorHeader activeMenu={"Earnings"} />
      <div className="page-content">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            <InstructorSidebar activeMenu={"Earnings"} />
            {/* Sidebar */}

            {/* Instruction Dashboard */}
            <div className="col-xl-9 col-lg-8 col-md-12">
            <div className="row">
                <div className="col-md-4 d-flex">
                  <div className="card instructor-card w-100">
                    <div className="card-body">
                      <div className="instructor-inner">
                        <h6>REVENUE</h6>
                        <h4 className="instructor-text-success">
                          {dashboard?.revenue}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card instructor-card w-100">
                    <div className="card-body">
                      <div className="instructor-inner">
                        <h6>ETUDIANTS</h6>
                        <h4 className="instructor-text-info">
                          {dashboard?.total_etudiant}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 d-flex">
                  <div className="card instructor-card w-100">
                    <div className="card-body">
                      <div className="instructor-inner">
                        <h6>NOTE</h6>
                        <h4 className="instructor-text-warning">
                          {dashboard?.note}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {courses &&courses.length >= 1 && (
                <>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="settings-widget">
                        <div className="settings-inner-blk p-0">
                          <div className="sell-course-head comman-space">
                            <h3>Cours les plus vendus</h3>
                          </div>
                          <div className="comman-space pb-0">
                            <div className="settings-tickets-blk course-instruct-blk table-responsive">
                              {/* Referred Users */}
                              <table className="table table-nowrap mb-0">
                                <thead>
                                  <tr>
                                    <th>COURS</th>
                                    <th>ÉLÈVES</th>
                                    <th>TOTAL VENTE</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {courses &&
                                    courses?.map((course) => (
                                      <>
                                        <tr>
                                          <td>
                                            <div className="sell-table-group d-flex align-items-center">
                                              <div className="sell-group-img">
                                                <Link to={`/course-details/${course.slug}`}>
                                                  <img
                                                    src={course.image}
                                                    className="img-fluid "
                                                    alt=""
                                                    width={"271px"}
                                                    height={"203px"}
                                                  />
                                                </Link>
                                              </div>
                                              <div className="sell-tabel-info">
                                                <p>
                                                  <Link to="/course-details">
                                                    {course.title}
                                                  </Link>
                                                </p>
                                              </div>
                                            </div>
                                          </td>
                                          <td>{course.total_etudiant}</td>
                                          <td>{course.total_vente}</td>
                                        </tr>
                                      </>
                                    ))}
                                </tbody>
                              </table>
                              {/* Referred Users */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
      

      
            </div>
            {/* Instruction Dashboard */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
