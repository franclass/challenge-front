
import style from "./BoxContainer.module.scss";

interface BoxContainerProps {
    children: JSX.Element|JSX.Element[];
}

const BoxContainer = ({ children }: BoxContainerProps) => {
  return (
    <div className={style.bannerBoxContainer}>
      {children}
    </div>
  );
};

export default BoxContainer;
