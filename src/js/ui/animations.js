class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.easingFunctions = {
            linear: t => t,
            easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeIn: t => t * t,
            easeOut: t => 1 - Math.pow(1 - t, 2)
        };
    }

    animate(element, properties, duration, easing = 'easeInOut') {
        const startTime = performance.now();
        const initialValues = {};
        const easingFunction = this.easingFunctions[easing];

        // Store initial values
        for (const prop in properties) {
            initialValues[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
        }

        const animationId = Symbol();
        this.animations.set(animationId, {
            frame: (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easingFunction(progress);

                for (const prop in properties) {
                    const start = initialValues[prop];
                    const end = properties[prop];
                    const current = start + (end - start) * easedProgress;
                    element.style[prop] = `${current}${typeof properties[prop] === 'number' ? 'px' : ''}`;
                }

                if (progress < 1) {
                    requestAnimationFrame(frame);
                } else {
                    this.animations.delete(animationId);
                }
            }
        });

        const frame = this.animations.get(animationId).frame;
        requestAnimationFrame(frame);

        return animationId;
    }

    createTransition(element, className, duration) {
        element.style.transition = `all ${duration}ms`;
        element.classList.add(className);
        
        return new Promise(resolve => {
            const handleTransitionEnd = () => {
                element.removeEventListener('transitionend', handleTransitionEnd);
                resolve();
            };
            element.addEventListener('transitionend', handleTransitionEnd);
        });
    }

    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = 'block';
        return this.animate(element, { opacity: 1 }, duration);
    }

    fadeOut(element, duration = 300) {
        return new Promise(resolve => {
            this.animate(element, { opacity: 0 }, duration);
            setTimeout(() => {
                element.style.display = 'none';
                resolve();
            }, duration);
        });
    }

    slideIn(element, direction = 'right', duration = 300) {
        const start = direction === 'right' ? 100 : -100;
        element.style.transform = `translateX(${start}%)`;
        element.style.display = 'block';
        return this.animate(element, { transform: 'translateX(0)' }, duration);
    }
}

export default AnimationManager;
