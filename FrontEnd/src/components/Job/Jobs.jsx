/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized, setIsAuthorized } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        });
        console.log("Jobs response:", response.data); // Log the response
        setJobs(response.data.data.jobs); // Ensure correct data path
        console.log("Jobs state:", response.data.data.jobs); // Log the jobs state
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", {
          withCredentials: true,
        });
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, [setIsAuthorized]);

  useEffect(() => {
    if (!loading && !isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, loading, navigateTo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="banner">
          {jobs && jobs.length > 0 ? (
            jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.country}</p>
                <Link to={`/job/${element._id}`}>Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
