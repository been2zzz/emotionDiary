import { useState } from 'react';

const sortOptionList = [
  { value: 'latest', name: 'latest' },
  { value: 'oldest', name: 'oldest' },
];
const ControlMenu = ({ value, onChange, optionList }) => {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};
const DiaryList = ({ diaryList }) => {
  const [sortType, setSortType] = useState('latest');

  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === 'latest') {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList)); // stringify: 배열을 JSON으로 바꿔 문자열로 바꿈. parse: 문자열을 다시 배열로 복호화
    const sortedList = copyList.sort(compare);
    return sortedList;
  };
  return (
    <div>
      <ControlMenu
        value={sortType}
        onChange={setSortType}
        optionList={sortOptionList}
      />
      {getProcessedDiaryList().map((it) => (
        <div key={it.id}>{it.content}</div>
      ))}
    </div>
  );
};

export default DiaryList;
