import { useMemo } from "react";
import "./Stars.css";

const Stars = () => {
    const stars = useMemo(
        () =>
        Array.from({ length: 150 }, (_, i) => ({
            id: i,
            x: `${(i * 37) % 100}%`,
            y: `${(i * 53) % 100}%`,
            delay: `${i * 0.07}s`,
            size: `${1 + ((i * 13) % 3)}px`,
        })),
        []
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((star) => (
            <span
            key={star.id}
            className="star"
            style={{
                left: star.x,
                top: star.y,
                animationDelay: star.delay,
                width: star.size,
                height: star.size,
            }}
            />
        ))}
        </div>
    );
};

export default Stars;