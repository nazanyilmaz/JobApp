import React from "react";
import Delbutton from "./Delbutton";
import { MdLocationOn } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa";
import { BsFillCalendarDateFill } from "react-icons/bs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteJob } from "../redux/slice/jobSlice";
import { toast } from "react-toastify";

const Card = ({ job }) => {
  const dispatch = useDispatch();
  const colors = {
    Interview: "green",
    Continue: "orange",
    Canceled: "red",
  };

  const handleDelete = () => {
    if (confirm("Are you sure ?")) {
      axios
        .delete(`http://localhost:3001/jobs/${job.id}`)
        .then(() => {
          dispatch(deleteJob(job.id));
          toast.error("Deleted Successfully", {
            autoClose: 1500,
          });
        })
        .catch((err) => {
          toast.error("Sorry!!! an error...", {
            autoClose: 1500,
          });
        });
    }
  };

  return (
    <div className="card">
      <div className="head">
        <div className="left">
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>
          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </div>
        <div className="right">
          <Delbutton handleDelete={handleDelete} />
        </div>
      </div>
      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>
        <div className="field">
          <FaSuitcase />
          <p>{job.type}</p>
        </div>
        <div className="field">
          <BsFillCalendarDateFill />
          <p>{job.date}</p>
        </div>
        <div className="status">
          <p
            style={{
              background: colors[job.status],
            }}
          >
            {job.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
