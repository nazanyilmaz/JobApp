import { useDispatch } from "react-redux";
import { sortOptions, statusOptions, typeOptions } from "../constants";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slice/jobSlice";
import { useState } from "react";

const Filter = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  return (
    <section className="filter-sec">
      <h2>Filter Form</h2>
      <form>
        <div>
          <label>Company</label>
          <input
            onChange={(e) => {
              dispatch(
                filterBySearch({ name: "company", text: e.target.value })
              );
            }}
            type="text"
          />
        </div>

        <div>
          <label>Status</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "status", text: e.target.value }))
            }
          >
            <option hidden>Select</option>
            {statusOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Type</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ name: "type", text: e.target.value }))
            }
          >
            <option hidden>Select</option>
            {typeOptions?.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Sort</label>
          <select onChange={(e) => dispatch(sortJobs(e.target.value))}>
            <option hidden>Select</option>
            {sortOptions.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={() => dispatch(clearFilters())}
            type="reset"
            style={{
              marginLeft: "100%",
            }}
            id="special-button"
          >
            Reset
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
