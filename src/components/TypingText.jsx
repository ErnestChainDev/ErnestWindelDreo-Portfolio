import { useEffect, useState } from "react";

const TypingText = ({
    texts = [],
    speed = 100,
    pause = 2000,
}) => {
    const [textIndex, setTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!texts.length) return;

        const currentText = texts[textIndex];

        const timer = setTimeout(() => {
        if (!isDeleting) {
            setDisplayText(
            currentText.substring(0, displayText.length + 1)
            );

            if (displayText === currentText) {
            setTimeout(() => {
                setIsDeleting(true);
            }, pause);
            }
        } else {
            setDisplayText(
            currentText.substring(0, displayText.length - 1)
            );

            if (displayText === "") {
            setIsDeleting(false);
            setTextIndex(
                (prev) => (prev + 1) % texts.length
            );
            }
        }
        }, isDeleting ? 40 : speed);

        return () => clearTimeout(timer);
    }, [
        displayText,
        isDeleting,
        textIndex,
        texts,
        speed,
        pause,
    ]);

    return (
        <>
        {displayText}
        <span className="typing-cursor">|</span>
        </>
    );
};

export default TypingText;