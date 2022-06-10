import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams(); // searchParams 상태 변화 함수도 제공
  const id = searchParams.get('id');
  const mode = searchParams.get('mode');
  return (
    <div>
      <h1>Edit</h1>
      <button onClick={() => setSearchParams({ who: 'GO' })}>
        Query String Change!
      </button>
      <button onClick={() => navigate('/home')}>HOME으로 가기</button>
      <button onClick={() => navigate(-1)}>뒤로 가기</button>
    </div>
  );
};

export default Edit;
