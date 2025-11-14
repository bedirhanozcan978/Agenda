import { useRef } from 'react';

export default function useMouseDragScroll() {

    const scrollRef = useRef(null);

    const handleMouseDown = (e) => {
        const el = scrollRef.current;
        if (!el) return;
        el.isDown = true;
        el.startY = e.pageY - el.offsetTop;
        el.scrollTopStart = el.scrollTop;
    };

    const handleMouseLeave = () => {
        const el = scrollRef.current;
        if (el) el.isDown = false;
    };

    const handleMouseUp = () => {
        const el = scrollRef.current;
        if (el) el.isDown = false;
    };

    const handleMouseMove = (e) => {
        const el = scrollRef.current;
        if (!el || !el.isDown) return;

        e.preventDefault();
        const y = e.pageY - el.offsetTop;
        const walk = (y - el.startY);
        el.scrollTop = el.scrollTopStart - walk;
    };

    return {
        scrollRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseUp,
        handleMouseMove,
    };
}