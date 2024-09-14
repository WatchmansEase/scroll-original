/* 
    Observer pattern (Vanilla JS)
    https://www.patterns.dev/vanilla/observer-pattern/
*/

// Observer class for scroll percentage with toast notification
class ScrollPercentageObserver {
    constructor(percentage) {
        this.percentage = percentage;
        this.reachedPercent = {};
    }

    update(scrollData) {
        let percentageScrolled = (scrollData.scrollTop / scrollData.maxScrollTop) * 100;
        // UIManager.displayDebugInfo(window.innerHeight, scrollData.maxScrollTop, percentageScrolled); // DEBUGGING ONLY - Display debug info
        triggerScrollEvents(percentageScrolled); // Trigger event when a %  is reached
    }
}

// Subject class (the scroll event)
class ScrollSubject {
    constructor() {
        this.observers = [];
    }

    // Add an observer
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Remove an observer
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Notify all observers about the event
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

// UI Manager to handle toast notifications and debug info
const UIManager = (() => {
    function showToast(percentage) {
        const toast = document.getElementById('toast');
        toast.innerHTML = `You've scrolled to ${percentage}% of the article`;
        toast.className = 'show';
        setTimeout(() => {
            toast.className = toast.className.replace('show', '');
        }, 1000);
    }

    // Debugging function to show scroll and window data
    // function displayDebugInfo(windowHeight, articleHeight, scrollPercentage) {
    //     document.getElementById('window-height').innerText = `Window Height: ${windowHeight}`;
    //     document.getElementById('article-height').innerText = `Article Height: ${articleHeight}`;
    //     document.getElementById('window-scroll').innerText = `Scroll Percentage: ${scrollPercentage.toFixed(2)}%`;
    // }
    // return { showToast, displayDebugInfo };

    return { showToast };
})();

// Event Manager to handle scroll events and dispatch custom events
const EventManager = (() => {
    function dispatchCustomScrollEvent(data) {
        const customScrollEvent = new CustomEvent('customScrollEvent', { detail: data });
        window.dispatchEvent(customScrollEvent);
    }

    function init() {
        window.addEventListener('customScrollEvent', (event) => {
            UIManager.showToast(Math.floor(event.detail)); // Show toast on custom scroll event
        });
    }

    return { dispatchCustomScrollEvent, init };
})();

// Helper function to calculate scroll data
function calculateScrollData(article) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const maxScrollTop = articleHeight - windowHeight;
    return {
        scrollTop: scrollTop,
        maxScrollTop: maxScrollTop
    };
}

// Trigger scroll events at specific percentages
function triggerScrollEvents(percentage) {
    const triggerValues = [25, 50, 100];
    const roundedPercentage = Math.floor(percentage);

    if (triggerValues.includes(roundedPercentage)) {
        EventManager.dispatchCustomScrollEvent(roundedPercentage);
    }
}

// Initialize the Subject (scroll) && create observer
const scrollSubject = new ScrollSubject();
const scrollPercentageObserver = new ScrollPercentageObserver([25, 50, 100]);
scrollSubject.subscribe(scrollPercentageObserver);

// Listen for scroll events and notify observers
const article = document.querySelector('article');
window.onscroll = function () {
    const scrollData = calculateScrollData(article);
    scrollSubject.notify(scrollData);
};

// Initialize event listeners and lazy load
function init() {
    EventManager.init();
    lazyload();
}

init();
