import { useEffect } from "react";
import success from "../../assets/images/success.png";
import error from "../../assets/images/error.png";
import "./MessageBox.css";

interface IMessageBoxProps {
  text: string;
  type: "success" | "error";
  isVisible: boolean;
  setIsHidden: React.DispatchWithoutAction;
}

function MessageBox({ text, type, isVisible, setIsHidden }: IMessageBoxProps) {
  useEffect(() => {
    if (isVisible) {
      const id = setTimeout(() => {
        setIsHidden();
      }, 3000);

      return () => clearTimeout(id);
    }
  }, [isVisible, setIsHidden]);

  return (
    <div>
      {isVisible && (
        <div className={`message message--${type}`}>
          <img src={type === "success" ? success : error} />
          <div className="message__text">{text}</div>
        </div>
      )}
    </div>
  );
}

export default MessageBox;
