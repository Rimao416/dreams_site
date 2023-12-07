import React, { useEffect, useState } from "react";
import ModalLayout from "../../layouts/ModalLayout";
import PropTypes from "prop-types";
// import { useDispatch } from "react-redux";

// import { useStateContext } from "../../context/CourseProvider";

function SeeCourse({ isOpen, selectedLecon, onClose }) {
  // console.log(selectedLecon)
  const [lesson, setLesson] = useState(null);
  useEffect(() => {
    setLesson(selectedLecon);
  }, [selectedLecon]);
  //   const [loading, setLoading] = useState(false);

  
 
  return (
    <ModalLayout isOpen={isOpen}>
      <div className="add-course-info">
        <div className="add-course-inner-header">
          <h4>Leçons</h4>
        </div>
        <div className="add-course-form">
          <div className="form-group">
            <video controls width={"100%"}>
              <source src={lesson?.video} type="video/mp4" />
              {/* <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />
              Download the
              <a href="/media/cc0-videos/flower.webm">WEBM</a>
              or
              <a href="/media/cc0-videos/flower.mp4">MP4</a>
              video. */}
            </video>
          </div>

          <div className="form-group"></div>
          <div className="widget-btn">
            {/* <Link className="btn btn-black prev_btn" onClick={prevTab2}>
        Previous
      </Link> */}

            <button className="btn btn-black prev_btn" onClick={onClose}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}
SeeCourse.propTypes = {
  isOpen: PropTypes.bool,
  selectedLecon: PropTypes.object, // Ajustez le type en fonction de la structure de votre objet leçon
  onClose: PropTypes.func.isRequired,
};

export default SeeCourse;
