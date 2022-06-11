const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_descript,
  onClick,
  isSeleted,
}) => {
  return (
    <div
      className={[
        'EmotionItem',
        isSeleted ? `EmotionItem-on-${emotion_id}` : `EmotionItem-off`,
      ].join(' ')}
      onClick={() => onClick(emotion_id)}
    >
      <img src={emotion_img} />
      <span>{emotion_descript}</span>
    </div>
  );
};

export default EmotionItem;
