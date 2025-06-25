'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const progressFill = document.getElementById('progress');
	const circles = Array.from(document.querySelectorAll('.circle'));
	const prevBtn = document.getElementById('btn--prev');
	const nextBtn = document.getElementById('btn--next');

	let currentStep = 0;

	const updateUI = () => {
		circles.forEach((circle, idx) => {
			const inner = circle.querySelector('.inner-circle');

			if (idx < currentStep) {
				// (✔ Check)
				circle.classList.add('completed');
				circle.classList.remove('active');
				inner.textContent = '✓';
			}
			if (idx === currentStep) {
				// (Number)
				circle.classList.add('active');
				circle.classList.remove('completed');
				inner.textContent = idx + 1;
			}
			if (idx > currentStep) {
				// Reset (next steps)
				circle.classList.remove('active', 'completed');
				inner.textContent = idx + 1;
			}
		});

		// Update step-situation opacity
		const stepSituations = document.querySelectorAll('.step-situation');

		stepSituations.forEach((situation, index) => {
			situation.style.opacity = index === currentStep ? '1' : '0.3';
		});

		// Progress Line
		const fillPercent = (currentStep / (circles.length - 1)) * 100;
		progressFill.style.width = `${fillPercent}%`;

		// Button
		prevBtn.disabled = currentStep === 0;
		nextBtn.disabled = currentStep === circles.length - 1;
	};

	// Click handlers
	nextBtn.addEventListener('click', () => {
		if (currentStep < circles.length - 1) {
			currentStep++;
			updateUI();
		}
	});

	prevBtn.addEventListener('click', () => {
		if (currentStep > 0) {
			currentStep--;
			updateUI();
		}
	});

	updateUI();

	// Footer date
	const yearSpan = document.getElementById('year');

	yearSpan ? (yearSpan.textContent = `${new Date().getFullYear()}`) : null;
	// yearSpan?.textContent = `${new Date().getFullYear()}`;
});
