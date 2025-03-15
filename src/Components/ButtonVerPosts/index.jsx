import "./index.css";

export const ScrollLink = ({ targetId, children}) => {

    const handleClick = (e) => {
        e.preventDefault();

        const targetElement = document.querySelector(`#${targetId}`);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="buttonDiv">
            <a href={`${targetId}`} onClick={handleClick}>
                {children}
            </a>
        </div>
    );
};