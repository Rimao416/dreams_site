import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {  useDispatch } from "react-redux";
import {  updateCours } from "../../../../redux/slice/coursSlice";
import { useStateContext as useStateCourse } from "../../../../context/CourseProvider";
import { toast } from "react-toastify";
import Button from "../../../Button";
// eslint-disable-next-line react/prop-types
const CourseMedia = ({ prevTab1, nextTab2, lecon, setLecon }) => {
  // const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { cours, setCours } = useStateCourse();
  console.log(cours);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const { files } = e.target;
    files[0] && setCours({ ...cours, image: files[0] });
    // if (files) {
    //   setImage(URL.createObjectURL(files[0]));
    // }
    // setCours({ ...cours, [e.target.name]: e.target.files[0] });
  };
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    console.log(cours);
    // const descriptionWithoutParagraphs = cours.description.replace(
    //   /<\/?p>/g,
    //   ""
    // );

    // Mettre à jour la valeur de la description dans l'objet cours
    // setCours({
    //   ...cours,

    //   description: descriptionWithoutParagraphs,
    // });
    // nextTab2(); Ecran Suivant
    // new Form
    const form = new FormData();
    form.append("id", cours.id);
    form.append("image", cours.image);
    form.append("title", cours.title);
    form.append("description", "lorem ipsum");
    // form.append("description", descriptionWithoutParagraphs);
    // form.append("user_id", cours.user_id);
    // form.append("tool_id", cours.tool_id);
    // form.append("price", cours.price);
    // form.append("old_price", cours.old_price);
    // form.append("categorie_id", cours.categorie_id);
    // console.log(cours)
    // SEND DATA INTO DATABASE
    dispatch(updateCours(form)).then((result) => {
      console.log(result);
      if (result.type == "updateCours/fulfilled") {
        setLecon({
          ...lecon,
          course_id: result.payload.data.id,
        });
        setLoading(false);
        nextTab2();
      } else {
        Object.values(result.payload.data).forEach((errorArray) => {
          toast.error(errorArray[0]);
        });

        setLoading(false);
      }
      // if (result.type == "addCours/prof/fulfilled") {
      //   setLecon({
      //     ...lecon,
      //     course_id: result.payload.data.id,
      //   });
      //   nextTab2();
      // }
    });
  };
  const handleId = () => {
    setLecon({
      ...lecon,
      course_id: cours.id,
    });
    nextTab2();
  };
  return (
    <>
      <fieldset className="field-card" style={{ display: "block" }}>
        <div className="add-course-info">
          <div className="add-course-inner-header">
            <h4>Selectionner une image</h4>
          </div>
          <div className="add-course-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="add-course-label">Image mise en Avant</label>
                <div className="relative-form">
                  <span>{cours?.image ? "Image Chargée" : "Aucune Image"}</span>
                  <label className="relative-file-upload">
                    Upload File{" "}
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              <div className="form-group">
                {/* <div className="add-image-box">
                  <Link to="#">
                    {cours.image ? (
                      <img
                        src={cours.image}
                        alt=""
                        style={{ width: "300px", height: "300px" }}
                      />
                    ) : (
                      <i className="far fa-image" />
                    )}
                  </Link>
                </div> */}
              </div>
              <div className="widget-btn">
                <Link className="btn btn-black prev_btn" onClick={prevTab1}>
                  Précédent
                </Link>
                <Button loading={loading}>
                  <button className="btn btn-info-light next_btn" type="submit">
                    Modifier
                  </button>
                </Button>
                <Link
                  className="btn btn-info-light next_btn"
                  onClick={handleId}
                >
                  Avancer
                </Link>
              </div>
            </form>
          </div>
        </div>
      </fieldset>
    </>
  );
};
CourseMedia.propTypes = {
  prevTab1: PropTypes.func,
  nextTab2: PropTypes.func,
  cours: PropTypes.shape({
    title: PropTypes.null,
    description: PropTypes.string,
    price: PropTypes.number,
    old_price: PropTypes.number,
    image: PropTypes.string,
    categorie_id: PropTypes.string,
    user_id: PropTypes.number,
    tool_id: PropTypes.number,
  }),
  setCours: PropTypes.func,
};

export default CourseMedia;
