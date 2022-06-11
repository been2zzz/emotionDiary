import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from './../App';

import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import EmotionItem from './EmotionItem';

const emotionList = [
  {
    emotion_id: 1,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion1.png`,
    emotion_descript: 'Happy',
  },
  {
    emotion_id: 2,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion2.png`,
    emotion_descript: 'Good',
  },
  {
    emotion_id: 3,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion3.png`,
    emotion_descript: 'More or less',
  },
  {
    emotion_id: 4,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion4.png`,
    emotion_descript: 'Bad',
  },
  {
    emotion_id: 5,
    emotion_img: process.env.PUBLIC_URL + `/assets/emotion5.png`,
    emotion_descript: 'Terrible',
  },
];

export const getStringDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const { onCreate, onEdit } = useContext(DiaryDispatchContext);
  const handleClickEmote = (emotion) => {
    setEmotion(emotion);
  };

  const handleSumbit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit ? 'Are you sure edit diary?' : 'Are you sure save diary?'
      )
    ) {
      onCreate(date, content, emotion);
    } else {
      onEdit(originData.id, date, content, emotion);
    }
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className='DiaryEditor'>
      <MyHeader
        headText={isEdit ? 'Edit Diary' : 'New Diary'}
        leftChild={<MyButton text={'< Back'} onClick={() => navigate(-1)} />}
      />
      <div>
        <section>
          <h4>What date is today?</h4>
          <div className='input-box'>
            <input
              className='input-date'
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>Feeling</h4>
          <div className='input-box emotion-list-wrapper'>
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSeleted={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h3>Today's Diary</h3>
          <div className='input-box text-wrapper'>
            <textarea
              placeholder='How was your day?'
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className='control-box'>
            <MyButton text={'Cancel'} onClick={() => navigate(-1)} />
            <MyButton
              text={'Complete'}
              type={'positive'}
              onClick={handleSumbit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
