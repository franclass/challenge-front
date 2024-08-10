import { IPagination } from "@interfaces/general.interfaces";
import style from "./Pagination.module.scss";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Pagination = ({offset,limit, setCurrentOffset, pageItems}:IPagination) => {

    const handlePage = (page:number) => {
        setCurrentOffset(page);
    }

    return (
        <div className={style.pagination}>
           {offset > 0 && (
                <a className={style.pagination__button} onClick={() => handlePage(offset - 1)}> <ArrowBackIosIcon></ArrowBackIosIcon> </a>
            )}
            <span className={style.pagination__info}>Page {offset} of {limit}</span>
            {pageItems >= limit && (
                <a className={style.pagination__button} onClick={() => handlePage(offset + 1)}><ArrowForwardIosIcon></ArrowForwardIosIcon></a>
            )}
        </div>
    );
    }
export default Pagination;