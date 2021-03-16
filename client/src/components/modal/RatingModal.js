// import React, {useState} from 'react';
// import { Modal, Button } from "antd";
// import { StarTwoTone } from '@ant-design/icons';
// import {toast} from "react-toastify"
// import StarRatings from 'react-star-ratings';
// import {useSelector} from 'react-redux'
// import {useHistory, useParams} from 'react-router-dom'
// function RatingModal({children}) {
//     const {user} = useSelector((state) => ({...state}))
//     const [modalVisible, setmodalVisible] = useState(false);
//     let history = useHistory();
//     let params = useParams()
//     // console.log(params.slug);
//     const handleModal = () => {
//         if(user && user.token) {
//             setmodalVisible(true)
//         } else{
//             history.push({
//                 pathname:"/login",
//                 state: {from: `/product/${params.slug}`}
//             });
//         }
//     }

//     return (
//         <>
//         <div onClick={handleModal}>
//             <StarTwoTone twoToneColor="#d4af37" /><br />{" "}
//             {user? "Leave Rating":"Login to leave Rating"}
//         </div>
//         <Modal
//             title="Leave your rating"
//             centered
//             visible={modalVisible}
//             onOk={()=> {
//                 setmodalVisible(false)
//                 toast.success("Thanks for your feedback.")
//             }}
//             onCancel={()=> {
//                 setmodalVisible(false)
//             }}
//         >
//             {children}
//         </Modal>
//         </>
//     )
// }

// export default RatingModal


import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [modalVisible, setModalVisible] = useState(false);

  let history = useHistory();
  let { slug } = useParams();

  const handleModal = () => {
    if (user && user.token) {
      setModalVisible(true);
    } else {
      history.push({
        pathname: "/login",
        state: { from: `/product/${slug}` },
      });
    }
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your feedback.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
