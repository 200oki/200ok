import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/ko";
import styled from "../../css/read.module.css";
import * as Api from "../../api";
import BackButton from "../common/BackButton";
import { useParams } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Read = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const images = [
    "/images/main_logo_rm.png",
    "/images/Aurora.png",
    "/images/ham.png",
  ];

  console.log("id: ", id);

  const fetchPostData = async () => {
    try {
      const { data } = await Api.get(`posts/${id}`);
      setPost(data.payload);
      console.log("get요청: ", data.payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);

  return (
    <div className={styled.Wrapper}>
      <div
        className="nav-bar"
        style={{ position: "fixed", top: "0", left: "0", zIndex: "1" }}
      >
        <BackButton content={"뒤로가기"} />
      </div>
      <div className={styled.divider}></div>
      <div className={styled.postWrapper}>
        <div className={styled.titleArea}>
          <div className={styled.title}>{post?.title}</div>
          <div>
            <span className={styled.writer}>{post?.nickname}</span>{" "}
            <span
              className={styled.date}
              style={{ fontFamily: "TmoneyRoundWindRegular" }}
            >
              {moment(moment.utc(post?.createdAt).toDate()).format(
                "YYYY-MM-DD HH:mm:ss"
              )}
            </span>
          </div>
        </div>
        <hr />
        <div className={styled.contentArea}>
          <div className={styled.imageArea}>
            {/* <SimpleImageSlider
              width={600}
              height={350}
              images={images}
              showBullets={true}
              showNavs={true}
              navSize={40}
              navMargin={20}
              bgColor={"transparent"}
              style={sliderStyle}
            /> */}
            <Slide easing="ease">
              <div className={styled.eachSlide}>
                <div style={{ backgroundImage: `url(${images[0]})` }}>
                  <span>Slide 1</span>
                </div>
              </div>
              <div className={styled.eachSlide}>
                <div style={{ backgroundImage: `url(${images[1]})` }}>
                  <span>Slide 2</span>
                </div>
              </div>
              <div className={styled.eachSlide}>
                <div style={{ backgroundImage: `url(${images[2]})` }}>
                  <span>Slide 3</span>
                </div>
              </div>
            </Slide>
          </div>
          <div
            className={styled.textArea}
            style={{ fontFamily: "TmoneyRoundWindRegular" }}
          >
            {post?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Read;
