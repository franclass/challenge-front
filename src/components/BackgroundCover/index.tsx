import style from "./BackgroundCover.module.scss";

interface IBackgroundCover {
  imageUrl: string;
  width: string;
  height: string;
  restStyle?: any;
}

const BackgroundCover = ({ imageUrl, width, height, restStyle }:IBackgroundCover) => {
  return (
    <div
      className={style.backgroundCover}
      style={{
        backgroundImage: `url('${imageUrl}')`,
        minHeight: height,
        minWidth: width,
        ...restStyle
      }}
    ></div>
  );
};

export default BackgroundCover;
