import React from "react";
import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";
function Button({ loading, children }) {
  return (
    <>
      {" "}
      {loading == false ? (
        <>{children}</>
      ) : (
        <Oval
          height={30}
          width={30}
          color="#58BBDE"
          wrapperStyle={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#A2CDDC"
          strokeWidth={3}
          strokeWidthSecondary={3}
        />
      )}
    </>
  );
}

Button.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
