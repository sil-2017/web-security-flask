document.addEventListener('DOMContentLoaded', function() {
    // 1. Ստանալ բոլոր բացելու կոճակները
    const openBtns = document.querySelectorAll('.open-modal-btn');
    
    // 2. Ստանալ բոլոր փակելու կոճակները (X)
    const closeBtns = document.querySelectorAll('.close-btn');

    // 3. Կոճակների Լոգիկան
    openBtns.forEach(btn => {
        btn.onclick = function() {
            // Գտնել, թե որ մոդալն է պետք բացել
            const modalId = this.getAttribute('data-modal-id');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        }
    });

    // 4. Փակելու Լոգիկան (X կոճակով)
    closeBtns.forEach(btn => {
        btn.onclick = function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        }
    });

    // 5. Փակելու Լոգիկան (Երբ սեղմում ես ֆոնի վրա)
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    }

    
});
// let currentStepIndex = 0; // Սկսում ենք 0-րդ ինդեքսից

// function showStep(n) {
//     const stepsContainer = document.querySelector('.steps-wrapper');
//     if (!stepsContainer) return; // Եթե կոնտեյներ չկա, դուրս գալ

//     const steps = stepsContainer.querySelectorAll('.auth-step');
//     if (steps.length === 0) return;

//     // Հաշվարկել նոր ինդեքսը
//     currentStepIndex += n;

//     // Շրջանաձև անցումներ (Loop)
//     if (currentStepIndex >= steps.length) {
//         currentStepIndex = 0;
//     }
//     if (currentStepIndex < 0) {
//         currentStepIndex = steps.length - 1;
//     }

//     // 1. Հեռացնել current-step դասը բոլորից
//     steps.forEach(step => {
//         step.classList.remove('current-step');
//     });

//     // 2. Ավելացնել current-step դասը ընթացիկ քայլին
//     steps[currentStepIndex].classList.add('current-step');
// }

// // Գլոբալ ֆունկցիա, որը կանչվում է HTML-ից
// window.changeStep = function(n) {
//     showStep(n);
// };

// // Էջը բեռնելիս ցույց տալ 0-րդ քայլը
// document.addEventListener('DOMContentLoaded', function() {
//     // Ուղղակի ցույց է տալիս 0-րդ ինդեքսը, առանց ինդեքսը փոխելու (+0)
//     showStep(0); 
// });


let currentStepIndex = 0; // Սկսում ենք 0-րդ ինդեքսից

function showStep(n) {
    const stepsContainer = document.querySelector('.steps-wrapper');
    if (!stepsContainer) return; // Եթե կոնտեյներ չկա, դուրս գալ

    const steps = stepsContainer.querySelectorAll('.auth-step');
    if (steps.length === 0) return;

    // Հաշվարկել նոր ինդեքսը
    currentStepIndex += n;

    // Շրջանաձև անցումներ (Loop)
    if (currentStepIndex >= steps.length) {
        currentStepIndex = 0;
    }
    if (currentStepIndex < 0) {
        currentStepIndex = steps.length - 1;
    }

    // 1. Հեռացնել current-step դասը բոլորից
    steps.forEach(step => {
        step.classList.remove('current-step');
    });

    // 2. Ավելացնել current-step դասը ընթացիկ քայլին
    steps[currentStepIndex].classList.add('current-step');
}

// Գլոբալ ֆունկցիա, որը կանչվում է HTML-ից
window.changeStep = function(n) {
    showStep(n);
};

// Էջը բեռնելիս ցույց տալ 0-րդ քայլը
document.addEventListener('DOMContentLoaded', function() {
    // Ուղղակի ցույց է տալիս 0-րդ ինդեքսը, առանց ինդեքսը փոխելու (+0)
    showStep(0); 
});