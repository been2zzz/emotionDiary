import { useParams } from 'react-router-dom'; // 사용자 정의 hook, custom hook

const Diary = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Diary</h1>
    </div>
  );
};

export default Diary;
