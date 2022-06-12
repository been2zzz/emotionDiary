import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryDispatchContext } from './../App';

import MyButton from '../components/MyButton';
import MyHeader from '../components/MyHeader';
import EmotionItem from './EmotionItem';

import { getStringDate } from '../util/date';
import { emotionList } from '../util/emotion';

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState('');
  const contentRef = useRef();

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

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
      onEdit(originData.id, date, content, emotion);
    } else {
      onCreate(date, content, emotion);
    }
    navigate('/', { replace: true });
  };

  const handleRemove = (targetId) => {
    if (window.confirm('Are you sure delete diary?')) {
      onRemove(originData.id);
      navigate('/', { replace: true });
    }
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
        rightChild={
          isEdit && (
            <MyButton
              text={'Delete'}
              type={'negative'}
              onClick={handleRemove}
            />
          )
        }
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
            <MyButton text={'Save'} type={'positive'} onClick={handleSumbit} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
