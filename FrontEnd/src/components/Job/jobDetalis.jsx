/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigate = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/job/${id}`, {
          withCredentials: true,
        });
        console.log("Job response:", response.data); // Log the response for debugging
        setJob(response.data.job);
      } catch (error) {
        console.error("Error fetching job details:", error); // Log the error
        navigate("/notfound");
      }
    };

    fetchJobDetails();
  }, [id, navigate]);

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          {job ? (
            <>
              <p>
                Title: <span>{job.title}</span>
              </p>
              <p>
                Category: <span>{job.category}</span>
              </p>
              <p>
                Country: <span>{job.country}</span>
              </p>
              <p>
                City: <span>{job.city}</span>
              </p>
              <p>
                Location: <span>{job.location}</span>
              </p>
              <p>
                Description: <span>{job.description}</span>
              </p>
              <p>
                Job Posted On: <span>{job.jobPostedOn}</span>
              </p>
              <p>
                Salary:{" "}
                {job.fixedSalary ? (
                  <span>{job.fixedSalary}</span>
                ) : (
                  <span>
                    {job.salaryFrom} - {job.salaryTo}
                  </span>
                )}
              </p>
              {user && user.role === "Employer" ? (
                <></>
              ) : (
                <Link to={`/application/${job._id}`}>Apply Now</Link>
              )}
            </>
          ) : (
            <p>Loading job details...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
