import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { getAdvert } from "../../api/service";
import Layout from "../../layouts";
import AdvertDetails from "../../components/AdvertDetails";
// import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { loadAdvert } from "../../store/actions";
import { getAdvert } from "../../store/selectors";

import "./AdvertDetailsPage.scss";

function AdvertDetailsPage(...props) {
  // const [data, setData] = useState(null);
  const { advertId } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getAdvert);

  useEffect(() => {
    dispatch(loadAdvert(advertId));
  }, [advertId, dispatch]);

  // const advert = data.forEach((ad)=>ad.id === advertId)
  // useEffect(() => {
  //   getAdvert(advertId).then((details) => setData(details));
  // }, [advertId]);

  return (
    <Layout title="Anuncio" {...props}>
      <div className="details">
        <AdvertDetails {...data} />
      </div>
    </Layout>
  );
}

export default AdvertDetailsPage;
