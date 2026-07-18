import "./AdCard.css";

interface IAdCardProps {
  title: string;
  imgSrc: string;
}

function AdCard({ title, imgSrc }: IAdCardProps) {
  return (
    <div
      className="ad"
      style={{
        background: `linear-gradient(90deg,rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0) 100%), url(${imgSrc}) center/cover no-repeat`,
      }}
    >
      <a className="ad__title" href="#" target="_blank">
        {title} {">"}
      </a>
    </div>
  );
}

export default AdCard;
