import { v4 } from "uuid";
import { typeOptions, statusOptions } from "../constants";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slice/jobSlice";

const AddJob = () => {
  const jobState = useSelector((store) => store.jobReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    //inputtaki verilerin objeye alinmasi entries ile aliyoruz ovject.fromEntris ile objeye ceviriyoruz
    const formData = new FormData(e.target);
    const newJobData = Object.fromEntries(formData.entries());
    //console.log(newJobData);

    //inputtan olusan objeye tarih ve id ekleme
    newJobData.date = new Date().toLocaleDateString();
    newJobData.id = v4();
    //console.log(newJobData);
    //olusturulan verinin son halini api ye ekleme
    axios
      .post("http://localhost:3001/jobs", newJobData)
      .then((res) => {
        toast.success("New Job Added...", { autoClose: 1500 });

        //verileri stora aekle
        dispatch(createJob(newJobData));

        // yukleme basarili olursa anasayfaya yonlendirme
        navigate("/");
      })
      .catch(() => {
        toast.error("Sorry!!! an error...", {
          autoClose: 1500,
        });
      });
  };

  //dizide ayni olan degerleri kaldirma fonksiyonu
  const removeDuplicates = (key) => {
    //1)sadece pozisyonlardan olusan bor dizi olusturmaliyiz.
    const arr = jobState.jobs.map((job) => job[key]);
    //2) dizi icerisinde tekrra eden elemani silme
    const filtred = arr.filter((item, index) => arr.indexOf(item) == index);

    return filtred;
  };
  console.log(removeDuplicates("position"));

  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Add a New Job</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <label> Position</label>
            <input list="position_list" type="text" name="position" required />

            <datalist id="position_list">
              {removeDuplicates("position").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label> Company</label>
            <input list="company_list" type="text" name="company" required />

            <datalist id="company_list">
              {removeDuplicates("company").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label> Location</label>
            <input list="location_list" type="text" name="location" required />

            <datalist id="location_list">
              {removeDuplicates("location").map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
          </div>
          <div>
            <label>Status</label>
            <select required name="status">
              <option value={""} hidden>
                Select
              </option>
              {statusOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Type</label>
            <select required name="type">
              <option value={""} hidden>
                Select
              </option>
              {typeOptions.map((text) => (
                <option key={text} value={text}>
                  {text}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button id="special-button">Add</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
