import { Skeleton } from "antd";
const LoadingCard = ({ count }) => {
  const Cards = () => {
    let totalCards = [];
    let col = 12 / count;
    for (let i = 0; i < count; i++) {
      totalCards.push(
        <div className={`col-md-${col}`}>
          <Skeleton active></Skeleton>
        </div>
      );
    }
    return totalCards;
  };
  return (
    <div className="row">
      <Cards />
    </div>
  );
};

export default LoadingCard;
