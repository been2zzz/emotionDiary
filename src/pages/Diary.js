import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // 사용자 정의 hook, custom hook
import { DiaryStateContext } from '../App';
import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setData(targetDiary);
      } else {
        // 존재하지 않는 일기일 경우
        alert(`A diary that doesn't exist`);
        navigate('/', { replace: true });
      }
    }
  }, [id, diaryList]);

  if (!data) {
    return <div className='DiaryPage'>Loading...</div>;
  } else {
    const currentEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    return (
      <div className='DiaryPage'>
        <MyHeader
          headText={`${getStringDate(new Date(data.date))}`}
          leftChild={<MyButton text={'< Back'} onClick={() => navigate(-1)} />}
          rightChild={
            <MyButton
              text={'Edit'}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>Today's Feeling</h4>
            <div className='diary-img-wrapper'>
              <img src={currentEmotionData.emotion_img} />
              <div className='emotion-descript'>
                {currentEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>Today's Diary</h4>
            <div className='diary-content-wrapper'>
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
