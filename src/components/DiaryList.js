import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';
import MyButton from './MyButton';

const sortOptionList = [
  { value: 'latest', name: 'latest' },
  { value: 'oldest', name: 'oldest' },
];

const FilterOptionList = [
  { value: 'all', name: 'all' },
  { value: 'good', name: 'good' },
  { value: 'bad', name: 'bad' },
];

const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select
      className='ControlMenu'
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};
const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState('latest');
  const [filter, setFilter] = useState('all');

  const getProcessedDiaryList = () => {
    const filterCallBack = (item) => {
      if (filter === 'good') {
        return parseInt(item.emotion) <= 2;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };
    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList)); // stringify: 배열을 JSON으로 바꿔 문자열로 바꿈. parse: 문자열을 다시 배열로 복호화

    const filteredList =
      filter === 'all' ? copyList : copyList.filter((it) => filterCallBack(it));
    const sortedList = filteredList.sort(compare);
    return sortedList;
  };
  return (
    <div className='DiaryList'>
      <div className='menu_wrapper'>
        <div className='left_column'>
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={FilterOptionList}
          />
        </div>
        <div className='right_column'>
          <MyButton
            type={'positive'}
            text={'New Diary'}
            onClick={() => navigate('/new')}
          />
        </div>
      </div>
      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};

export default DiaryList;
